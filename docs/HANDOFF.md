# HANDOFF — rdrp.io

最終更新: 2026-09-15 / セッション: 19a3c309

このファイルはセッション間の引き継ぎ用。安定した設計事実は `AGENTS.md` に、
ここには「いまどこまで進んでいて、次に何をするか」だけを書く。

## いまブロックされていること

**RdRp Summit 2027 の日程は 2027-03-07〜11 でほぼ確定。ただしサイトには入れない。**
理由は**本家の ViBioM が正式な日程を発表していない**から（2025 と同じくサテライト開催。
2025 の `satelliteOf` は ViBioM 2025 / https://evbc.uni-jena.de/events/vibiom2025/）。
ViBioM の発表が出たら `src/content/summits/2027-rdrp-summit-2027.mdoc` に
`startDate` / `endDate` / `satelliteOf` を入れる（5分）。**これが今いちばん価値の高い1行**で、
トップの2027カードが「年号だけ」から「日程の決まった会議」に変わる。
2027 の準備物は `~/Dropbox/omc/がっかい/20270307-11_RdRp_summit/`。

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

## 2026-09-14 に決めたこと（実装はまだゼロ・コミットなし）

### JC の録画と同意

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

1. **「No upcoming meetings scheduled」** — 画面中央で「何も起きていない」と言っている。
   JC のエントリを1件足せば直る（Keystatic で5分・コード変更なし）。
   9/25 の回は Tatiana が提案中で未確定のため**確定待ち**。
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

1. **`keystatic.config.ts` の posts に上の記事作成ポリシーを `description` として書く。**
   これが今いちばん効く（今回の知見が全部そこに集約される）。
2. 「移行で落ちたテキスト」3点の復元（下記）。素材の在り処は特定済み。
3. `natural-english` スキルの検討。`~/.claude/skills/natural-japanese` の英語版が無い。
   このサイトは英語で、Keystatic 経由で他の人も書く。日本語版の構造を移植できる。

## 注意点

- **push = 本番デプロイ。** `main` への push で Cloudflare Pages が自動デプロイ（実測140秒）。指示があるまで push しない。
- `origin` は HTTPS だが認証情報が無いので push は SSH:
  `git push git@github.com:shoichisakaguchi/website.git main`
- Keystatic の編集は `main` に直コミットされる＝ローカルが黙って古くなる。作業前に `git pull --rebase`。
- 調査の根拠と3案のモック: https://claude.ai/code/artifact/9044dda2-108e-42e5-af54-e2d73e0bb594
