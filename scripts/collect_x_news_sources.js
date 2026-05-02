#!/usr/bin/env node
// Snapshot daily discovery sources for the X News Daily site.
// Sources: authenticated X home timeline + trusted primary-source URL registry.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = '/root/clawd';
const CONFIG = path.join(ROOT, 'data/info-collector/x-news-sources.json');
const OUT_ROOT = path.join(ROOT, 'data/info-collector/x-news');

function ymd(d = new Date()) {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}
function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function writeJson(p, v) { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, JSON.stringify(v, null, 2)); }

function normalizeTimeline(raw) {
  const data = Array.isArray(raw?.data) ? raw.data : [];
  const users = new Map((raw?.includes?.users || []).map((u) => [u.id, u]));
  return data.map((t) => {
    const u = users.get(t.author_id) || {};
    const urls = (t.entities?.urls || []).map((x) => x.unwound_url || x.expanded_url || x.url).filter(Boolean);
    return {
      id: t.id,
      created_at: t.created_at,
      author_id: t.author_id,
      author: u.username || u.name || null,
      text: t.text,
      url: u.username ? `https://x.com/${u.username}/status/${t.id}` : `https://x.com/i/web/status/${t.id}`,
      urls: [...new Set(urls)],
      metrics: t.public_metrics || null
    };
  });
}

function collectTimeline(limit = 100) {
  const stdout = execFileSync('xurl', ['timeline', '-n', String(limit)], { encoding: 'utf8', timeout: 60000 });
  return JSON.parse(stdout);
}

function main() {
  const cfg = readJson(CONFIG);
  const date = process.argv[2] || ymd();
  const outDir = path.join(OUT_ROOT, date);
  const limit = Number(process.argv[3] || 100);

  const rawTimeline = cfg.x?.timeline?.enabled ? collectTimeline(limit) : { data: [] };
  const timeline = normalizeTimeline(rawTimeline);
  const primarySources = cfg.primarySources || [];

  const snapshot = {
    generatedAt: new Date().toISOString(),
    date,
    sourceConfig: CONFIG,
    counts: { timeline: timeline.length, primarySources: primarySources.length },
    timeline,
    primarySources
  };

  writeJson(path.join(outDir, 'source-snapshot.json'), snapshot);
  writeJson(path.join(outDir, 'timeline.json'), timeline);
  writeJson(path.join(outDir, 'primary-sources.json'), primarySources);
  console.log(JSON.stringify({ ok: true, date, outDir, counts: snapshot.counts }, null, 2));
}

main();
