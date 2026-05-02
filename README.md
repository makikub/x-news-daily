# X News Daily

Xで収集したAI/開発ツール周辺ニュースを、NotebookLMに読み込ませやすい日次ページとしてまとめる静的サイトです。

## Published site

https://makikub.github.io/x-news-daily/

## Source strategy

Daily inputs are intentionally split into two layers:

- **X timeline**: broad discovery source for what is being discussed and shared.
- **Trusted primary-source URLs**: official blogs, docs, releases, papers, and GitHub sources used for fact-grounding.

The repository keeps the static site and scripts public, but does **not** commit source settings or raw authenticated timeline snapshots.

## Files

- `index.html` — site index
- `daily/YYYY-MM-DD/index.html` — daily page
- `daily/YYYY-MM-DD/daily.md` — text-heavy daily page for NotebookLM/reference
- `config/x-news-sources.example.json` — non-sensitive example source registry
- `scripts/collect_x_news_sources.js` — authenticated X timeline + primary-source snapshot collector
- `scripts/xai_x_news_site_collect.js` — X-news summarizer for daily pages
- `scripts/generate_x_news_site.js` — static site generator
