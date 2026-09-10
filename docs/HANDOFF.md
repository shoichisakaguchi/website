# HANDOFF — rdrp.io

最終更新: 2026-09-10 / セッション: 018pQNozbBvBw9A24k1mxXXV

このファイルはセッション間の引き継ぎ用。安定した設計事実は `AGENTS.md` に、
ここには「いまどこまで進んでいて、次に何をするか」だけを書く。

## 今回やったこと（2026-09-10・本番反映済み）

コミット `028f28d`、`1be87fb`（どちらも `main` に push 済み）。

- **トップページのサミット一覧に Consensus statement の DOI を出した。**
  合意文書2本は元から `communityOutcomes` にあり詳細ページには出ていたが、
  トップからは2クリック奥だった。新規データは作っていない。
- **Archived バッジを非表示にした。** 3件中2件が Archived で「Planning でない」
  としか言っておらず、Planning バッジの不在と年号が同じことを二重に言っていた。
  `phase` のデータ自体は触っていない。
- **カードを `<a>` から `<li>` に変えた。** DOI リンクを入れると入れ子リンクになるため。
  一覧は `<ul>`。ホバーの浮き上がりは、押せないのに動くので外した。
- **Google Calendar を2箇所でリンクにした**（名前だけ書かれていた）。
  `src/content/summit/info.yaml` の Planning メッセージと `/journal-club/`。
  URL は `https://calendar.google.com/calendar/u/0?cid=cmRycC5zdW1taXRAZ21haWwuY29t`
  （= rdrp.summit@gmail.com の購読リンク）。
- **`marked` に renderer を足した**（`src/pages/index.astro`）。編集者が書いた
  Markdown の外部リンクを新規タブで開くため。⚠ `marked` は index / posts /
  SummitDetail / rss.xml.ts で共有シングルトンなので、`marked.use()` ではなく
  `new Marked({...})` にしてある。**グローバルにすると RSS に `target="_blank"` が混ざる。**
- **`--c-primary` の未定義参照を2箇所直した**（`.summit-year`、`.eyebrow` → `--c-link`）。
- **`links.googleCalendar` を削除した**（スキーマと Keystatic の両方）。値が3件とも空で、
  どこからも描画されていなかった。他の5つの `links.*` は描画されているので残してある。

## 触ったファイル

- `src/pages/index.astro`（一覧のマークアップ・CSS・marked renderer）
- `src/pages/journal-club/index.astro`（カレンダーのリンク化）
- `src/content/summit/info.yaml`（同上）
- `src/content/config.ts` / `keystatic.config.ts`（`links.googleCalendar` 削除）
- 新規: `docs/HANDOFF.md`（このファイル）

## 次のセッションの主題

**JC のスライドの DOI・録画の公開期限・発表者への還元。**

前提として調べ済みのこと:

- **サイト側は既に受け入れ可能。** `journal-club` の `links: [{label, url, isPrimary}]`
  は label が自由入力なので、`Slides (Zenodo)` + `https://doi.org/...` を
  **コード変更ゼロ**で追加できる（`src/content/config.ts` の journal-club、
  `keystatic.config.ts` の Links 欄、表示は `src/pages/journal-club/[slug].astro`）。
  `isPrimary` は紹介論文のものに残し、スライドには付けない。
- **録画は1本も無い。** 技術的な問題ではなく**同意プロセスが無いだけ**。
  登壇依頼フォームに「録画公開の可否」を1行足すのが最小の一手。
  `summits` の `archiveResources.recordingsUrl` は器が用意されていて中身が無い。
- **DOI はスライド優先**という判断（録画は視聴コストが高く引用されない。
  スライドは引用され CV に書ける）。Zenodo は無料・1レコード50GBまで。
  やめても**発行済み DOI は永続する**ので参加者の業績は毀損されない＝始めやすい。
- **`links` は「紹介した論文」と「我々が出した成果物」を区別していない。**
  将来 Year in Review で DOI を自動収集したくなったら `type` を足す。今は不要。
- 未確認: ウェビナー録画特化の Zenodo 運用例は調査で見つからず＝先行例なしの試み。

還元の設計として調査済みの材料:

- **公開の承認が最も安い部品。** CSCCE 2017年調査でアンバサダー制度の参加インセンティブ
  最多は「公的な評価・承認」79%。登壇歴を people / JC ページに残し**消さない**
  （nf-core の「一度載せたら消さない」方針）＋「依頼があれば推薦状を書く」の明記。
  CV には `Invited speaker, RdRp Summit Journal Club, <date>`。
- preLights の見返り設計＝科学ライティング経験・著者とのネットワーク・**推薦状**・
  プロフィール向上。このうち推薦状とプロフィールだけを取るのが安い。
- **JC の月1が崩れかけている**（最後の間隔が86日）。新コーナー（若手10分枠など）を
  足すのは月1が戻ってから。崩れかけの枠に負荷を足すと本体が落ちる。

## まだ手をつけていない（優先順）

1. **Cloudflare Web Analytics の有効化**（10分・無料・cookie 不要・Pages のトグル1つ）。
   いま何が読まれているか測る手段がゼロで、施策が効いたかを判定できない。
   測る問いは「流入元の上位3つ」だけに絞り、四半期に1回見る。
2. **2025 Lisbon の参加者数を埋める**（15分）。2023には「70名超・50機関超」があるのに
   2025は空欄。数字が2期分並ぶと2027の勧誘材料になる。
3. `/publications` と `/tools` の独立ページ化（Q2想定・2〜3時間）。
   全サミットの `communityOutcomes` を横断で並べるだけなので新規データ不要。
   `/tools` は検索流入を生みうる唯一のページ。⚠ NeoRdRp を特別扱いせず、
   「このページは NeoRdRp の著者が運営するサイトにあります」と開示する。
4. 2027 の律速は集客ではなく**ドイツ側のローカルオーガナイザーが決まっていないこと**。

## 注意点

- **push = 本番デプロイ。** `main` への push で Cloudflare Pages が自動デプロイし約90秒で反映。
  実測でも140秒だった。指示があるまで push しない。
- `origin` は HTTPS だが認証情報が無いので push は SSH:
  `git push git@github.com:shoichisakaguchi/website.git main`
- **`.button.primary` はまだ `--c-primary` を参照している**（`index.astro:321`）。
  ただしそのクラスを使う要素が存在しない**未使用 CSS** なので実害なし。消すなら別途。
- Keystatic の編集は `main` に直コミットされる＝ローカルが黙って古くなる。作業前に pull。
- 調査の根拠と3案のモック: https://claude.ai/code/artifact/9044dda2-108e-42e5-af54-e2d73e0bb594
