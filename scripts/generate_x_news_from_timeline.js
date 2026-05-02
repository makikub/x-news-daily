#!/usr/bin/env node
// Build X News Daily items from Masaki's authenticated home timeline snapshot.
// Selection policy: last 24h, only Masaki-interest posts. Split into (1) high-engagement within interest and (2) preference-fit picks.
const fs = require('fs');
const path = require('path');

function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function ymd(d) { return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`; }
function scoreEngagement(m = {}) {
  return (m.like_count || 0) + 3 * (m.retweet_count || 0) + 2 * (m.reply_count || 0) + 4 * (m.quote_count || 0) + 2 * (m.bookmark_count || 0);
}
function preferenceScore(t) {
  const text = `${t.text || ''} ${(t.urls || []).join(' ')}`.toLowerCase();
  let s = 0;
  const core = [
    'claude code', 'codex', 'cursor', 'devin', 'mcp', 'langchain', 'langgraph',
    'github copilot', 'developer tool', 'devtools', 'agent sdk', 'ai agent'
  ];
  for (const k of core) if (text.includes(k)) s += 4;
  const kws = [
    'claude', 'anthropic', 'openai', 'gpt', 'agents', 'design system',
    'automation', 'workflow', 'eval', 'rag', 'llm', 'notebooklm', 'gemini', 'deepmind'
  ];
  for (const k of kws) if (text.includes(k)) s += 2;
  const jpCore = ['エージェント', 'aiエージェント', 'claude code', '開発支援', 'mcp', '評価基盤'];
  for (const k of jpCore) if (text.includes(k)) s += 4;
  const jp = ['生成ai', 'ai開発', '自動化', 'ワークフロー', '評価', '実装', '設計'];
  for (const k of jp) if (text.includes(k)) s += 2;
  if ((t.urls || []).some((u) => /anthropic|claude|openai|deepmind|google|github|cursor|cognition|langchain|huggingface|arxiv/i.test(u))) s += 4;
  if (/公式|release|changelog|blog|docs|paper|論文|発表|アップデート/i.test(text)) s += 2;
  return s;
}
function cleanText(s) { return String(s || '').replace(/https:\/\/t\.co\/\S+/g, '').replace(/\s+/g, ' ').trim(); }

async function xaiResponses({ apiKey, model, input, timeoutMs = 45000 }) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(new Error('timeout')), timeoutMs);
  try {
    const res = await fetch('https://api.x.ai/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, input }),
      signal: ctrl.signal
    });
    if (!res.ok) throw new Error(`xAI HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return await res.json();
  } finally { clearTimeout(t); }
}
function getText(resp) {
  if (typeof resp.output_text === 'string') return resp.output_text;
  const out = [];
  for (const part of resp.output || []) {
    if (part?.type === 'message' && Array.isArray(part.content)) {
      for (const c of part.content) if ((c?.type === 'output_text' || c?.type === 'text') && typeof c.text === 'string') out.push(c.text);
    }
  }
  return out.join('\n');
}
function tryParseJson(text) {
  const s = text.indexOf('{'), e = text.lastIndexOf('}');
  if (s < 0 || e <= s) return null;
  try { return JSON.parse(text.slice(s, e + 1)); } catch { return null; }
}

function pickTimelineItems(snapshot, hours, each) {
  const since = Date.now() - hours * 3600 * 1000;
  const timeline = (snapshot.timeline || [])
    .filter((t) => Date.parse(t.created_at || '') >= since)
    .map((t) => ({ ...t, engagementScore: scoreEngagement(t.metrics), preferenceScore: preferenceScore(t) }))
    .filter((t) => cleanText(t.text).length >= 20);

  const seen = new Set();
  // Do not let generic viral timeline posts through. Popularity is only useful
  // after the post matches Masaki's interest areas.
  const interested = timeline.filter((t) => t.preferenceScore >= 4);

  const popular = interested
    .slice()
    .sort((a, b) => (b.engagementScore - a.engagementScore) || (b.preferenceScore - a.preferenceScore) || String(b.created_at).localeCompare(String(a.created_at)))
    .slice(0, each)
    .map((t) => ({ ...t, category: '興味領域で反響の多い投稿', selectionReason: `preferenceScore=${t.preferenceScore}, engagementScore=${t.engagementScore}` }));
  for (const t of popular) seen.add(t.id || t.url);

  const preferred = interested
    .filter((t) => !seen.has(t.id || t.url))
    .sort((a, b) => (b.preferenceScore - a.preferenceScore) || (b.engagementScore - a.engagementScore))
    .slice(0, each)
    .map((t) => ({ ...t, category: 'Masaki好みの投稿', selectionReason: `preferenceScore=${t.preferenceScore}, engagementScore=${t.engagementScore}` }));
  return [...popular, ...preferred];
}

function fallbackItems(selected) {
  return selected.map((t) => ({
    category: t.category,
    handle: t.author || '',
    url: t.url,
    what: cleanText(t.text).slice(0, 260),
    why: `${t.category}として選定。${t.selectionReason}`,
    podcastAngle: 'この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。',
    refs: [t.url, ...(t.urls || [])].filter(Boolean),
    metrics: t.metrics || null,
    selectionReason: t.selectionReason
  }));
}

async function summarize(selected) {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return fallbackItems(selected);
  const payload = selected.map((t, i) => ({
    idx: i + 1,
    category: t.category,
    author: t.author,
    url: t.url,
    text: cleanText(t.text),
    external_urls: t.urls || [],
    metrics: t.metrics || {},
    selectionReason: t.selectionReason
  }));
  const input = [
    { role: 'system', content: 'Return ONLY valid JSON. Write natural Japanese. Do not invent facts beyond the provided posts/URLs.' },
    { role: 'user', content: `以下は実行時点から24時間以内のXタイムライン投稿から選んだ候補です。「反響の多い投稿」と「Masaki好みの投稿」のカテゴリを保ったまま、NotebookLMに読ませる日次ニュース用に要約してください。JSON形式: {"items":[{"category":"反響の多い投稿|Masaki好みの投稿","handle":"...","url":"...","what":"何が起きたかを日本語で1〜2文","why":"なぜ重要か/文脈を日本語で1〜2文","podcastAngle":"Podcastで膨らませる論点を日本語で1文","refs":["X URL", "一次ソースURL等"],"selectionReason":"選定理由を短く"}]}\n\n${JSON.stringify(payload, null, 2)}` }
  ];
  const resp = await xaiResponses({ apiKey, model: process.env.XAI_MODEL || 'grok-4-1-fast-reasoning', input });
  const parsed = tryParseJson(getText(resp));
  if (!parsed?.items) return fallbackItems(selected);
  return parsed.items.map((it, i) => ({
    ...it,
    // Keep deterministic local selection categories/reasons; the model only summarizes.
    category: selected[i]?.category || it.category,
    selectionReason: selected[i]?.selectionReason || it.selectionReason,
    handle: it.handle || selected[i]?.author || '',
    url: it.url || selected[i]?.url || '',
    metrics: selected[i]?.metrics || null,
    refs: Array.isArray(it.refs) && it.refs.length ? it.refs : [selected[i]?.url, ...(selected[i]?.urls || [])].filter(Boolean)
  }));
}

(async () => {
  const snapshotPath = process.argv[2];
  if (!snapshotPath) { console.error('Usage: generate_x_news_from_timeline.js <source-snapshot.json> [hours=24] [eachCategory=4]'); process.exit(2); }
  const hours = Number(process.argv[3] || 24);
  const each = Number(process.argv[4] || 4);
  const snapshot = readJson(snapshotPath);
  const selected = pickTimelineItems(snapshot, hours, each);
  const items = await summarize(selected);
  const now = new Date();
  process.stdout.write(JSON.stringify({
    generatedAt: now.toISOString(),
    windowHours: hours,
    from_date: ymd(new Date(now.getTime() - hours * 3600 * 1000)),
    to_date: snapshot.date || ymd(now),
    sourceSnapshot: snapshotPath,
    selectionPolicy: 'last 24h home timeline; Masaki-interest posts only; top engagement within interests + preference picks',
    items
  }, null, 2));
})().catch((e) => { console.error(String(e.stack || e)); process.exit(1); });
