# Xニュース日次まとめ: 2026-07-29

Generated at 2026-07-28T23:15:45.284Z

## 今日の概要

2026-07-29 のXニュースは、AIエージェント / 開発支援が中心でした。

特に目立つのは、OpenAIがコードの脆弱性検出・修正向けCLIとTypeScript SDKをオープンソース公開した、Kimi K3モデルがCursorに追加され、CursorBenchでフロンティアモデルに近いスコアを出した、we've just open-sourced the Codex Security CLI:です。

内容面では、thsottiaux氏が、OpenAIのCodex Security CLIとTypeScript SDKのリリースを共有した。リポジトリのスキャン、変更レビューのセキュリティチェック、CIでの実行が可能になる。GitHubリポジトリopenai/codex-securityのページではSDKとCLIの提供が確認できるが、具体的な利用手順や今後の更新予定は投稿本文に記載されていない。 prof_LLM氏がCursor AIの投稿をRTし、Kimi K3がCursorで利用可能になったと伝えた。US拠点の推論環境で提供されており、性能はCursorBenchで上位に近い。投稿本文以外に詳細なベンチマーク結果や利用条件の追加情報は含まれていない。

NotebookLMに読ませる前提で、単なるリンク集ではなく「投稿・リンク先を開かなくても本文だけで内容が追える」粒度で整理しています。

## ニュース詳細

### 1. OpenAIがコードの脆弱性検出・修正向けCLIとTypeScript SDKをオープンソース公開した。

- Category: 興味領域で反響の多い投稿
- Account: @prof_LLM
- X post: https://x.com/prof_LLM/status/2082242610417238463
- 選定理由: preferenceScore=9, engagementScore=1347

内容メモ:
thsottiaux氏が、OpenAIのCodex Security CLIとTypeScript SDKのリリースを共有した。リポジトリのスキャン、変更レビューのセキュリティチェック、CIでの実行が可能になる。GitHubリポジトリopenai/codex-securityのページではSDKとCLIの提供が確認できるが、具体的な利用手順や今後の更新予定は投稿本文に記載されていない。

- なぜ重要か: AIを活用したコードセキュリティツールの公開により、開発者の脆弱性対応が効率化される可能性がある。オープンソース化によりコミュニティでの改善や利用拡大が期待される。
- Podcast論点: Codex Securityの実際の検出精度や既存ツールとの違いについて、開発者の利用事例を交えて議論できる。

参照リンク:
  - https://x.com/prof_LLM/status/2082242610417238463
  - https://x.com/thsottiaux/status/2082241164850364555
  - https://github.com/openai/codex-security

### 2. Kimi K3モデルがCursorに追加され、CursorBenchでフロンティアモデルに近いスコアを出した。

- Category: 興味領域で反響の多い投稿
- Account: @thsottiaux
- X post: https://x.com/thsottiaux/status/2082241164850364555
- 選定理由: preferenceScore=17, engagementScore=1330

内容メモ:
prof_LLM氏がCursor AIの投稿をRTし、Kimi K3がCursorで利用可能になったと伝えた。US拠点の推論環境で提供されており、性能はCursorBenchで上位に近い。投稿本文以外に詳細なベンチマーク結果や利用条件の追加情報は含まれていない。

- なぜ重要か: 高性能モデルのCursor統合により、開発者のAI支援コーディング体験が向上する可能性がある。新モデルの採用動向として注目される。
- Podcast論点: Kimi K3と既存モデルとの実用的な違いや、Cursorユーザーへの影響を掘り下げられる。

参照リンク:
  - https://x.com/thsottiaux/status/2082241164850364555
  - https://github.com/openai/codex-security
  - https://x.com/prof_LLM/status/2082242610417238463

### 3. we've just open-sourced the Codex Security CLI:

- Category: 興味領域で反響の多い投稿
- Account: @gdb
- X post: https://x.com/gdb/status/2082235089539526690
- 選定理由: preferenceScore=9, engagementScore=803

内容メモ:
投稿本文: we've just open-sourced the Codex Security CLI:

外部リンク「OpenAI just open-sourced Codex Security | Hacker News」の冒頭メモ: OpenAI just open-sourced Codex Security | Hacker News Hacker News new | past | comments | ask | show | jobs | submit login OpenAI just open-sourced Codex Security ( github.com/openai ) 254 points by bakigul 2 hours ago | hide | past | favorite | 49 comments help dangelosaurus 1 hour ago | next [–] Hey HN, Michael here, co-founder of Promptfoo and one of the people working on the Codex Security CLI at OpenAI. Thanks for checking this out and for flagging the auth issues. We just open-sourced it, and there&#x27;s still plenty for us to improve. Expect the product to evolve quickly. If you try it, I&#x27;d really appreciate hearing what works well and what you think we should improve. Happy to answer questions here. CLI docs: https:&#x2F;&#x2F;learn.chatgpt.com&#x2F;docs&#x2F;security&#x2F;cli EDIT: If you&#x27;d like to help make this better, we&#x27;re hiring: https:&#x2F;&#x2F;openai.com&#x2F;careers&#x2F;full-stack-software-engineer-cybe... reply orangelimesoda 3 minutes ago | parent | next [–] > Have experience shipping production full-stack products across modern web frontends and backend services. I&#x27;m amazed that the requirements are so low (or at least this vague) for jobs at companies like these. Has anyone else had the experience of going to an interview and feeling like you were never asked any qualifying questions? All the questions were easy, your answers were straightforward, you "got them right", but then were not chosen? I find on the other side, they&#x27;re also left with dozens of people who "passed" and then it comes down to a pretty arbitrary decision on who gets hired (if we are talking external, no referral, etc.) I wonder if

- なぜ重要か: 興味領域で反響の多い投稿として選定。preferenceScore=9, engagementScore=803
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/gdb/status/2082235089539526690
  - https://news.ycombinator.com/item?id=49089755

### 4. RT @bioshok3: OpenAI、Anthropic、Google、Metaなど社員1122人がAI研究が急加速し制御不能になるリスクがあるため開発を国際的に減速できる仕組みを米政府に準備してほしいと訴える書簡発表！！！！！！！！

- Category: 興味領域で反響の多い投稿
- Account: @izutorishima
- X post: https://x.com/izutorishima/status/2082237739270074808
- 選定理由: preferenceScore=6, engagementScore=99

内容メモ:
投稿本文: RT @bioshok3: OpenAI、Anthropic、Google、Metaなど社員1122人がAI研究が急加速し制御不能になるリスクがあるため開発を国際的に減速できる仕組みを米政府に準備してほしいと訴える書簡発表！！！！！！！！

外部リンク https://t.co/poC4HR: 取得失敗 HTTP 404

- なぜ重要か: 興味領域で反響の多い投稿として選定。preferenceScore=6, engagementScore=99
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/izutorishima/status/2082237739270074808
  - https://t.co/poC4HR

### 5. xangiのアップデートに合わせて、書籍をv0.4.0にアップデートしました &gt; 生活に溶け込むAI — AIエージェントで作る、自分だけのアシスタント | からあげ #booth_pm

- Category: Masaki好みの投稿
- Account: @karaage0703
- X post: https://x.com/karaage0703/status/2082232131409916326
- 選定理由: preferenceScore=20, engagementScore=6

内容メモ:
投稿本文: xangiのアップデートに合わせて、書籍をv0.4.0にアップデートしました &gt; 生活に溶け込むAI — AIエージェントで作る、自分だけのアシスタント | からあげ #booth_pm

外部リンク「生活に溶け込むAI — AIエージェントで作る、自分だけのアシスタント - からあげ - BOOTH」の冒頭メモ: 生活に溶け込むAI — AIエージェントで作る、自分だけのアシスタント - からあげ - BOOTH ログイン BOOTHとは 作品を出品しよう 現在この商品は非公開中です 非公開中はオーナー以外のユーザーはページにアクセスできません。 この商品を公開する からあげ karaage ブログ Twitter からあげ 生活に溶け込むAI — AIエージェントで作る、自分だけのアシスタント ダウンロード商品 ¥ 1,000 カートに入れる ギフトとして贈る AIを「ツール」から「生活の相棒」に変える一冊。 「面倒なことはChatGPTにやらせよう」の著者・からあげが、実際に作り上げたAIアシスタントのノウハウを一冊にまとめました。 朝はテックニュースをキュレーション、昼は調べ物やドキュメント作成、夜はその日の出来事を日記にまとめてくれる——そんなAIアシスタントを、Raspberry Pi 1台とAIエージェント（Claude Code / Codex CLI / Gemini CLI）で作る方法を、ステップバイステップで解説します。 プログラミングの知識は、最小限でOKです。AIアシスタントに必要な3つの要素「愛着」「育成」「UX」をコンテキストエンジニアリング、スキル、フレームワークという3つの技術で実現する方法を本書で学ぶことができます。 ※ まだ随時AIアシスタント成長中なので、当分継続的にアップデート予定です こんな人におすすめ ChatGPTを使っているけど、もっと自分専用にカスタマイズしたい AIエージェント（Claude Code/Codex等）に興味がある Raspberry Piで何か面白いことをしたい 「自分だけのAIアシスタント」を作ってみたい 内容（全7章・約100ページ） Part 1: イントロ — AIアシスタントの一日。ツールから相棒への進化 Part 2: AIエージェント入門 — Raspberry Pi環境構築、Claude Code / Codex CLIのセットアップ Part 3: コンテキストエンジニアリング — AIに「自分」を教える。AGENTS.md、メモリシステム、BOOTSTRAP.md Part 4: スキル — サイト巡回、YouTube文字起こし、音声→記事変換。ドラえもんのポケットを作る Part 5: フレームワーク（上級編） — xangi / OpenClawでDiscord・Slackからいつでも話せる環境を構築 Part 6: スキルの応用 — プレゼン自動生成、猫日記、ヘルスケア管理、ワークスペースRAG、AIが自分から話しかけてくる機能 Part 7: まとめ — フレームワークは変わっても、原則は変わらない 対応ツール・プラットフォーム Claude Code / Codex CLI / Local LLM Raspberry Pi Discord / Slack / LINE xangi / OpenClaw 仕様 形式: PDF ページ数: 約125ページ（B5判相当） スクリーンショット多数収録 「ギフトとして贈る」とは <div class="market-item-detail [&_

- なぜ重要か: Masaki好みの投稿として選定。preferenceScore=20, engagementScore=6
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/karaage0703/status/2082232131409916326
  - https://karaage0703.booth.pm/items/8027277

### 6. Inertia v2からv3へのアップグレードは、Laravel Boostを使うことでAIエージェントで効率よく対応できます！

- Category: Masaki好みの投稿
- Account: @yoppy0123
- X post: https://x.com/yoppy0123/status/2082237418410000433
- 選定理由: preferenceScore=18, engagementScore=2

内容メモ:
投稿本文: Inertia v2からv3へのアップグレードは、Laravel Boostを使うことでAIエージェントで効率よく対応できます！

- なぜ重要か: Masaki好みの投稿として選定。preferenceScore=18, engagementScore=2
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/yoppy0123/status/2082237418410000433
  - https://twitter.com/yoppy0123/status/2036924047381197297

### 7. Codexのリセット券が余ってる人多いと思うけど、 無限画像生成編で消費するの本当におすすめ 【目安】 ・Plus：約240枚（約5時間） ・Pro $100：約1200枚（約22時間） ・Pro $200：約4800枚（4日程度）

- Category: Masaki好みの投稿
- Account: @gosrum
- X post: https://x.com/gosrum/status/2082236260035510730
- 選定理由: preferenceScore=9, engagementScore=22

内容メモ:
投稿本文: Codexのリセット券が余ってる人多いと思うけど、 無限画像生成編で消費するの本当におすすめ 【目安】 ・Plus：約240枚（約5時間） ・Pro $100：約1200枚（約22時間） ・Pro $200：約4800枚（4日程度）

- なぜ重要か: Masaki好みの投稿として選定。preferenceScore=9, engagementScore=22
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/gosrum/status/2082236260035510730
  - https://twitter.com/gosrum/status/2082234346044543476

### 8. Codex 画像生成チャレンジの途中経過報告！ ・19時間経過時点：1087枚生成、89%消費

- Category: Masaki好みの投稿
- Account: @gosrum
- X post: https://x.com/gosrum/status/2082234346044543476
- 選定理由: preferenceScore=9, engagementScore=21

内容メモ:
投稿本文: Codex 画像生成チャレンジの途中経過報告！ ・19時間経過時点：1087枚生成、89%消費

- なぜ重要か: Masaki好みの投稿として選定。preferenceScore=9, engagementScore=21
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/gosrum/status/2082234346044543476
  - https://x.com/gosrum/status/2082234346044543476/photo/1
  - https://twitter.com/gosrum/status/2082093430344483326


## NotebookLM / Podcast 用メモ

今日のPodcastで話すなら、冒頭は「AI開発ツールが単発支援から、レビュー・監視・連携まで含む常時稼働のワークフローに広がっている」という流れから入ると自然です。

話す順番の候補:

1. OpenAIがコードの脆弱性検出・修正向けCLIとTypeScript SDKをオープンソース公開した。
   - 論点: AIを活用したコードセキュリティツールの公開により、開発者の脆弱性対応が効率化される可能性がある。オープンソース化によりコミュニティでの改善や利用拡大が期待される。

2. Kimi K3モデルがCursorに追加され、CursorBenchでフロンティアモデルに近いスコアを出した。
   - 論点: 高性能モデルのCursor統合により、開発者のAI支援コーディング体験が向上する可能性がある。新モデルの採用動向として注目される。

3. we've just open-sourced the Codex Security CLI:
   - 論点: 興味領域で反響の多い投稿として選定。preferenceScore=9, engagementScore=803

4. RT @bioshok3: OpenAI、Anthropic、Google、Metaなど社員1122人がAI研究が急加速し制御不能になるリスクがあるため開発を国際的に減速できる仕組みを米政府に準備してほしいと訴える書簡発表！！！！！！！！
   - 論点: 興味領域で反響の多い投稿として選定。preferenceScore=6, engagementScore=99

5. xangiのアップデートに合わせて、書籍をv0.4.0にアップデートしました &gt; 生活に溶け込むAI — AIエージェントで作る、自分だけのアシスタント | からあげ #booth_pm
   - 論点: Masaki好みの投稿として選定。preferenceScore=20, engagementScore=6

締めは、各社の発表を個別ニュースとして見るだけでなく、開発現場の品質保証・観測性・自動化がエージェント前提に寄っている、という大きな変化に接続するとよさそうです。
