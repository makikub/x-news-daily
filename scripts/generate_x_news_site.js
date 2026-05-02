#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const DEFAULT_INPUT = '/root/clawd/data/info-collector/x_pulse_latest.json';
const DEFAULT_OUT = '/root/clawd/out/x-news-site';

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function ymdFromIso(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function normalizeItems(data) {
  const items = Array.isArray(data.items) ? data.items : Array.isArray(data.results) ? data.results : [];
  return items
    .filter((it) => it && !it.error)
    .map((it, i) => {
      const url = String(it.url || it.href || '').trim();
      const refs = Array.isArray(it.refs) ? it.refs.map(String) : url ? [url] : [];
      // Aggregated X pulse files often cover a rolling 24h window and do not
      // include per-item timestamps. In that case, name the page after the
      // report end date (`to_date`) so NotebookLM daily pages match the day the
      // digest is generated/used.
      const date = it.date || ymdFromIso(it.dt) || data.to_date || data.from_date || ymdFromIso(data.generatedAt) || 'unknown-date';
      return {
        id: i + 1,
        date,
        handle: String(it.handle || '').replace(/^@/, ''),
        url,
        what: String(it.what || it.title || it.text || '').trim(),
        why: String(it.why || '').trim(),
        category: String(it.category || '').trim(),
        selectionReason: String(it.selectionReason || '').trim(),
        podcastAngle: String(it.podcastAngle || '').trim(),
        metrics: it.metrics || null,
        refs: [...new Set(refs.filter(Boolean))]
      };
    })
    .filter((it) => it.what || it.url);
}

function groupByDate(items) {
  const m = new Map();
  for (const it of items) {
    if (!m.has(it.date)) m.set(it.date, []);
    m.get(it.date).push(it);
  }
  return [...m.entries()].sort((a, b) => b[0].localeCompare(a[0]));
}

function pickThemes(items) {
  const text = items.map((it) => `${it.what} ${it.why}`.toLowerCase()).join(' ');
  const themes = [];
  const add = (label, re) => { if (re.test(text)) themes.push(label); };
  add('AIエージェント / 開発支援', /agent|devin|claude code|codex|cursor|pr review|code review|mcp/);
  add('モデル / APIアップデート', /gpt|claude|gemini|model|api|reasoning/);
  add('プロダクト連携 / ワークフロー', /integration|marketplace|workflow|datadog|tool|automation/);
  add('研究・運用ノウハウ', /test time|subagent|review|quality|eval|benchmark/);
  return themes.length ? themes.slice(0, 4) : ['Xで拾った注目ニュース'];
}

function dayNarrative(date, items) {
  const themes = pickThemes(items);
  const top = items.slice(0, 3);
  const lines = [];
  lines.push(`${date} のXニュースは、${themes.join('、')}が中心でした。`);
  if (top.length) {
    lines.push(`特に目立つのは、${top.map((it) => it.what.replace(/[。.]$/, '')).join('、')}です。`);
  }
  lines.push('NotebookLMに読ませる前提で、単なるリンク集ではなく「何が起きたか」「なぜ重要か」「Podcastで話すならどこを膨らませるか」が分かるように整理しています。');
  return lines.join('\n\n');
}

function podcastSeed(items) {
  const topics = items.slice(0, 5).map((it, i) => `${i + 1}. ${it.what}${it.why ? `\n   - 論点: ${it.why}` : ''}`);
  return [
    '今日のPodcastで話すなら、冒頭は「AI開発ツールが単発支援から、レビュー・監視・連携まで含む常時稼働のワークフローに広がっている」という流れから入ると自然です。',
    '話す順番の候補:',
    ...topics,
    '締めは、各社の発表を個別ニュースとして見るだけでなく、開発現場の品質保証・観測性・自動化がエージェント前提に寄っている、という大きな変化に接続するとよさそうです。'
  ].join('\n\n');
}

function renderPage({ title, body }) {
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <style>
    :root { color-scheme: light; --fg:#17202a; --muted:#586575; --line:#dce3ea; --accent:#315efb; --bg:#f7f9fc; --card:#fff; }
    body { margin:0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height:1.75; color:var(--fg); background:var(--bg); }
    main { max-width: 880px; margin: 0 auto; padding: 40px 20px 64px; }
    a { color: var(--accent); }
    .card { background:var(--card); border:1px solid var(--line); border-radius:18px; padding:24px; margin:20px 0; box-shadow:0 8px 28px rgba(31,45,61,.05); }
    h1 { line-height:1.2; margin:0 0 8px; }
    h2 { margin-top:36px; border-bottom:1px solid var(--line); padding-bottom:6px; }
    h3 { margin-bottom:4px; }
    .muted { color:var(--muted); }
    .refs li { word-break:break-all; }
    pre { white-space:pre-wrap; font-family:inherit; background:#f1f4f8; border:1px solid var(--line); border-radius:14px; padding:16px; }
    nav { margin-bottom:24px; }
  </style>
</head>
<body>
<main>
${body}
</main>
</body>
</html>`;
}

function renderDay(date, items, meta) {
  const itemCards = items.map((it, idx) => `
<section class="card">
  <h3>${idx + 1}. ${esc(it.what || 'Untitled')}</h3>
  <p class="muted">${it.category ? `${esc(it.category)} · ` : ''}${it.handle ? `@${esc(it.handle)} · ` : ''}${it.url ? `<a href="${esc(it.url)}">X post</a>` : ''}</p>
  ${it.selectionReason ? `<p><strong>選定理由:</strong> ${esc(it.selectionReason)}</p>` : ''}
  ${it.why ? `<p><strong>なぜ重要か:</strong> ${esc(it.why)}</p>` : ''}
  ${it.podcastAngle ? `<p><strong>Podcast論点:</strong> ${esc(it.podcastAngle)}</p>` : ''}
  ${it.refs.length ? `<p><strong>参照リンク:</strong></p><ul class="refs">${it.refs.map((r) => `<li><a href="${esc(r)}">${esc(r)}</a></li>`).join('')}</ul>` : ''}
</section>`).join('\n');

  const body = `
<nav><a href="../../index.html">← X News Daily</a></nav>
<h1>Xニュース日次まとめ: ${esc(date)}</h1>
<p class="muted">Generated at ${esc(meta.generatedAt || '')} / source: ${esc(meta.sourcePath || '')}</p>

<section class="card">
  <h2>今日の概要</h2>
  <pre>${esc(dayNarrative(date, items))}</pre>
</section>

<h2>ニュース詳細</h2>
${itemCards || '<p>ニュース項目なし。</p>'}

<section class="card">
  <h2>NotebookLM / Podcast 用メモ</h2>
  <pre>${esc(podcastSeed(items))}</pre>
</section>
`;
  return renderPage({ title: `Xニュース日次まとめ: ${date}`, body });
}

function renderDayMarkdown(date, items, meta) {
  const refs = (it) => it.refs.map((r) => `  - ${r}`).join('\n');
  return `# Xニュース日次まとめ: ${date}\n\nGenerated at ${meta.generatedAt}\nSource: ${meta.sourcePath}\n\n## 今日の概要\n\n${dayNarrative(date, items)}\n\n## ニュース詳細\n\n${items.map((it, idx) => `### ${idx + 1}. ${it.what || 'Untitled'}\n\n${it.category ? `- Category: ${it.category}\n` : ''}- Account: ${it.handle ? '@' + it.handle : '(unknown)'}\n- X post: ${it.url || ''}\n${it.selectionReason ? `- 選定理由: ${it.selectionReason}\n` : ''}${it.why ? `- なぜ重要か: ${it.why}\n` : ''}${it.podcastAngle ? `- Podcast論点: ${it.podcastAngle}\n` : ''}${it.refs.length ? `\n参照リンク:\n${refs(it)}\n` : ''}`).join('\n')}\n\n## NotebookLM / Podcast 用メモ\n\n${podcastSeed(items)}\n`;
}

function renderIndex(groups, meta) {
  const links = groups.map(([date, items]) => `<li><a href="daily/${esc(date)}/index.html">${esc(date)}</a> — ${items.length}件</li>`).join('\n');
  const body = `
<h1>X News Daily</h1>
<p>NotebookLMに読み込ませるための、X収集ニュース特化の日次テキストまとめサイトです。</p>
<p class="muted">Generated at ${esc(meta.generatedAt || '')}</p>
<section class="card">
  <h2>日別ページ</h2>
  <ul>${links}</ul>
</section>
<section class="card">
  <h2>運用メモ</h2>
  <p>各日ページは、リンク集ではなく本文テキスト中心にしています。NotebookLMには日別ページURLを渡す想定です。</p>
</section>
`;
  return renderPage({ title: 'X News Daily', body });
}

function main() {
  const input = process.argv[2] || DEFAULT_INPUT;
  const outDir = process.argv[3] || DEFAULT_OUT;
  const data = readJson(input);
  const items = normalizeItems(data);
  const groups = groupByDate(items);
  // Rebuild the local preview cleanly so stale date pages do not remain.
  fs.rmSync(outDir, { recursive: true, force: true });
  mkdirp(outDir);
  const meta = { generatedAt: new Date().toISOString(), sourcePath: input };

  fs.writeFileSync(path.join(outDir, 'index.html'), renderIndex(groups, meta));
  fs.writeFileSync(path.join(outDir, 'source.json'), JSON.stringify(data, null, 2));
  fs.writeFileSync(path.join(outDir, 'items.json'), JSON.stringify(items, null, 2));

  for (const [date, dayItems] of groups) {
    const dayDir = path.join(outDir, 'daily', date);
    mkdirp(dayDir);
    fs.writeFileSync(path.join(dayDir, 'index.html'), renderDay(date, dayItems, meta));
    fs.writeFileSync(path.join(dayDir, 'daily.md'), renderDayMarkdown(date, dayItems, meta));
  }

  console.log(JSON.stringify({ ok: true, input, outDir, days: groups.length, items: items.length, index: path.join(outDir, 'index.html') }, null, 2));
}

main();
