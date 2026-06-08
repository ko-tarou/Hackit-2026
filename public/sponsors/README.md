# スポンサーロゴ

このディレクトリにスポンサー企業のロゴ画像を配置します。

## 手順

1. ロゴ画像（**透過PNG または SVG 推奨**）をこのディレクトリに置く
   例: `public/sponsors/play.png`
2. `src/components/sections/Sponsors.tsx` の `SPONSOR_TIERS` 内、
   対象スポンサーの `logo` フィールドにパスを設定する
   例: `{ name: "PLAY", logo: "/sponsors/play.png" }`
3. `logo` を設定すると企業名テキストの代わりにロゴ（`next/image`）が表示される。
   `logo` 未設定（undefined）の場合は企業名テキストが表示される。

## 注意

- 存在しないパスを `logo` に設定すると壊れた画像アイコンが表示されるため、
  **実ファイルを置いてから** `logo` パスを設定すること。
- `url` フィールドを設定すると、カードがその企業サイトへのリンクになる。
