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
function loadInterestProfile(profilePath) {
  if (!profilePath || !fs.existsSync(profilePath)) return null;
  try { return readJson(profilePath); } catch { return null; }
}

function preferenceScore(t, profile = null) {
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

  for (const entry of profile?.positiveWeightedKeywords || []) {
    const k = String(entry.keyword || '').toLowerCase();
    if (k && text.includes(k)) s += Number(entry.weight || 0);
  }
  for (const entry of profile?.negativeKeywords || []) {
    const k = String(entry.keyword || '').toLowerCase();
    if (k && text.includes(k)) s += Number(entry.weight || 0);
  }
  return s;
}
function cleanText(s) { return String(s || '').replace(/https:\/\/t\.co\/\S+/g, '').replace(/\s+/g, ' ').trim(); }
function stripHtml(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}
function pageTitle(html) {
  const m = String(html || '').match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? stripHtml(m[1]).slice(0, 180) : '';
}
async function fetchExternalContext(url, timeoutMs = 8000) {
  if (!/^https?:\/\//i.test(url)) return null;
  if (/^https?:\/\/(x|twitter)\.com\//i.test(url)) return null;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(new Error('timeout')), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'user-agent': 'OpenClaw X News Daily/1.0 (+NotebookLM context generator)' } });
    const ct = res.headers.get('content-type') || '';
    if (!res.ok || !/text\/html|text\/plain|application\/json/i.test(ct)) return { url, ok: false, note: `取得失敗 HTTP ${res.status}` };
    const raw = (await res.text()).slice(0, 80000);
    return { url, ok: true, title: pageTitle(raw), excerpt: stripHtml(raw).slice(0, 2200) };
  } catch (e) {
    return { url, ok: false, note: `取得失敗: ${String(e.message || e).slice(0, 120)}` };
  } finally { clearTimeout(timer); }
}
async function enrichSelected(selected) {
  return Promise.all(selected.map(async (t) => {
    const urls = [...new Set(t.urls || [])].filter((u) => !/^https?:\/\/(x|twitter)\.com\//i.test(u)).slice(0, 2);
    const externalContext = (await Promise.all(urls.map((u) => fetchExternalContext(u)))).filter(Boolean);
    return { ...t, externalContext };
  }));
}

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

function pickTimelineItems(snapshot, hours, each, profile = null) {
  const since = Date.now() - hours * 3600 * 1000;
  const itemKey = (t) => String(t.url || t.id || cleanText(t.text).slice(0, 160));
  const unique = (items) => {
    const keys = new Set();
    return items.filter((t) => {
      const key = itemKey(t);
      if (keys.has(key)) return false;
      keys.add(key);
      return true;
    });
  };
  const byEngagement = (a, b) => (b.engagementScore - a.engagementScore) || (b.preferenceScore - a.preferenceScore) || String(b.created_at).localeCompare(String(a.created_at));
  const byPreference = (a, b) => (b.preferenceScore - a.preferenceScore) || (b.engagementScore - a.engagementScore);
  const timeline = (snapshot.timeline || [])
    .filter((t) => Date.parse(t.created_at || '') >= since)
    .map((t) => ({ ...t, engagementScore: scoreEngagement(t.metrics), preferenceScore: preferenceScore(t, profile) }))
    .filter((t) => cleanText(t.text).length >= 20);

  const seen = new Set();
  // Do not let generic viral timeline posts through. Popularity is only useful
  // after the post matches Masaki's interest areas.
  const interested = timeline.filter((t) => t.preferenceScore >= 4);

  const popular = unique(interested.slice().sort(byEngagement))
    .slice(0, each)
    .map((t) => ({ ...t, category: '興味領域で反響の多い投稿', selectionReason: `preferenceScore=${t.preferenceScore}, engagementScore=${t.engagementScore}` }));
  for (const t of popular) seen.add(itemKey(t));

  const preferred = unique(interested
    .filter((t) => {
      const key = itemKey(t);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }))
    .sort(byPreference)
    .slice(0, each)
    .map((t) => ({ ...t, category: 'Masaki好みの投稿', selectionReason: `preferenceScore=${t.preferenceScore}, engagementScore=${t.engagementScore}` }));
  return [...popular, ...preferred];
}

function fallbackItems(selected) {
  return selected.map((t) => {
    const postText = cleanText(t.text);
    const sourceNotes = (t.externalContext || []).map((c) => c.ok
      ? `外部リンク「${c.title || c.url}」の冒頭メモ: ${c.excerpt}`
      : `外部リンク ${c.url}: ${c.note}`);
    return {
      category: t.category,
      handle: t.author || '',
      url: t.url,
      what: postText.slice(0, 180),
      details: [`投稿本文: ${postText}`, ...sourceNotes].join('\n\n').slice(0, 1800),
      why: `${t.category}として選定。${t.selectionReason}`,
      podcastAngle: 'この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。',
      refs: [t.url, ...(t.urls || [])].filter(Boolean),
      metrics: t.metrics || null,
      selectionReason: t.selectionReason
    };
  });
}

async function summarize(selected) {
  const enriched = await enrichSelected(selected);
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return fallbackItems(enriched);
  const payload = enriched.map((t, i) => ({
    idx: i + 1,
    category: t.category,
    author: t.author,
    url: t.url,
    post_text: cleanText(t.text),
    external_urls: t.urls || [],
    external_context: t.externalContext || [],
    metrics: t.metrics || {},
    selectionReason: t.selectionReason
  }));
  const input = [
    { role: 'system', content: 'Return ONLY valid JSON. Write natural Japanese. Do not invent facts beyond the provided post text and fetched external_context. If a linked source was not fetched, say it is unverified instead of filling gaps.' },
    { role: 'user', content: `以下は実行時点から24時間以内のXタイムライン投稿から選んだ候補です。NotebookLMはX投稿内リンクの先を読めない前提なので、リンクだけに頼らず、本文だけで内容が分かる日次ニュースにしてください。JSON形式: {"items":[{"category":"反響の多い投稿|Masaki好みの投稿","handle":"...","url":"...","what":"見出し。何が起きたかを日本語で1文","details":"NotebookLM用の本文メモ。投稿本文と取得できたリンク先メモに基づいて3〜5文。誰が何を発表/共有し、具体的に何が変わり、未確認点があれば何が未確認かまで書く。","why":"なぜ重要か/文脈を日本語で2〜3文","podcastAngle":"Podcastで膨らませる論点を日本語で1〜2文","refs":["X URL", "一次ソースURL等"],"selectionReason":"選定理由を短く"}]}\n\n${JSON.stringify(payload, null, 2)}` }
  ];
  let resp;
  try {
    resp = await xaiResponses({ apiKey, model: process.env.XAI_MODEL || 'grok-4-1-fast-reasoning', input, timeoutMs: Number(process.env.XAI_TIMEOUT_MS || 90000) });
  } catch (e) {
    console.error(`xAI summarization failed; using deterministic fallback: ${String(e.message || e)}`);
    return fallbackItems(enriched);
  }
  const parsed = tryParseJson(getText(resp));
  if (!parsed?.items) return fallbackItems(enriched);
  const summarized = parsed.items.map((it, i) => ({
    ...it,
    // Keep deterministic local selection categories/reasons; the model only summarizes.
    category: selected[i]?.category || it.category,
    selectionReason: selected[i]?.selectionReason || it.selectionReason,
    handle: selected[i]?.author || it.handle || '',
    url: selected[i]?.url || it.url || '',
    metrics: selected[i]?.metrics || null,
    details: it.details || fallbackItems([enriched[i]])[0]?.details || '',
    refs: [...new Set([selected[i]?.url, ...(enriched[i]?.urls || []), ...(Array.isArray(it.refs) ? it.refs : [])].filter(Boolean))]
  }));
  // Some models occasionally summarize only the first few candidates. Preserve
  // the deterministic local selection contract by filling any omitted items with
  // the local fallback, so both daily groups remain represented.
  if (summarized.length < selected.length) {
    summarized.push(...fallbackItems(enriched.slice(summarized.length)));
  }
  return summarized;
}

(async () => {
  const snapshotPath = process.argv[2];
  if (!snapshotPath) { console.error('Usage: generate_x_news_from_timeline.js <source-snapshot.json> [hours=24] [eachCategory=4] [interestProfilePath]'); process.exit(2); }
  const hours = Number(process.argv[3] || 24);
  const each = Number(process.argv[4] || 4);
  const profilePath = process.argv[5] || '/root/clawd/data/info-collector/interest-profile.local.json';
  const profile = loadInterestProfile(profilePath);
  const snapshot = readJson(snapshotPath);
  const selected = pickTimelineItems(snapshot, hours, each, profile);
  const items = await summarize(selected);
  const now = new Date();
  process.stdout.write(JSON.stringify({
    generatedAt: now.toISOString(),
    windowHours: hours,
    from_date: ymd(new Date(now.getTime() - hours * 3600 * 1000)),
    to_date: snapshot.date || ymd(now),
    sourceSnapshot: snapshotPath,
    selectionPolicy: 'last 24h home timeline; Masaki-interest posts only; top engagement within interests + preference picks',
    interestProfile: profile ? { path: profilePath, updatedAt: profile.updatedAt || null } : null,
    items
  }, null, 2));
})().catch((e) => { console.error(String(e.stack || e)); process.exit(1); });
