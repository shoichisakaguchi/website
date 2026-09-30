# HANDOFF — rdrp.io

最終更新: 2026-09-30 / セッション: d2bb2b68

このファイルはセッション間の引き継ぎ用。安定した設計事実は `AGENTS.md` に、
ここには「いまどこまで進んでいて、次に何をするか」だけを書く。

## いまブロックされていること

**RdRp Summit 2027 のページは `preview` ブランチにあり、委員会の返信4件を待っている。**
盤 `rdrp-202`（due 2026-10-08）。未回収は ①日程 3/12-13 を公開してよいか ②Hisham の役職
③Milica を載せるか ④写真4名（Katy, Gytis, Lana, Michael）。
回収済: Ingrida=EBI、Rachid 追加＋写真、Ella の写真差し替え。

⚠ **ViBioM 待ちは 2026-09-29 に解消した。**ViBioM 2027 は
`9 March 2027 - 11 March 2027 / Jena, Germany` を公式サイトで発表済み
（https://evbc.uni-jena.de/event/international-virus-bioinformatics-meeting-2027-vibiom/）。
残っているのは委員会確認だけ。

🔴 **日程の数字が2系統ある。どちらが正か未確定。**

| 出どころ | RdRp Summit の日程 |
|---|---|
| このファイルの旧記述 | 2027-03-07〜11 |
| Dropbox のフォルダ名 `20270307-11_RdRp_summit` | 2027-03-07〜11 |
| `preview` ブランチの現物 | **2027-03-12〜13**（ViBioM 3/9-11 の直後） |

3/9-11 が ViBioM 本体なので、旧記述の「3/7-11」は**親会議の日程を写し取ったものに見える**。
ただし Dropbox のフォルダ名も同じ数字なので、当時そう聞いていた可能性が消えない。
⚠ **委員会に確認するまでどちらにも寄せない。**2027 の準備物は
`~/Dropbox/omc/がっかい/20270307-11_RdRp_summit/`（フォルダ名は旧日程のまま）。

⚠ **`main` に入れる前に `heroImage-PLACEHOLDER.svg` を外すこと。**

⚠ ViBioM 側のページは RdRp Summit をサテライトとして**載せていない**（隣接イベントは EVE と
ECV 2027 のみ）。preview 側は `satelliteOf` で ViBioM を指しているので片側だけのリンク。
載せてもらう依頼を出す価値はあるかもしれない。

## 記事作成ポリシー（2026-09-15 制定・未実装）

⚠ **これを `keystatic.config.ts` のフィールド `description` に書くのが次の一手。**
`docs/` や `AGENTS.md` に置いても、Keystatic で書く人は読まない。**書く場所の横に
出ている文字列だけが読まれる。**（codex の指摘。同意した）

### 掲載するかの判定（10秒・判断不要）

> 論文が公開された、またはツールが公開リリースされた。著者か開発者の少なくとも1人が
> サイトの People に載っている。まだ誰も記事にしていない。── この3つが揃ったら1本出す。

パッチ・引用・講演・小規模更新は自動対象にしない。

### 書き方

- **事実だけ。ただし「それが何をするものか」の平文1文は必須。**
  引用と DOI だけでは、既にその仕事を知っている人にしか意味がない。初見の人が
  クリックする理由が無くなる。逆に「画期的な成果」は熱意だけで情報が無い。
- 意味づけの段落、締めの一文、有意性の主張は**書かない**。
- `publishedDate` は**記事を書いた日**（論文の公開日ではない）。論文の日付は本文1行目に書く。
  過去の積み残しを今書く場合も今日の日付。RSS に新着として届く。
- ⚠ **`credits` の `role` は `editor`（表示は "Edited by"）。`author` にしない。**
  他人の仕事についての告知に「Author: 自分」が出る。2026-09-15 に実際にやらかして直した。
- オーガナイザーの共著者名を並べない。9名中5名を並べると自薦に見える。
  帰属は論文自身の言葉を引く（RdRpCATCH は論文が自ら "developed as a community
  initiative following the 1st RdRp Summit" と書いていた）。

### 個人の仕事を名指しする告知は、本人に先に見せる

コミュニティ全体の成果物（Consensus statement）とは扱いが違う。
下書きをそのまま Slack DM で送り、①説明の1文を書き直してもらう ②リンクの順序を聞く
③断る余地を残す。RdRpCATCH では Dimitris Karapliafis が推敲した段落を返してくれたので、
**一字も変えずに載せた**。所要は1往復。

### 最大のリスク

テンプレートの手間ではなく**誰も起動しないこと**。対策は担当者を1人決め、
**DOI か URL だけで投稿受付とする**（著者に文章を書かせない）。
⚠ ウェブ担当は2027の会議まで未定なので、**当面は坂口**と明記すること。
委員会承認・編集会議・コンテンツカレンダーは作らない。

## 2026-09-30 夜: 過去の JC の時刻を根拠つきで直した

RSS に「告知どおりの時刻＋UTC」を出したら、過去の回の `eventTz` が既定の Tokyo のままなのが見えたので、
**根拠が取れた回だけ**直した。根拠はオーナーの Google カレンダーと Gmail（読み取りのみ）。

🔴 **3回は時刻そのものが間違っていた。**1/16 にタイムゾーン機能を入れたとき東京時間で入れ直したが、
CEST 期間の日付に冬の時差（+8h）を足したらしい（11/6 以降の CET 期間は合っていた）。

| 回 | 直した値 | 旧値 | 根拠 |
|---|---|---|---|
| 2025-09-04 | 14:00 Europe/Paris（12:00Z） | 22:00 Tokyo（13:00Z）＝1h 遅い | 演者のメール "14:00 CEST on September 4th" |
| 2025-10-02 | 19:00 Asia/Tokyo（10:00Z） | 20:00 Tokyo（11:00Z）＝1h 遅い | カレンダー予定と告知メール "JST: 19:00–20:00 / CEST: 12:00–13:00" |
| 2025-12-11 | 20:00 Europe/Paris（12/11 19:00Z） | 12/11 04:00 Tokyo（12/10 19:00Z）＝**1日早い** | チェア Milica と演者のやり取り "8:00 pm CET"、Zoom 録画共有が 12/11 20:22Z |
| 2025-11-06 | 14:00 Europe/Paris（瞬間は不変） | 22:00 Tokyo | Zoom 招待 "Nov 6, 2025 02:00 PM Paris" |
| 2026-01-15 | 15:00 Europe/Vilnius（不変） | 22:00 Tokyo | カレンダー予定のタイムゾーンが Europe/Vilnius |
| 2026-09-25 | 14:00 Europe/Helsinki（不変） | Vilnius | 上の 9/25 メモ（Helsinki のつもりが選択肢に無かった）。`JOURNAL_CLUB_TIMEZONES_EXTRA` に Helsinki を追加 |

- **触っていない**: 2026-02-12（11:00 Los Angeles）と 2026-03-17（3/18 02:00 Tokyo＝3/17 17:00Z）。
  カレンダーにもメールにも時刻の記録が見つからなかった。後者は東京 02:00 開始で不自然だが、
  瞬間が合っているかも含めて未確認。根拠が出たら直す。
- 2026-06-11 は Zoom 招待 "03:30 PM Paris" と一致していたので変更なし。
- 過去回なので見た目に効くのは詳細ページ見出しの日付と RSS だけ。12/11 は日付が変わらないが UTC の瞬間が1日動いた。

### 10/8 の JC: 本人から題・要旨・写真・録画許可が届いた（10/1）

Marco 経由の転送で届いた。題は `RolyPoly - simplifying RNA virus identification and characterization`
（本人の表記。末尾のピリオドだけ外した）、要旨は本人の文章に誤字修正のみ。**録画は本人が許可**
（サイトに欄が無いのでここに記録。公開時に `recordingUrl` を入れる）。
⚠ **演者写真は Neri と Marco の2人が写った写真**（Neri が左、Marco が中央、ビールあり）。本人が冗談として
送ったもので、**2人とも掲載に同意済み**（Marco からの転送メッセージで確認、オーナー判断）。
「演者の丸に別人が写っている」のは意図的なので直さないこと。

同じ夜に、JC の「あなたの時刻」表示から "your time" の語を外し（`16:00 (Tokyo, GMT+9)` / `16:00 (GMT+9)`）、
スマホで「(Tokyo, / GMT+9)」の途中で折り返さないよう、日付と時刻をそれぞれ折り返さない塊にした。

## 2026-09-29〜30 にやったこと（本番反映済み）

`e3ee84c` `9b1fd1b` `f17b3c1` `fb85ee4` `2f8d346` `ea588bb` `15774fc` `76afd53` `8b9970d`。

9/25 の続きで入った回。2027 の preview に着手するつもりが、10/8 の JC・写真・一覧の
押しにくさ・落ちていたスポンサーの謝辞と、先に片付くものが次々出て、そちらを全部通した。
**2027 のページ自体はまだ委員会待ちで、preview ブランチに置いたまま。**

### ブランチの分岐を解消した（これが最初の仕事だった）

`preview` は `dd9dbf5` で分岐していて、**main にある 9/25 の JC 作業13コミットが入っていなかった。**
そのままマージすると Zoom リンク・カウントダウン・録画埋め込みが巻き戻る状態。

- `git rebase main preview` で解決。重複していた2コミット（`65a04ae`↔`297f554`、
  `8cce3a9`↔`4dd8f3b`）は**パッチが同一**だったので git が自動で落とした。
- ⚠ **以後 main に何か入れるたびに `git rebase main preview` を打つこと。**
  今回の作業中に3回やった。放置すると同じ罠が育つ。
- ⚠ **2027 の mdoc は必ずコンフリクトする。**preview の `3fe9aeb` が main のスタブを丸ごと
  置き換えるため。**解決は常に preview 側を採用**（`git checkout --theirs`）。1回だけ起きて、
  以後は解決済みなので起きていない。
- バックアップは `preview-backup-20260929`（分岐前の preview）。不要になったら消してよい。

### 人物写真2枚

- **Ella Sieradzki。**本人が**preview ブランチの2027ページを見て**差し替えを希望。
  900x1200 の上から正方形を切って 400x400 JPEG。原本は Dropbox
  `omc/RdRp_Summit/pictures/headshot_ISME.jpg`。所属 Aarhus は本人が preview を見た上で
  何も言わなかったので現状維持（オーナーが Slack で別途確認）。
- **坂口。**3453x3453 の正方形だったので縮小のみ（構図は写真家の判断なので切らない）。
  原本は同じフォルダの `DSC06645.jpeg`。ついでに**パスを他の20人と揃えた**
  （`people/shoichi-sakaguchi.jpeg` + 相対パス → `people/shoichi-sakaguchi/image.jpg` + 絶対パス）。
  1人だけ Keystatic から編集できない形だった。
- ⚠ **写真は全サミット共有。**2023 と 2025 のアーカイブページの顔も変わる。仕様どおり
  （名前を凍結すると改名した人の旧姓が残るため、名前と写真は共有・所属と国は pin）。

### 🔴 `qlmanage -t` ではなく `qlmanage -p` なら hydrate できる

9/25 の節に「`qlmanage -t` では hydrate できなかった」と書いたが、**`-p`（プレビュー）は効く。**
`-t` はサムネイル生成で別物。Finder で「オフラインで利用可能にする」を手でやる必要はもう無い。

```
$ ls -l headshot_ISME.jpg      # 0 バイト・エラーは出ない
$ qlmanage -p headshot_ISME.jpg
$ ls -l headshot_ISME.jpg      # 373410 バイト
```

⚠ オーナーが渡してくるパスが `~/Library/CloudStorage/Dropbox/...` のことがあるが、
**この Mac の実体は `~/Dropbox`**。CloudStorage 配下には存在しない。

### Uri Neri をイスラエルに移した

`people/uri-neri.yaml` は `Joint Genome Institute / USA` のままだった。**2026年6月から古い。**

根拠は本人の記述2つ。ランディングページ（urineri.github.io）が
"I have recently started a new postdoctoral position at Bar-Ilan University, in Chana
Kranzler's lab."、GitHub の bio が "Research Fellow @ Kranzler lab @ BIU / Former Postdoc @ JGI"。

⚠ **時刻の齟齬は完全に消えた。**Marco の Slack に Neri 本人の言葉があった
（"I'm on GMT+3 and prefer noon and morning time slots"）。Marco の推測ではなく本人の申告。
10/8 は Israel も Paris も夏時間内（終了は 10/25 と 10/26）なので、
10:00 IDT = 09:00 CEST = 16:00 JST = **07:00 UTC** で3つとも一致する。

⚠ サミット2行（2023 Tel Aviv University / 2025 Joint Genome Institute）は pin 済みなので
アーカイブは動かない。変わったのは `/people` のカード1枚だけ。

### 10/8 の JC を公開した

`src/content/journal-club/2026-10-08-uri-neri.mdoc`。**演題が決まる前に出した。**
9日前に「The next session is not announced yet」のままなのは、穴のあるエントリより悪い。

🔴 **`eventTz` は `Europe/Vilnius` と書くこと。`Asia/Jerusalem` ではない。**
`src/lib/journalClubTimezones.ts` の選択肢に無く、書くと Keystatic の select が壊れる
（9/16 に `Europe/Helsinki` で踏んだのと同じ穴）。10/8 はどちらも UTC+3 で同じ 07:00 UTC に解決する。
⚠ **詳細ページは `eventTz` を画面に出さない**（固定の7都市を並べるだけ）ので、表示は一切変わらない。
→ **2026-09-30 に解消。**`JOURNAL_CLUB_TIMEZONES_EXTRA` に `Asia/Jerusalem` を足した（Keystatic で選べるが
固定7都市の行には出ない）ので、このエントリは `Asia/Jerusalem` に直した。同時に詳細ページの見出し（タイトル上の日付の位置）に
「Thu, Oct 8, 2026 · 16:00 your time (Tokyo)」＋小さく「announced as Thu 10:00 Jerusalem」を出すようにしたので
（最初は下の Event Times に置いたが、同日のうちに上へ移した。JS なしだと告知どおりの時刻、終わった回は日付だけ）、
**`eventTz` は画面に出るようになった。**告知した人（演者・チェア）の居場所を入れること。
一覧に無い都市は `JOURNAL_CLUB_TIMEZONES_EXTRA` に1行足す（一覧外の値を直書きすると select が壊れる点は変わらない）。

- 演題は **RolyPoly**（`github.com/UriNeri/rolypoly`・PyPI `rolypoly-tk`・Bioconda・GPL-3.0・
  docs は urineri.github.io/rolypoly）。⚠ ただし **Marco が持ちかけた題であって本人の確約ではない**
  ので、`title` は `Topic to be announced` のまま、本文に "The expected topic is..." と書いた。
  確定したらタイトルと `links` を入れる。
  → **2026-09-30 に Marco が確定**（"Yes! The topic is rolypoly"）。`title` を
  `RolyPoly: a toolkit for RNA virus discovery and characterization`（README の一文から取った仮の題。
  本人から正式な題が来たら差し替える）にし、`links` に GitHub（primary）と docs を入れ、本文を README から書き直した。
- ⚠ **RolyPoly に論文はまだ無い。**README が "v1 manuscript ~late 2026" と書いている。
  `links` に Paper 行は当面作れない。
- `calendarUrl` は入れた。`zoomUrl`・座長・`speakerAffiliation` は空のまま。
  ⚠ `speakerAffiliation` に `Bar-Ilan University` を入れるかはオーナー未回答。
  → 2026-09-30 に入れた（根拠は本人サイトと GitHub の bio）。表記はオーナーが Slack で本人に確認中。
- **07:00 UTC はこれまでで一番早い回。**欧州の常連は普段 13:00-14:00 に出ているので4時間早まる。
  東京は 16:00 で普段の 22:00 より出やすい。西海岸は午前0時ちょうど。

### 🔴 JC エントリのスラッグ規則を決めた（`YYYY-MM-DD-speaker-name`）

タイトルではなく**発表者名**。理由は美しさではなくタイミング。

> スラッグは公開 URL で二度と変えられないので、**エントリを作る瞬間に確定している必要がある**。
> タイトルはその時点で無いことが多い（話者が承諾した時点で告知するため）。発表者と日付は必ずある。

- ⚠ **敬称（Dr./Prof.）は入れない。**昇進や学位で変わるが URL は追随できない。
  現に `Professor Valerian Dolja` が居るので形も揃わない。丁寧さは `speakerName` が担う。
- ⚠ **既存9件はリネームしない。**1年分の共有済みリンクが死ぬ。混在でよい。
- ⚠ **旧ルールは既に破れていた。**`2025-11-06` と `2026-03-17` はタイトルと食い違っている
  （作成後にタイトルを編集しても Keystatic はファイルをリネームしないため）。
- 書いた場所は **`keystatic.config.ts` の `title` フィールドの `description`**（編集画面に出る文字列
  だけが読まれるという 9/15 の教訓）と `AGENTS.md`。⚠ Keystatic はタイトルからスラッグを自動提案
  するので、**作る人が手で上書きする必要がある**。自動化はできない。
- ⚠ **Keystatic の編集画面で description が実際に出るところは未確認。**型とビルドは通っている。
  次にエントリを作るとき目視で確かめること。

### PCI が 2025 のスポンサーから落ちていた

オーナーの記憶が正しかった。Wayback の `/sponsorship/`（2025-05-23）にスポンサーが2件ある。

> **Travel Grant Sponsorship by ISME**（2025.04.30）
> **Sponsorship by PCI**（2025.05.01）"our conference is supported by Peer Community In (PCI)...
> We are grateful for their support of open science and our event."

⚠ **ISME と同じ穴。**Astro 移行時に `sponsors: []` で出発して両方落ちていた。ISME は 9/24 に戻したが
PCI を見落としていた。支援は現物で履行されている（2本目の Consensus statement が
Peer Community Journal Vol.6 e50 に無料・オープンアクセスで掲載）。

- `supportType` は素の `Sponsor`。旧サイトが "supported by" としか書いていないため。
  ISME が具体的なのは受諾書が travel grant を名指ししているから。
- ロゴは WordPress の原本（457x382/145KB）を 320px 高の WebP/21KB に縮小。
  原本は `omc/RdRp_Summit/wordpress/uploads/2025/04/logo_PCI.png`。
- ⚠ **PCI にロゴ掲載が契約条件だったかは未確認。**ISME は受諾書の条件2にある。

### 一覧の「押すところ」を作り直した

オーナーの指摘（「押すところがややこしい」「サミットかプロシーディングか統一されていない」）が起点。

**見つかった問題。** `/summits/` の各行に**同じ URL のリンクが2本**あった（見出しと
`View details` / `View Proceedings`）。しかも見出しは本文色でリンクに見えず、ラベルが行ごとに違い、
"Proceedings" は中身と合っていない（プログラム・委員会・スポンサーであって講演論文集ではない）。
`Organizer:` の1行は `summit.data.organizer`（単数）を読む**死んだコード**でスキーマに無い。

トップの `(Planning)` 二重表示も同根で、2027 の `title` に `(Planning)` が入ったまま
`phase` バッジも出ていた。**タイトルから外して解決。**

**決めた配色ルール。**

```
青      外部に出る       DOI / Paper ↗ / Join Slack
下線    サイト内に進む   JC の演題
カード  サイト内に進む   サミットの行
```

⚠ 前は内部も外部も青で混ざっていた。⚠ **年号に `--c-link` が付いていて、リンクでない要素が
青かった。**リンクである見出しが黒。逆だった。

- **サミット2ページ（トップと `/summits/`）はカード全体が的。**`.summit-title::after` を
  `inset: 0` で敷き、右端に薄いシェブロン（ホバーで 3px 動く）。`.outcome-doi` は
  `position: relative; z-index: 1` で上に逃がす。**これが無いとカードが DOI を飲む。**
- **`/journal-club/` は黒＋薄い青の下線**（`text-decoration-color: rgba(0,102,204,.4)`）。
  表のセルでカード化するとテキスト選択の邪魔になるため。⚠ 一度タイトルを青にしたら
  **演題が3行に折り返して青の壁になった**ので下線に変えた経緯がある。戻さないこと。
- ⚠ **ホバーだけに依存しない。**タッチ端末にはホバーが無い。下線もシェブロンも常時出ている。
  旧実装は `:hover` でしか目印が出ず、スマホでは**目印ゼロ**だった。
- **キーボード。**`:has()` でカードに枠を出し、`@supports selector(:has(*))` の中で
  タイトル側の枠を消す。⚠ **`:has()` 非対応で枠が消える事故を避けるため、素の
  `:focus-visible` 規則を外に残してある。**消さないこと。
- 検証は `elementFromPoint` で本番実測（余白→サミット、DOI 座標→DOI）。
  ⚠ 圧縮で `::after` が `:after` になる。grep するとき見落とす。

### 🔴 デプロイ直後の確認は必ずキャッシュバスターを付ける

今日3回引っかかった。`curl` で素に叩くと**古い HTML が返る**。`?cb=$RANDOM` を付ける。

⚠ **ステータスコードでは判定できない。**`/journal-club/2026-10-08-uri-neri/` は中身が
無い状態でも 200 を返していた。**実際の文字列で確認すること。**
デプロイ所要は実測 50〜100 秒。

## 2026-09-15 にやったこと（本番反映済み）

`3326050` `03dab7e`。

- **RdRpCATCH の告知を出した。** NAR Genomics and Bioinformatics 8(3) lqag076 /
  2026-06-27 / https://doi.org/10.1093/nargab/lqag076 。説明の段落は Dimitris 本人の文章。
  web https://rdrpcatch.bioinformatics.nl / src https://github.com/dimitris-karapliafis/RdRpCATCH
- **Consensus statement の記事に「何についての合意か」の1文を足した**（抄録より）。
- **`[slug].astro:48` の `editor` ラベルを "Editor" → "Edited by"** に変え、2記事の
  `role` を `editor` に。既存の Feb 記事（`summary` = "Summary by"）には影響なし。
- **結果としてトップの Latest Posts から移行告知が消えた。** `HomeAnnouncements.astro:14`
  が `slice(0, 3)` なので、記事を1本も消さずに4番目へ落ちた。

## 2026-09-25 にやったこと（本番反映済み）

`6d99898` `81e8d6a` `0f92152` `3b1eef8` `7f6457f` `1f8295d` `de2afb3` `f056699` `4a27bfc`。

9/25 の JC 当日。開始20分前から終了後まで通しで触った回。

### Zoom リンクをサイトに出す方針に変えた

**決定: 出す。** 従来は「スパム防止」でカレンダー招待の中だけに置いていたが、
**Ingrida が毎回 Bluesky に同じ URL を公開投稿している**ので、伏せても露出は減らず、
サイトから来た人だけがカレンダー登録の遠回りをしていた。途中参加の人は rdrp.io から
URL に辿り着けなかった。⚠ **Bluesky 側の運用を変えずにこれを元に戻さないこと。**

- `showZoomLink` は **既定 true**（`src/content/config.ts` / `keystatic.config.ts`）。
  新しいエントリは `zoomUrl` を埋めるだけでよい。ホスト側の事情でゲートが要る回だけ false。
- トップのカードの Join Zoom は**開始15分前に開き、終了で消える**。バッジと同じ訪問者の時計。
- 待機室は入れない判断（実害が出ていないので、起きてからの対応でよい）。

### 時刻まわりを全部「訪問者の時計」に寄せた

6月の「Live Now が3か月貼り付いた」と同じ族の穴が他にも残っていたので潰した。

- 詳細ページの **Add to Calendar と Join Zoom** は `isCalendarUpcoming` / `hasEventEnded` が
  ビルド時刻でしか評価されておらず、リビルドまで生き残っていた。`data-jc-hide-after` 属性に
  終了時刻を持たせ、60秒ごとに再判定して消す形に統一。
  ⚠ ビルド時の除去も**残してある**。これが過去ページから URL を完全に消している仕組みなので、
  外すと古い Zoom ルームや期限切れリンクが過去ページに残り続ける。
- ⚠ `.action-button` は `display: inline-block` を持つので、`[hidden]` を効かせるには
  `[hidden] { display: none !important }` が要る（AGENTS.md に既出の落とし穴・このページにも追加した）。
- **カウントダウン**をトップのカードに追加（Starts in 3 hours / Ends in 25 minutes）。
  1週間より先は非表示。**JS のみでサーバ側フォールバックを持たせていない**。
  ビルド時に焼いたカウントダウンはキャッシュされた瞬間に嘘になるため、意図的にそうしてある。
- セッション間の空状態を "No upcoming meetings scheduled" から
  **"The next session is not announced yet"** に変え、アーカイブとスピーカー推薦の2導線を置いた。
  活動停止に読めるのを避けるため。

### 録画を個別ページに掲載できるようにした

🔴 **9/17 の決定（録画は約2週間後に坂口が YouTube から削除する）は生きている。**
2026-09-25 のセッション中、Claude が一度「動画は限定公開のまま残る」と誤って述べた。
**誤り。** 約束は動画そのものの削除。コミット `1f8295d` のメッセージにも同じ誤りが残っている。
⚠ **このコミットメッセージを根拠に「消さなくてよい」と判断しないこと。**

- スキーマに `recordingUrl` と `recordingUntil` を追加。`recordingUntil` は**掲載の最終日**。
  その日の終わり（イベントの `eventTz` 基準）に埋め込みがページから自動で消える。
  空にすれば期限なしで出続ける。
- 表示は **youtube-nocookie の埋め込みプレーヤー**。リンクではなく埋め込みにしたのは、
  共有するのが個別ページになったため。`privacy.astro` の第三者サービス一覧に YouTube を追記済み。
- 見出しは置いていない（プレーヤーはプレーヤーだと分かる）。
  期限の注記だけを琥珀色 `#b45309` + 太字にしてある。**掲載の目的が「2週間で消えるから早く見て」
  である以上、ここが読まれないと意味が無い**ため。赤はエラーに見えるので避けた。
- 9/25 の回: `recordingUrl: https://youtu.be/yqdF7g1Lxlg` / `recordingUntil: 2026-10-09`。
  期限切れの挙動は**本番ページの時計を10/10 に進めて実測確認済み**（`display: none` になる）。

⚠ **過去7本の録画はサイトに載せてはいけない。** 得ている許可は YouTube の限定公開のみで、
web 掲載の許可は 9/25 の回だけ。過去分は Slack にリンクを貼っただけなので、
リンクを失うと辿れない状態のまま。載せたいなら演者ごとに許可を取り直すこと。

### 録画の編集（毎月発生する作業）

Zoom のローカル録画は**録画者の Zoom ウィンドウのサイズとレイアウトで焼かれる**。
9/25 は 1920x1200 でギャラリーが画面の半分を占め、**スライドが 950x534 しかなかった**。
3月の回は 1344x760 あった。差は録画時のウィンドウ設定だけ。

- ⭐ **次回への申し送り: 録画者は Zoom ウィンドウを最大化し、参加者を右端の細い帯にする。**
  それだけで解像度が上がり、この編集作業も楽になる。
  Zoom 設定の「共有画面を別ファイルで記録」が使えるなら編集自体が不要になる（未確認）。
- 今回の処理: `ffmpeg -ss 92 -i IN -vf "crop=950:534:4:332,scale=1280:720:flags=lanczos,setsar=1"`。
  成果物は `~/Dropbox/omc/RdRp_Summit/RVJC/20260925_Heli_slides.mp4`（33:06 / 51MB）。
  クロップで聴講者のタイルと表示名がフレームから外れる＝構図と公開範囲が同時に片付く。
- ⚠ **開始秒の判定を2回間違えた。** 輝度の数値指標だけで決めたのが原因。
  ①スライド領域全体の平均輝度はギャラリーの明るいタイルと区別できない
  ②共有開始直後は発表者のデスクトップ（Zoom ウィンドウ）が映っていてスライドではない。
  正解はスライド左余白（プレゼンモードでしか白くならない場所）を見ること。
  **数値指標を決めたら必ずフレームを目で確認する。**
- ⚠ **Dropbox のオンライン専用ファイルは `cp` が成功して 0 バイトを返す。**
  `RVJC/` は既定でオンライン専用。Finder で「オフラインで利用可能にする」が要る。
  `qlmanage -t` では hydrate できなかった（⚠ **`-p` なら効く。**2026-09-29 の節を見よ）。

### YouTube 側

- 正式名称は **RNA Virus Journal Club**（略 RVJC）。⚠ 「RdRp Journal Club」ではない。
  サイトは元々正しい。9/25 に Claude が draft で誤記し、一度混入した。
- タイトルに通し番号を付けない方針にした。YouTube 側の RVJC 2/3/4 の後、MetaVR と AmpliDiff が
  番号なしで上がっており、既に数え方が崩れているため。サイト基準では 9/25 が通算9回目。
- ⚠ **チャンネルの本人確認が未完了**なので、説明文中の URL がクリックできない。
  数分で済むので次回までに。今回は URL を外した説明文で出した。
- Slack の投稿ではリンク展開のカードが出なかった。**サイト側は問題なし**
  （robots.txt は Allow、Slackbot の UA で 200、og:image も 200）。閲覧者ごとのプレビュー設定か
  ワークスペース設定。実害が無いので追っていない。

### 盤に立てた札

| id | due | 何 |
|---|---|---|
| `jc-20260925-video-removal` | 2026-10-09 | **Heli への約束の履行。** YouTube から `yqdF7g1Lxlg` を削除する |
| `rdrp-jc-20261008-entry` | 2026-10-05 | 10/8 の JC をサイトに出す（告知確定待ち・Neri の所在も要確認） |

⚠ **`jc-20260925-video-removal` は 9/17 の節に「盤にある」と書かれていたが実在しなかった**
（journal も空）。9/25 に作った。約束に対してリマインダが一つも無い状態だった。

### 10/8 の回（未公開・エントリ全文）

告知が確定するまで出さない。確定したら以下を
`src/content/journal-club/2026-10-08-uri-neri.mdoc` として置けばよい。

```yaml
---
title: Topic to be announced
date: 2026-10-08
publishedDate: 2026-09-25
isPinned: false
speakerName: Dr. Uri Neri
localDate: 2026-10-08
localTime: '10:00'
eventTz: Asia/Jerusalem
durationMinutes: 60
showZoomLink: true
---
The paper and the Zoom link will be added here once they are confirmed.
```

🔴 **時刻の根拠と未解決点。** Marco の Slack（本人 10am / Paris 9am / Tokyo 4pm）は3つとも
**2026-10-08 07:00 UTC** で整合する＝話者が UTC+3 にいる前提。ところが
`src/content/people/uri-neri.yaml` は `Joint Genome Institute / USA` のままで、
07:00 UTC は California だと木曜午前0時。オーナーは「おそらくイスラエルに帰った」と述べたが
**未確認**。確定するまで people レコードは触らない（サミット26行は全て pin 済みなので
アーカイブ表示には影響しない）。⚠ 10/8 は Israel も Paris もまだ夏時間内（両方 10/25 終了）。

## 2026-09-16 にやったこと（本番反映済み）

`f4a1b74`。

- **9/25 の JC 記事を公開。** Heli Mönttinen（University of Helsinki）・座長 Tatiana Demina。
  本文は論文のアブストラクト逐語（Mol Biol Evol 43(4):msag088 / 2026-04-07 / CC BY 4.0）で、
  **末尾に帰属行を足した**。CC BY は複製を最初から許しているが帰属が条件で、書誌だけだと
  ライセンスの明示とその本文へのリンク（第3条(a)(1)）が欠ける。
  ⚠ **6月の AmpliDiff 回も同じ形で逐語転載していて帰属行が無い。**BMC なので同じく CC BY の
  はずだが未確認。揃えるなら後追い。
- ⚠ **`eventTz` は `Europe/Vilnius` と書く。** `Europe/Helsinki` は
  `src/lib/journalClubTimezones.ts` の選択肢に無く、書くと Keystatic の select が効かなくなる。
  EET/EEST は同じなので 14:00 → 11:00 UTC で一致する。
- Zoom URL はサイトに入れていない（案内メールの `pwd=` が省略されていた）。
  **Zoom はカレンダーイベントの中にあり、サイトの導線は Add to Calendar 一本。**
- **トップの「No upcoming meetings scheduled」は解消**（9/14 メモの優先1）。

### プレビューは固定ブランチ `preview` に force push する

```
git push --force git@github.com:shoichisakaguchi/website.git HEAD:preview
```

URL は `https://preview.website-8cm.pages.dev/` に固定で、push しても変わらない。
`main` に触らないので本番は動かない。ブランチ名を毎回変えると URL も変わって探す手間が戻る。

- ⚠ **これは公開前に見る仕組みであって、承認の仕組みではない。**`main` への push に PR も審査も無い。
- ⚠ **devhub にはぶら下げられない。** `tailscale serve --set-path` はプレフィックスを剥がして
  バックエンドに渡すが、このサイトのリンクと資産は全部ルート絶対（`/_astro/…` `/journal-club`）
  なので全滅する。逃げ道は 443 のパスではなく**別 HTTPS ポートのルート**に出すこと
  （rack-scan が `:8443` でやっている形）。ただし devhub の盤には載らない（`hub.py` が
  `svc["path"]` 必須でポートのルートに出す口が無い）。

### 講演者の写真は「揃わない前提」で運用する

ページは `speaker_image` が空でも崩れない（要素ごと出ない）。**揃わないのは構造のせい。**

指名フォームは7項目で写真欄が無く、しかも**回答者は指名者で本人とは限らない**
（他人を推薦する人はその人の写真を持っていない）。だからフォームに欄を足しても自薦しか拾えない。
写真が実際に手に入るのは**登壇確定後に本人へ連絡する時**で、そこは構造上 chair の持ち場。
**外せるのは「別件として思い出す」部分だけ。**

→ **登壇確定メールのテンプレートを1本作る案**（⚠ 未作成）。写真・名前と所属の表記・
論文リンクと演題・アブストラクトの代替文・録画の同意・Zenodo の案内を1回でまとめて聞く。
今は4件がバラバラに発生していて、そのたびに誰かが思い出す必要がある。
録画の欄は下記の結論が出てから埋める。

## 2026-09-14 に決めたこと（実装はまだゼロ・コミットなし）

### JC の録画と同意 ✅ 2026-09-17 に決着（下の 9/14 版は誤り）

✅ **決定: 録画は YouTube に上げ、講演の約2週間後に坂口が削除する。**
Heli 本人の希望（2026-09-17・Tatiana 経由）。「多くの会議で採られている慣行に倣いたい。
数週間公開して、その後は消す。恒久的に置き続けるのは避けたい」。Tatiana も同意。
9/25 の回の削除期限は **2026-10-09**、盤 `jc-20260925-video-removal`。

⚠ **これは約束になった。**削除は「気が向いたら」ではなく実行義務。

**約束の対象は「オンラインに置き続けないこと」**であって、原本の破棄ではない。
Heli の原文は "rather than keeping it online permanently"。
**ローカルの原本（`~/Dropbox/omc/RdRp_Summit/RVJC/`）は念のため残す。合意済み（2026-09-17）。**
⚠ 残すこと自体が合意の上である、という事実をここに書いてあることが重要。
9/14 の整理どおり、同意は「示せること」が要る（GDPR 第7条1項）。

❌ **Zenodo は見送り（2026-09-17）。** Heli も Tatiana も録画の話だけに答え、スライドには
触れなかった。坂口の判断も「抄読会の発表に DOI を期待するかというと微妙」。**やり過ぎだった。**
⚠ **次の演者で蒸し返さない。**復活させる条件があるとすれば、演者の側から「引用できる形にしたい」
と言われた時。こちらから毎回勧めるものではない。

**下の 9/14 版は誤りだったので実装しない。**残してあるのは、なぜ誤りだったかが次の判断で効くため。

- **「言われたら即消す」は成立しない。** Heli の「1〜2年後に消してほしい」（2026-09-16・
  Tatiana 経由）は**もう届いた依頼**であって、1〜2年後にもう一度来るものではない。この形は
  依頼を保持する責任を演者側へ移すだけで、演者はこちらより関心が薄いぶん余計に届かない。
- **タイマーを避けたのも誤り。** 問題は期限そのものではなく**長さ**。2年後の札は、盤と agent と
  Mac mini と読む人が2年後も同じ形で揃っている前提に乗る。**守れる約束の長さまで期限を縮める**
  方が正しい。1週間なら仕組みも記憶も生きている見込みが高い。
- **現在の提案（Tatiana 経由で Heli に打診中）: Zenodo が保存で、YouTube は取り逃し用の一時窓。**
  スライドを Zenodo に置けば DOI がつき、演者自身が更新・撤回できる。Heli の理由は
  「古くなるから」であって privacy ではないので、消すより**新しい版を出せる**方が要求に合う。
  恒久的な記録が演者の手元に残るなら、動画を1週間ほどで落としても失われるものが無い。
  ⚠ この順序が要点。「1週間だから削る」ではなく「Zenodo に残るから1週間でいい」。
  逆に読まれると、JC の「できるだけ公開したい」に逆行する提案に見える。
- ✅ **決着済み（上記）。**Heli の答えは「数週間」で、1週間案よりわずかに長い。
  こちらから短くしすぎなくてよかった形になった（彼女は YouTube 掲載自体には賛成だった）。
- 期限を切るなら、憶えるのは人でなくてよい。`ops/scheduled-rebuild/` の agent が Mac mini で
  15分ごとに走り各回の終了時刻を計算済みなので、終了+7日で盤に `kind=wait` を起票できる。
  ⚠ ただし**作ってから約束する**。1週間なら手作業でも回るので急がない。
- 下記の「既存の在庫の片付け方」（8通・2週間沈黙で削除）は、この見直しの影響を受けない。


- **既定は「録画を公開しない」。** 削除の約束は「1年後」ではなく**「言われたら即消す」**にする。
  タイマーは将来の担当者を必要とするが、トリガーは依頼そのものが起動条件なので記憶が要らない。
  ウェブサイト担当が未定（`AGENTS.md` の Ownership Transfer 参照）である以上、
  期限つきの約束は破れる約束になる。
- **中間状態「unlisted」を無くす。** 状態は「公開（同意あり・JCページからリンク）」か
  「削除」の2つだけ。リンクの有無が同意の記録になるので、新しい欄も台帳も要らない。
- **既存の在庫の片付け方**: 登壇者に1通ずつメール。①スライドを Zenodo に上げて DOI を
  付けないか（＝還元）②録画をどうするか（公開／削除）③**2週間返事がなければ削除**。
  沈黙が安全側に倒れるので追いかける仕事が出ない。8通で済む。
- ⚠ **削除対象は YouTube の unlisted だけではない。** 原本が
  `~/Dropbox/omc/RdRp_Summit/RVJC/` にもある（`20251002_Ito.mp4` `20251107_Kim.mp4`
  `20260115_Gytis.mp4` `20260317_MetaVR_Fiamenghi.mp4` ほか音声・txt・stats）。
- 法的な向き: 登壇者はフィンランド・オランダ・リトアニア・スイス。録画は GDPR の個人データで、
  同意は「示せること」が要る（第7条1項）。`src/pages/privacy.astro` に録画の記載は無い。
- **JC 登壇者は全員が自分の仕事を話している**（8回とも）。他人の論文を紹介する抄読会ではないので、
  スライドを Zenodo に上げても第三者図版の著作権問題が起きない。DOI 提案が成立する前提。

### ファビコンは差し替えない

`public/favicon.svg`（878バイト・手書き SVG）の手は **RdRp の palm / fingers / thumb**。
分野の人には酵素に、それ以外には「いいね」に見える二重の読み。**テンプレートの残りものではない。**
以前このファイルに「差し替える」方向の記述があったが撤回済み。

### トップページで直すもの（優先順）

1. ~~**「No upcoming meetings scheduled」**~~ **2026-09-16 に解消。**9/25 の回を公開した。
2. **最初の画面に画像が1枚もない。** バナーは `public/images/summits/hero/rdrp-summit-2025/heroImage.jpg`
   （3650×1047）に既にある。`figure_2025_lisbon_field-timeline.svg`（分野の年表・2027を足せる）も候補。
3. **Latest Posts の1件が「rdrp.io is moving to Astro + Cloudflare Pages」。**
   消さない（URL 変更の記録）。`HomeAnnouncements.astro:14` は `slice(0, 3)` なので、
   **新しい記事を出せば自然に下がる**。書くべき1本は決まっていて、
   **2本目の Consensus statement（Peer Community Journal Vol.6 e50 / 10.24072/pcjournal.727 /
   2026-05-28）がまだサイトで告知されていない**。データは 2025 の mdoc:142-152 に揃っている。
   これ1本で「移行告知が下がる」「最新が7ヶ月前でなくなる」「合意文書を出す場という位置づけが実例で出る」が同時に片付く。
4. 人の顔が1つも出ていない（`people` は43人分あるのに未使用。旧サイトは21人並べていた）。
5. About の文が一般的。旧サイトの "a discussion-centric event that aims to foster
   reproducibility, collaboration, and interoperability in omics-derived RNA virus discovery" が強い。
6. ヘッダーがテキスト `rdrp.io` のまま。ワードマークは存在する（下記）。

## 現物の在り処（repo の外・どこにも書かれていなかった）

| 何 | 場所 | 備考 |
|---|---|---|
| 2027 準備一式 | `~/Dropbox/omc/がっかい/20270307-11_RdRp_summit/` | README.md / docs / summary / tools / member.xlsx |
| リスボン一式（198ファイル） | `~/Dropbox/omc/がっかい/20250509-12_RdRpSummit2_Lisbon/` | 下記参照 |
| 旧 WordPress のメディア | `~/Dropbox/omc/RdRp_Summit/wordpress/uploads/` | 405ファイル中341は自動生成サムネ＝**原本64**。⚠オンラインのみ（0バイト） |
| JC 録画の原本 | `~/Dropbox/omc/RdRp_Summit/RVJC/` | 同意整理の対象 |
| デザイン素材（厳選10点） | Drive `RdRp_Summit_2027 > Design` ＝ `~/Dropbox/omc/がっかい/20270307-11_RdRp_summit/Design` | 命名は `<種別>_<時期>_<対象>` |

リスボン一式の中で効くもの:

- `docs/Registration/RdRp Summit 2025 Registration (Responses).xlsx` — **参加者数はここ**
  （⚠ 2025-03-31 時点の集計で、最終参加者数とは違う可能性）
- `docs/fund_raising/ISME General Sponsorship - Acceptance letter.pdf` — トラベルグラントの裏付け
- `docs/Communications/Visuals/` — SVG のQRコード、動画版ロゴ、分野年表
- `summary/RdRp_Summit_2025_Progress_Report_EN.md` — ⚠ **2025-04-03 作成＝事後報告ではない**。
  準備状況の棚卸しなので `archiveResources.reportUrl` は埋まらない
- `pictures/` — ⚠ **開催中の写真ではない。** EXIF は 2025-04-30 と 05-07（開催は 05-11/12）＝
  **会場の下見写真9枚**。開催中の写真は現時点でどこにも見つかっていない
- `docs/Setting up NGO in Lithuania/` — **リトアニアで NGO 法人を設立中**。repo にもサイトにも記載なし

## 移行で落ちたテキスト（復元候補）

- サミットの定義文（上記 5）
- 2023 の実績の詳細: 60% 現地 / 40% リモート、50機関、**参加者の多くが ECR で半数が PhD students**
  （repo にあるのは "over 70 participants from more than 50" の一行だけ）
- **ISME のトラベルグラント 500 EUR**（`2025-05-11-rdrp-summit-2025.mdoc:141` が `travelGrant: {}` のまま）

## 技術的な不具合（デザインとは無関係）

- **OG 画像の寸法が宣言と食い違う。** `public/og/*.png` は4つとも**同一ファイル**（md5 一致）で
  743×736 の正方形なのに、`src/lib/og.ts` の `OG_IMAGE_DIMENSIONS` は 1200×630 を宣言し
  `BaseHead.astro:66,73` がそれを出力。`twitter:card` は `summary_large_image`。
  ⚠ 個別ページ（journal-club / summits / posts）は `useDynamic: true` で
  `src/pages/og.png.ts` が 1200×630 を生成するので**固定ページだけの問題**。
- 同 og の静的 PNG は 2.1MB × 4、`public/og-image.png` も 2.1MB（260×260 枠に描くのに毎回フェッチ）。
- `public/images/journal_club/journal_club.png` は 800×800 / 648KB を 80〜100px で表示。
- `.button.primary` がまだ未定義の `--c-primary` を参照（`index.astro:321`）。
  ただしそのクラスを使う要素が無い**未使用 CSS** なので実害なし。

## 対外

- **Tatiana Demina（JC 座長）に Slack で録画の扱いを提案**（2026-09-16）。Zenodo で DOI を
  取る案と、YouTube は1週間程度の窓にする案。**Tatiana が Heli に意見を聞いてくれている段階**で、
  写真の依頼も同時に投げてくれた。⚠ トーンは「ウェブ担当からの suggestion」に寄せた。
  録画とスライドは JC の運営事項でウェブ担当の権限ではないので、判断を相手に返して終える形にした。

- **Dimitris Karapliafis（RdRpCATCH 第一著者）に Slack DM で下書きを見せ、了承を得た**
  （2026-09-15）。推敲した段落を返してくれたので一字も変えずに載せた。公開後の一報は済み。

- **Lana Vogrinec に Slack で Design フォルダを共有済み**（2026-09-14 23:47）。
  リファレンスとして渡しただけで、依頼はしていない。
  palm/fingers/thumb のコンセプトは**意図的に説明していない**
  （説明なしで伝わるかどうかがそのままデザインの検証になるため）。
  「なぜ親指？」と聞かれたら答える。

## 2026-09-10 にやったこと（本番反映済み・詳細は git log）

`028f28d` `1be87fb` `a282b9d`。トップのサミット一覧に Consensus statement の DOI を出し、
Archived バッジを外し、Google Calendar を2箇所でリンクにし、`links.googleCalendar` を削除した。
⚠ `src/pages/index.astro` の `marked` は `new Marked({...})` の隔離インスタンス。
**グローバルにすると RSS に `target="_blank"` が混ざる。**

## 次にやること

**期限つき（盤の ⏳ に立っている）**

| 札 | due | 何 |
|---|---|---|
| `rdrp-jc-20261008-entry` | 2026-10-05 | 10/8 の JC。**ページは出した**ので、残りは演題・Zoom URL・座長の確定と反映 |
| `rdrp-202` | 2026-10-08 | 2027 preview。委員会の返信4件待ち |
| `jc-20260925-video-removal` | 2026-10-09 | **Heli への約束の履行。**YouTube から `yqdF7g1Lxlg` を削除 |

**期限なし**

1. **`keystatic.config.ts` の posts に記事作成ポリシーを `description` として書く。**
   ⚠ 9/29 に journalClub の `title` へスラッグ規則を書いた形がそのまま使える（実装例あり）。
2. 「移行で落ちたテキスト」3点の復元（下記）。素材の在り処は特定済み。
3. `natural-english` スキルの検討。`~/.claude/skills/natural-japanese` の英語版が無い。
   このサイトは英語で、Keystatic 経由で他の人も書く。日本語版の構造を移植できる。
4. 講演確定メールのテンプレート（下の 9/16 の節）。⚠ 未作成のまま。写真4名が未取得なのも同根。
5. ⚠ **Keystatic の編集画面でスラッグの `description` が実際に出るか目視確認。**
   型とビルドは通っているが UI は見ていない。

## 注意点

- **push = 本番デプロイ。** `main` への push で Cloudflare Pages が自動デプロイ（実測 50〜140秒）。指示があるまで push しない。
- ⚠ **デプロイ確認は `?cb=$RANDOM` を付ける。**素に叩くと古い HTML が返る（9/29 に3回踏んだ）。
  **ステータスコードでは判定できない**ので、実際の文字列を見ること。
- ⚠ **`main` に何か入れたら `git rebase main preview` を打つ。**放置すると preview が遅れ、
  マージで巻き戻る。2027 の mdoc は必ずコンフリクトするので、**常に preview 側を採用**する。
  preview の force push は `git push --force git@github.com:shoichisakaguchi/website.git preview`、
  URL は https://preview.website-8cm.pages.dev/ に固定。
- `origin` は HTTPS だが認証情報が無いので push は SSH:
  `git push git@github.com:shoichisakaguchi/website.git main`
- Keystatic の編集は `main` に直コミットされる＝ローカルが黙って古くなる。作業前に `git pull --rebase`。
- 調査の根拠と3案のモック: https://claude.ai/code/artifact/9044dda2-108e-42e5-af54-e2d73e0bb594
