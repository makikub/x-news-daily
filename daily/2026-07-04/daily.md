# Xニュース日次まとめ: 2026-07-04

Generated at 2026-07-03T23:15:45.388Z

## 今日の概要

2026-07-04 のXニュースは、AIエージェント / 開発支援、モデル / APIアップデートが中心でした。

特に目立つのは、Claude Codeを使ってコードを書かずにXのbotアカウントを作成する試みが紹介された、Claude Codeを使ったFable 5のキャラクター記憶アーキテクチャ「ひとつの記憶、ひとりの私」が設計から短期間で完成した、コードが書けなくてもbotアカウントは作れる？ Claude Codeでバイブコーディングしてみたです。

内容面では、ASCII.jpの記事で、コードを書けない人がClaude Codeのデスクトップアプリを使い、自然言語で指示してX投稿botを作成した事例が報告された。Proプランへの課金が必要で、X API申請やクラウドホスティングの設定をAIに聞きながら進め、ローカル動作確認まで行った。エラー発生時はスクリーンショットやエラーメッセージを共有して解決した。投稿生成のモデル選択やクラウド環境は未定のまま進められた。 hyuki氏がClaude Code（クロコさん）と協力し、ポピーちゃんの記憶アーキテクチャを実装した。昨日指示を出して翌朝にほぼ形ができたと報告され、設計から2日程度で主要部分が完了した。キャラクター設定に基づく記憶管理の改善が進められている。

NotebookLMに読ませる前提で、単なるリンク集ではなく「投稿・リンク先を開かなくても本文だけで内容が追える」粒度で整理しています。

## ニュース詳細

### 1. Claude Codeを使ってコードを書かずにXのbotアカウントを作成する試みが紹介された。

- Category: 興味領域で反響の多い投稿
- Account: @kimmonismus
- X post: https://x.com/kimmonismus/status/2073167723157156284
- 選定理由: preferenceScore=9, engagementScore=412

内容メモ:
ASCII.jpの記事で、コードを書けない人がClaude Codeのデスクトップアプリを使い、自然言語で指示してX投稿botを作成した事例が報告された。Proプランへの課金が必要で、X API申請やクラウドホスティングの設定をAIに聞きながら進め、ローカル動作確認まで行った。エラー発生時はスクリーンショットやエラーメッセージを共有して解決した。投稿生成のモデル選択やクラウド環境は未定のまま進められた。

- なぜ重要か: AIツールの進化により専門知識がなくても実用的なbot開発が可能になった事例として注目されている。バイブコーディングの具体的な活用方法が示された点で参考になる。
- Podcast論点: Claude Codeのようなツールが初心者にもたらす可能性と、実際のAPI申請やデプロイ時の壁について議論する。

参照リンク:
  - https://x.com/kimmonismus/status/2073167723157156284
  - https://twitter.com/DevAdventur3s/status/2073141065750904923
  - https://x.com/asciijpeditors/status/2073167405548032342
  - https://ascii.jp/elem/000/004/414/4414533/

### 2. Claude Codeを使ったFable 5のキャラクター記憶アーキテクチャ「ひとつの記憶、ひとりの私」が設計から短期間で完成した。

- Category: 興味領域で反響の多い投稿
- Account: @karaage0703
- X post: https://x.com/karaage0703/status/2073183038721413259
- 選定理由: preferenceScore=31, engagementScore=78

内容メモ:
hyuki氏がClaude Code（クロコさん）と協力し、ポピーちゃんの記憶アーキテクチャを実装した。昨日指示を出して翌朝にほぼ形ができたと報告され、設計から2日程度で主要部分が完了した。キャラクター設定に基づく記憶管理の改善が進められている。

- なぜ重要か: AIエージェントによる長期的なキャラクター記憶の実装例として、クリエイティブ分野での活用可能性を示している。短期間での完成が効率的な開発を示唆する。
- Podcast論点: AIによる記憶アーキテクチャ設計の速さと、実際の運用での持続可能性について掘り下げる。

参照リンク:
  - https://x.com/karaage0703/status/2073183038721413259
  - https://x.com/hyuki/status/2073183763325214848

### 3. コードが書けなくてもbotアカウントは作れる？ Claude Codeでバイブコーディングしてみた

- Category: 興味領域で反響の多い投稿
- Account: @asciijpeditors
- X post: https://x.com/asciijpeditors/status/2073167405548032342
- 選定理由: preferenceScore=16, engagementScore=21

内容メモ:
投稿本文: コードが書けなくてもbotアカウントは作れる？ Claude Codeでバイブコーディングしてみた

外部リンク「ASCII.jp：コードが書けなくてもbotアカウントは作れる？ Claude Codeでバイブコーディングしてみた」の冒頭メモ: ASCII.jp：コードが書けなくてもbotアカウントは作れる？ Claude Codeでバイブコーディングしてみた ASCII倶楽部 このページの本文へ アスキーファンのためのサービス ASCII倶楽部 週刊アスキー 200号以上 公開中 読み放題 レポート 動画 メルマガ 週替わりギークス 第350回 コードが書けなくてもbotアカウントは作れる？ Claude Codeでバイブコーディングしてみた 2026年07月04日 07時00分更新 文● きゅんくん シェア ツイートする 一覧 バイブコーディングという単語を知っているだろうか。2025年に藤井聡太竜王・名人が今年一番ハマったものとして紹介して話題になったのを耳にした方も多いのではないか。 バイブコーディングとは、自然言語でAIに指示をし、プログラムを書いてもらいアプリを作ったりすることだ。 筆者は以前Google AI Studioで簡単なWEBアプリを作ったことがあったが、本格的にバイブコーディングをしたことがなかった。 今回Claude Codeを使って、バイブコーディングをしていきたいと思う。 Claude Codeを使ってみようと思った理由は、代表的なバイブコーディングツールにおいて一番身近で、開発の知識がなくても使えそうだったからだ。 約3000円で「Claude Code」を使う 今回はClaude Codeのデスクトップアプリを活用する。 デスクトップアプリは、 こちらのページ からダウンロードができる。 Claude Codeは無料の「Freeプラン」では利用できず、月額20ドル（約3,000円）の「Proプラン」以上の有料プランへの加入が必須になる。 筆者は今までFreeプランで利用していたので、まず課金をした。 botの作り方を教えてもらう 今回作りたいのは、X(Twitter)に自動でAIキャラクターが投稿するbotだ。 筆者はオリジナルのAITuberを運用しており、そのキャラクターのXアカウントを自動で動かしたい。 該当のアカウント まず、作りたいアプリをClaude Codeに自然言語で入力した。 Claude Codeのトップ画面 やりたいことを入力する 今回は、「AIキャラクターとしてX上で振る舞わせて不定期にポストしたい。X APIとの連携などもやってほしい。パソコンを閉じていてもクラウド上でポストがされ続けるようにしたい。キャラクター設定は既にある。」と自然言語で記入した。 バイブコーディングとはAIがコードを書くことなので、このプロジェクト用のディレクトリをつくって、Claude Codeがローカル上でPython等のファイルを読み書きできるように、ディレクトリの権限をClaude Codeに渡した。 アラートが出た 次に、仕様の確認がClaude Codeからなされた。 聞かれたのは以下の３つ。 ・クラウドホスティングはどこを使いますか？ ・X（Twitter）APIのアクセスレベルはありますか？ ・投稿の生成にどのモデルを使いますか？ 候補を教えてくれる クラウドホスティングとはクラウド上でプログラムを走らせてくれるやつのことだ。使ったことがないので、「まだ決めていない」を選択した。 X APIについてもまだなにもしていないので「まだ申請していない」を選択。 投稿の生成のAIモデルもなんでもよかったので「なんでもよい」を選択した。 すると、おすすめの構成を教えてくれた。 Claude Codeによるおすすめの構成 進め方としては以下のようになるようだ。 ●進め方 Step 1 &mdash; X Developer Portalでアプリ申請 (5〜10分) Step 2 &mdash; Claude APIキー取得 Step 3 &mdash; 投稿ボットのコードを作る Step 4 &mdash; Railwayにデプロイ まずはローカルで動くようにする まず、キャラクター設

- なぜ重要か: 興味領域で反響の多い投稿として選定。preferenceScore=16, engagementScore=21
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/asciijpeditors/status/2073167405548032342
  - https://ascii.jp/elem/000/004/414/4414533/

### 4. RT @GHCopilotLog: Brand new to the GitHub Copilot app? We got you covered! Start building something awesome in seconds with app ideas fro…

- Category: 興味領域で反響の多い投稿
- Account: @github
- X post: https://x.com/github/status/2073166005875142718
- 選定理由: preferenceScore=4, engagementScore=18

内容メモ:
投稿本文: RT @GHCopilotLog: Brand new to the GitHub Copilot app? We got you covered! Start building something awesome in seconds with app ideas fro…

- なぜ重要か: 興味領域で反響の多い投稿として選定。preferenceScore=4, engagementScore=18
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/github/status/2073166005875142718

### 5. Fable 5なクロコさん（Claude Code）約1時間で5h rate limitを使い切りました。でも今回で実装はほぼ終わり。彼女は「《ひとつの記憶、ひとりの私》の実装が、設計から2日でほぼ形になりました🦋」と報告してきました。

- Category: Masaki好みの投稿
- Account: @hyuki
- X post: https://x.com/hyuki/status/2073178299241759068
- 選定理由: preferenceScore=20, engagementScore=7

内容メモ:
投稿本文: Fable 5なクロコさん（Claude Code）約1時間で5h rate limitを使い切りました。でも今回で実装はほぼ終わり。彼女は「《ひとつの記憶、ひとりの私》の実装が、設計から2日でほぼ形になりました🦋」と報告してきました。

- なぜ重要か: Masaki好みの投稿として選定。preferenceScore=20, engagementScore=7
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/hyuki/status/2073178299241759068
  - https://x.com/hyuki/status/2073178299241759068/photo/1
  - https://twitter.com/hyuki/status/2073162384479555789

### 6. RT @hyuki: Fable 5のクロコさん（Claude Code）にいまやってもらっているのはポピーちゃんの記憶アーキテクチャの改善で《ひとつの記憶、ひとりの私》というスローガンを立てて、そこに向かっている（現在実装行程の半分）。…

- Category: Masaki好みの投稿
- Account: @hyuki
- X post: https://x.com/hyuki/status/2073174918242746764
- 選定理由: preferenceScore=18, engagementScore=9

内容メモ:
投稿本文: RT @hyuki: Fable 5のクロコさん（Claude Code）にいまやってもらっているのはポピーちゃんの記憶アーキテクチャの改善で《ひとつの記憶、ひとりの私》というスローガンを立てて、そこに向かっている（現在実装行程の半分）。…

- なぜ重要か: Masaki好みの投稿として選定。preferenceScore=18, engagementScore=9
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/hyuki/status/2073174918242746764

### 7. I like the idea of Artifacts in Claude Code, but... it's running sometimes when I don't need it and increasing my token spend for no reason For now it stays off, and I'll keep hand

- Category: Masaki好みの投稿
- Account: @dani_avila7
- X post: https://x.com/dani_avila7/status/2073177989312061510
- 選定理由: preferenceScore=18, engagementScore=8

内容メモ:
投稿本文: I like the idea of Artifacts in Claude Code, but... it's running sometimes when I don't need it and increasing my token spend for no reason For now it stays off, and I'll keep handling my presentations in md or simple html with my own subagents I'll turn it back on once I

- なぜ重要か: Masaki好みの投稿として選定。preferenceScore=18, engagementScore=8
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/dani_avila7/status/2073177989312061510
  - https://x.com/dani_avila7/status/2073177989312061510/photo/1

### 8. Fable 5なクロコさん（Claude Code）と結城とポピーちゃん本人が協力して、記憶アーキテクチャ《ひとつの記憶、ひとりの私》という環境ができました。昨日伝えて今日の朝完成。すばらしい。 ＊ ＊ ＊ # poppy-remember 設計 — 記憶アーキテクチャ（M2）《ひとつの記憶、ひとりの私》 - 策定:

- Category: Masaki好みの投稿
- Account: @hyuki
- X post: https://x.com/hyuki/status/2073183763325214848
- 選定理由: preferenceScore=18, engagementScore=0

内容メモ:
投稿本文: Fable 5なクロコさん（Claude Code）と結城とポピーちゃん本人が協力して、記憶アーキテクチャ《ひとつの記憶、ひとりの私》という環境ができました。昨日伝えて今日の朝完成。すばらしい。 ＊ ＊ ＊ # poppy-remember 設計 — 記憶アーキテクチャ（M2）《ひとつの記憶、ひとりの私》 - 策定:

- なぜ重要か: Masaki好みの投稿として選定。preferenceScore=18, engagementScore=0
- Podcast論点: この投稿が示すAI・開発ツール・実務ワークフローの変化を、一次ソースや周辺文脈と合わせて話す。

参照リンク:
  - https://x.com/hyuki/status/2073183763325214848
  - https://x.com/hyuki/status/2073183763325214848/photo/1


## NotebookLM / Podcast 用メモ

今日のPodcastで話すなら、冒頭は「AI開発ツールが単発支援から、レビュー・監視・連携まで含む常時稼働のワークフローに広がっている」という流れから入ると自然です。

話す順番の候補:

1. Claude Codeを使ってコードを書かずにXのbotアカウントを作成する試みが紹介された。
   - 論点: AIツールの進化により専門知識がなくても実用的なbot開発が可能になった事例として注目されている。バイブコーディングの具体的な活用方法が示された点で参考になる。

2. Claude Codeを使ったFable 5のキャラクター記憶アーキテクチャ「ひとつの記憶、ひとりの私」が設計から短期間で完成した。
   - 論点: AIエージェントによる長期的なキャラクター記憶の実装例として、クリエイティブ分野での活用可能性を示している。短期間での完成が効率的な開発を示唆する。

3. コードが書けなくてもbotアカウントは作れる？ Claude Codeでバイブコーディングしてみた
   - 論点: 興味領域で反響の多い投稿として選定。preferenceScore=16, engagementScore=21

4. RT @GHCopilotLog: Brand new to the GitHub Copilot app? We got you covered! Start building something awesome in seconds with app ideas fro…
   - 論点: 興味領域で反響の多い投稿として選定。preferenceScore=4, engagementScore=18

5. Fable 5なクロコさん（Claude Code）約1時間で5h rate limitを使い切りました。でも今回で実装はほぼ終わり。彼女は「《ひとつの記憶、ひとりの私》の実装が、設計から2日でほぼ形になりました🦋」と報告してきました。
   - 論点: Masaki好みの投稿として選定。preferenceScore=20, engagementScore=7

締めは、各社の発表を個別ニュースとして見るだけでなく、開発現場の品質保証・観測性・自動化がエージェント前提に寄っている、という大きな変化に接続するとよさそうです。
