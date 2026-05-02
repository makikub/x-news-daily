#!/usr/bin/env node
// Collect X news specifically for the local NotebookLM-friendly daily site.
// Output is Japanese-first and intentionally text-heavy.
const fs = require('fs');

function readJson(p) { return JSON.parse(fs.readFileSync(p,'utf8')); }
function ymd(d){ return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`; }

async function xaiResponses({ apiKey, model, input, tools, timeoutMs = 30000 }) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(new Error('timeout')), timeoutMs);
  try {
    const res = await fetch('https://api.x.ai/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, input, tools }),
      signal: ctrl.signal
    });
    if (!res.ok) throw new Error(`xAI HTTP ${res.status}: ${(await res.text()).slice(0,200)}`);
    return await res.json();
  } finally { clearTimeout(t); }
}

function getText(resp){
  if (typeof resp.output_text === 'string') return resp.output_text;
  const texts=[];
  for (const part of resp.output || []) {
    if (part?.type==='message' && Array.isArray(part.content)) {
      for (const c of part.content) if ((c?.type==='output_text'||c?.type==='text') && typeof c.text==='string') texts.push(c.text);
    }
  }
  return texts.join('\n');
}

function tryParseJson(text){
  const s=text.indexOf('{'), e=text.lastIndexOf('}');
  if(s===-1||e===-1||e<=s) return null;
  try { return JSON.parse(text.slice(s,e+1)); } catch { return null; }
}

(async()=>{
  const apiKey=process.env.XAI_API_KEY;
  if(!apiKey){ console.error('Missing XAI_API_KEY'); process.exit(2); }

  const curatorsPath=process.argv[2]||'/root/clawd/data/info-collector/curators.json';
  const hours=Number(process.argv[3]||'24');
  const limitHandles=Number(process.argv[4]||'20');
  const maxItems=Number(process.argv[5]||'8');
  const handles=(readJson(curatorsPath).handles||[]).slice(0,limitHandles);
  const now=new Date();
  const from=new Date(now.getTime()-hours*3600*1000);
  const from_date=ymd(from), to_date=ymd(now);
  const model=process.env.XAI_MODEL||'grok-4-1-fast-reasoning';
  const items=[], seen=new Set();

  for (const h of handles) {
    if (items.length>=maxItems) break;
    console.error(`[x_news_site_collect] @${h}`);
    const tools=[{type:'x_search',allowed_x_handles:[h],from_date,to_date}];
    const input=[
      {role:'system',content:'Return ONLY valid JSON. Write all summaries in natural Japanese.'},
      {role:'user',content:`@${h} の直近約${hours}時間から、ニュース性がある投稿を最大2件選んでください。宣伝・雑談だけなら無理に拾わなくてよいです。NotebookLMにWebページとして読ませる前提なので、短すぎる箇条書きではなく、後でPodcast化しやすい説明文にしてください。JSON形式: {"items":[{"handle":"${h}","url":"https://x.com/.../status/...","what":"何が起きたかを日本語で1〜2文","why":"なぜ重要か/文脈を日本語で1〜2文","podcastAngle":"Podcastで話すなら膨らませたい論点を日本語で1文","refs":["<X URL>","<外部リンクがあれば>"]}]}`}
    ];
    let resp;
    try { resp=await xaiResponses({apiKey,model,input,tools,timeoutMs:30000}); }
    catch(e){ console.error(`[x_news_site_collect] failed @${h}: ${String(e)}`); continue; }
    const parsed=tryParseJson(getText(resp));
    if(!parsed?.items) continue;
    for(const it of parsed.items){
      if(!it?.url) continue;
      const url=String(it.url);
      if(seen.has(url)) continue;
      seen.add(url);
      const refs=Array.isArray(it.refs)?it.refs.map(String):[];
      if(!refs.length || refs[0]!==url) refs.unshift(url);
      items.push({handle:String(it.handle||h).replace(/^@/,''),url,what:String(it.what||''),why:String(it.why||''),podcastAngle:String(it.podcastAngle||''),refs});
      if(items.length>=maxItems) break;
    }
  }

  process.stdout.write(JSON.stringify({generatedAt:new Date().toISOString(),windowHours:hours,from_date,to_date,handles,items},null,2));
})();
