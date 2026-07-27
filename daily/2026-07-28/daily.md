# Xニュース日次まとめ: 2026-07-28

Generated at 2026-07-27T23:15:49.075Z

## 今日の概要

2026-07-28 のXニュースは、モデル / APIアップデート、研究・運用ノウハウが中心でした。

特に目立つのは、Google Cloudで予算超過を自動停止するSpend cap budgetがPublic Previewになった、Anthropic CEOのDario Amodeiがオープンウェイトモデル禁止を否定し、危険能力を持つモデルの事前テストを主張した、BigQueryでテーブルの変更履歴を返すAPPENDS/CHANGES関数が一般公開されたです。

内容面では、投稿ではGoogle Cloudの利用料金に上限を設けるSpend cap budget機能がPublic Previewになったと共有された。Gemini API、Agent Platform、Cloud Run、Cloud Run functionsが対象で、予算を超過した際に新規リクエストを停止して課金を防ぐ。外部文書では予算の作成・編集方法やアラート設定が説明されており、プロジェクトオーナー向けのコスト管理ツールとして位置づけられている。未確認点として全サービスへの対応状況は投稿時点で明記されていない。 Anthropicの公式声明で、Dario Amodeiはオープンウェイトモデルを禁止したことは一度もないと明言した。危険な能力を持つモデルについてはリリース前のテストを求めつつ、保護主義的な禁止は国家安全保障上の懸念を解決しないと述べている。外部文書では中国製モデルを巡る議論や、権威主義国家による軍事利用リスクが具体的に挙げられている。

NotebookLMに読ませる前提で、単なるリンク集ではなく「投稿・リンク先を開かなくても本文だけで内容が追える」粒度で整理しています。

## ニュース詳細

### 1. Google Cloudで予算超過を自動停止するSpend cap budgetがPublic Previewになった。

- Category: 興味領域で反響の多い投稿
- Account: @kimmonismus
- X post: https://x.com/kimmonismus/status/2081874065908785158
- 選定理由: preferenceScore=8, engagementScore=90

内容メモ:
投稿ではGoogle Cloudの利用料金に上限を設けるSpend cap budget機能がPublic Previewになったと共有された。Gemini API、Agent Platform、Cloud Run、Cloud Run functionsが対象で、予算を超過した際に新規リクエストを停止して課金を防ぐ。外部文書では予算の作成・編集方法やアラート設定が説明されており、プロジェクトオーナー向けのコスト管理ツールとして位置づけられている。未確認点として全サービスへの対応状況は投稿時点で明記されていない。

- なぜ重要か: AI関連サービスの利用が増える中、予期せぬ高額請求を防ぐ実務的な仕組みとして注目される。クラウド利用者にとって予算管理の選択肢が広がる点が重要だ。
- Podcast論点: Spend capのような安全装置が普及すると、開発者のコスト意識はどう変わるか議論できる。

参照リンク:
  - https://x.com/kimmonismus/status/2081874065908785158
  - https://x.com/kimmonismus/status/2081874065908785158/photo/1
  - https://twitter.com/AnthropicAI/status/2081864750296658008
  - https://x.com/y_sugi_it/status/2081874850948497417
  - https://docs.cloud.google.com/billing/docs/how-to/budgets-spend-caps?hl=en

### 2. Anthropic CEOのDario Amodeiがオープンウェイトモデル禁止を否定し、危険能力を持つモデルの事前テストを主張した。

- Category: 興味領域で反響の多い投稿
- Account: @y_sugi_it
- X post: https://x.com/y_sugi_it/status/2081874850948497417
- 選定理由: preferenceScore=8, engagementScore=7

内容メモ:
Anthropicの公式声明で、Dario Amodeiはオープンウェイトモデルを禁止したことは一度もないと明言した。危険な能力を持つモデルについてはリリース前のテストを求めつつ、保護主義的な禁止は国家安全保障上の懸念を解決しないと述べている。外部文書では中国製モデルを巡る議論や、権威主義国家による軍事利用リスクが具体的に挙げられている。

- なぜ重要か: AIの安全性とオープンソースをめぐる業界内の対立が鮮明になり、政策議論の行方が注目される。米政府の対応次第でグローバルなAI開発環境が変わる可能性がある。
- Podcast論点: オープンウェイトモデルの是非と国家安全保障のバランスをどう取るべきか掘り下げられる。

参照リンク:
  - https://x.com/y_sugi_it/status/2081874850948497417
  - https://docs.cloud.google.com/billing/docs/how-to/budgets-spend-caps?hl=en
  - https://x.com/tetumemo/status/2081878767165911045
  - https://www.anthropic.com/news/position-open-weights-models

### 3. BigQueryでテーブルの変更履歴を返すAPPENDS/CHANGES関数が一般公開された。

- Category: 興味領域で反響の多い投稿
- Account: @izutorishima
- X post: https://x.com/izutorishima/status/2081875542413091081
- 選定理由: preferenceScore=9, engagementScore=6

内容メモ:
BigQueryのAPPENDS/CHANGES関数がPreviewからGAになったと投稿で報告された。指定期間内に追加または変更された行を取得でき、データパイプラインの増分更新や監査に活用できる。CHANGES関数はテーブルオプションの有効化が必要で、外部文書でもメタデータ管理やクエリ例が詳しく記載されている。

- なぜ重要か: 大規模データ処理の運用効率が向上し、リアルタイム分析やコンプライアンス対応が容易になる。Google Cloudユーザーにとって実用的なアップデートだ。
- Podcast論点: データ基盤の進化がAI開発のスピードにどう影響するかを考察できる。

参照リンク:
  - https://x.com/izutorishima/status/2081875542413091081
  - https://x.com/y_sugi_it/status/2081877442827010064
  - https://docs.cloud.google.com/bigquery/docs/change-history?hl=en

### 4. 📝 Kimi K3の動きが激しく、AnthropicのCEOが「オープンソースAIを禁止しようとしている」という噂が流れていた 「自分たちのビジネスを守るためだろ」と でも、彼はそれを真っ向から否定した 「そんなことは一度も主張していない」

- Category: 興味領域で反響の多い投稿
- Account: @tetumemo
- X post: https://x.com/tetumemo/status/2081878733871632402
- 選定理由: preferenceScore=6, engagementScore=4

内容メモ:
投稿本文: 📝 Kimi K3の動きが激しく、AnthropicのCEOが「オープンソースAIを禁止しようとしている」という噂が流れていた 「自分たちのビジネスを守るためだろ」と でも、彼はそれを真っ向から否定した 「そんなことは一度も主張していない」

- なぜ重要か: 興味領域で反響の多い投稿として選定。preferenceScore=6, engagementScore=4
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/tetumemo/status/2081878733871632402
  - https://x.com/tetumemo/status/2081878733871632402/photo/1
  - https://twitter.com/anthropicai/status/2081864750296658008

### 5. VS Code がプロンプトファイルをスキルに変換する機能をリリースしたみたい VS Code経由で各種AIエージェントを活用している人には、意外と便利な機能かも （最近、VS Code 削除した人多いし、私もアンインストールしてしまったけど...）

- Category: Masaki好みの投稿
- Account: @_nogu66
- X post: https://x.com/_nogu66/status/2081876788452671752
- 選定理由: preferenceScore=18, engagementScore=0

内容メモ:
投稿本文: VS Code がプロンプトファイルをスキルに変換する機能をリリースしたみたい VS Code経由で各種AIエージェントを活用している人には、意外と便利な機能かも （最近、VS Code 削除した人多いし、私もアンインストールしてしまったけど...）

- なぜ重要か: Masaki好みの投稿として選定。preferenceScore=18, engagementScore=0
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/_nogu66/status/2081876788452671752
  - https://twitter.com/3167734591/status/2081738124078600381

### 6. ここ数日、長時間自律するクラウドエージェントの開発・デプロイをしつつ、登壇の準備を2件（今日と明日）しつつ、スプラトゥーンレイダースの裏ボス倒してドパってたりしたので、だいぶ疲れた！

- Category: Masaki好みの投稿
- Account: @gota_bara
- X post: https://x.com/gota_bara/status/2081875025980711331
- 選定理由: preferenceScore=8, engagementScore=1

内容メモ:
投稿本文: ここ数日、長時間自律するクラウドエージェントの開発・デプロイをしつつ、登壇の準備を2件（今日と明日）しつつ、スプラトゥーンレイダースの裏ボス倒してドパってたりしたので、だいぶ疲れた！

- なぜ重要か: Masaki好みの投稿として選定。preferenceScore=8, engagementScore=1
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/gota_bara/status/2081875025980711331

### 7. Our position on open-weights models

- Category: Masaki好みの投稿
- Account: @tetumemo
- X post: https://x.com/tetumemo/status/2081878767165911045
- 選定理由: preferenceScore=6, engagementScore=2

内容メモ:
投稿本文: Our position on open-weights models

外部リンク「Our position on open-weights models \ Anthropic」の冒頭メモ: Our position on open-weights models \ Anthropic Skip to main content Skip to footer Research Policy Commitments Learn News Try Claude Announcements Our position on open-weights models Jul 27, 2026 A post by Dario Amodei, Anthropic CEO Over the last few days there has been a lot of discussion about open-weights models, especially those from China. Reports suggest that some US officials are considering banning the use of Chinese open-weights models by US companies. In response, many tech companies have signed a letter supporting open-weights models, and some people have even accused Anthropic of wanting to ban open-weights models as a means of protecting our business. Anyone who has read my past writing should know that I don’t regard such bans as a useful measure, but let me state it clearly so that there is no doubt: Anthropic has never advocated for a ban on open-weights models. Open-weights models that don’t have dangerous capabilities are a public good: they don’t cost anything besides the compute needed to run them, and they provide value to businesses, developers, and researchers. Protectionist bans would not address my most serious national security concerns. Specifically, I am worried about two nightmare scenarios. I laid these out in my essay The Adolescence of Technology six months ago 1 , and have held these positions consistently for many years: My primary concern is the risk that authoritarian governments—not solely the Chinese Communist Party (CCP), although the CCP is clearly the most capable threat—build AI models that are more powerful than those built by the US, and use them to achieve permanent military superiority or perpetrate incredibly deep repre

- なぜ重要か: Masaki好みの投稿として選定。preferenceScore=6, engagementScore=2
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/tetumemo/status/2081878767165911045
  - https://www.anthropic.com/news/position-open-weights-models

### 8. BigQueryでテーブルの追加・変更履歴を確認できるAPPENDS/CHANGES関数が一般公開（Preview→GA）。指定期間内に追加/変更された行の一覧を返す。CHANGES関数はテーブルでオプションを有効化する必要あり。データパイプラインの増分更新やデータ監査に有用 #GoogleCloud

- Category: Masaki好みの投稿
- Account: @y_sugi_it
- X post: https://x.com/y_sugi_it/status/2081877442827010064
- 選定理由: preferenceScore=6, engagementScore=1

内容メモ:
投稿本文: BigQueryでテーブルの追加・変更履歴を確認できるAPPENDS/CHANGES関数が一般公開（Preview→GA）。指定期間内に追加/変更された行の一覧を返す。CHANGES関数はテーブルでオプションを有効化する必要あり。データパイプラインの増分更新やデータ監査に有用 #GoogleCloud

外部リンク「Work with change history | BigQuery | Google Cloud Documentation」の冒頭メモ: Work with change history | BigQuery | Google Cloud Documentation Skip to main content Technology areas close AI and ML Application development Application hosting Compute Data analytics and pipelines Databases Distributed, hybrid, and multicloud Industry solutions Migration Networking Observability and monitoring Security Storage Cross-product tools close Access and resources management Costs and usage management Infrastructure as code SDK, languages, frameworks, and tools / Console English Deutsch Español Español – América Latina Français Indonesia Italiano Português Português – Brasil עברית 中文 – 简体 中文 – 繁體 日本語 한국어 Sign in BigQuery Start free Overview Guides Reference Samples Resources Technology areas More Overview Guides Reference Samples Resources Cross-product tools More Console Discover Product overview Try BigQuery using the sandbox Get started Console walkthroughs and videos Use the console Explore the console Load and query data Use Notebook gallery Create reservations Try DataFrames Use agents Analyze data with the Colab Data Science Agent Use the bq CLI tool Use the client libraries Plan Organize resources API dependencies Datasets Introduction Create datasets List datasets Cross-region replication Managed disaster recovery Migrate to managed disaster recovery Dataset data retention Tables BigQuery tables Introduction Create and use tables Specify table schemas Specify a schema Specify nested and repeated columns Specify default column values Specify ObjectRef values Segment with partitioned tables Introduction Create partitio

- なぜ重要か: Masaki好みの投稿として選定。preferenceScore=6, engagementScore=1
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/y_sugi_it/status/2081877442827010064
  - https://docs.cloud.google.com/bigquery/docs/change-history?hl=en


## NotebookLM / Podcast 用メモ

今日のPodcastで話すなら、冒頭は「AI開発ツールが単発支援から、レビュー・監視・連携まで含む常時稼働のワークフローに広がっている」という流れから入ると自然です。

話す順番の候補:

1. Google Cloudで予算超過を自動停止するSpend cap budgetがPublic Previewになった。
   - 論点: AI関連サービスの利用が増える中、予期せぬ高額請求を防ぐ実務的な仕組みとして注目される。クラウド利用者にとって予算管理の選択肢が広がる点が重要だ。

2. Anthropic CEOのDario Amodeiがオープンウェイトモデル禁止を否定し、危険能力を持つモデルの事前テストを主張した。
   - 論点: AIの安全性とオープンソースをめぐる業界内の対立が鮮明になり、政策議論の行方が注目される。米政府の対応次第でグローバルなAI開発環境が変わる可能性がある。

3. BigQueryでテーブルの変更履歴を返すAPPENDS/CHANGES関数が一般公開された。
   - 論点: 大規模データ処理の運用効率が向上し、リアルタイム分析やコンプライアンス対応が容易になる。Google Cloudユーザーにとって実用的なアップデートだ。

4. 📝 Kimi K3の動きが激しく、AnthropicのCEOが「オープンソースAIを禁止しようとしている」という噂が流れていた 「自分たちのビジネスを守るためだろ」と でも、彼はそれを真っ向から否定した 「そんなことは一度も主張していない」
   - 論点: 興味領域で反響の多い投稿として選定。preferenceScore=6, engagementScore=4

5. VS Code がプロンプトファイルをスキルに変換する機能をリリースしたみたい VS Code経由で各種AIエージェントを活用している人には、意外と便利な機能かも （最近、VS Code 削除した人多いし、私もアンインストールしてしまったけど...）
   - 論点: Masaki好みの投稿として選定。preferenceScore=18, engagementScore=0

締めは、各社の発表を個別ニュースとして見るだけでなく、開発現場の品質保証・観測性・自動化がエージェント前提に寄っている、という大きな変化に接続するとよさそうです。
