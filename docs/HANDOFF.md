# HANDOFF — rdrp.io

最終更新: 2026-09-25 / セッション: d2bb2b68

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
  `qlmanage -t` では hydrate できなかった。

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
