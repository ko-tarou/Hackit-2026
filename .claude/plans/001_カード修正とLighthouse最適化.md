# 001: カードUI修正 & Lighthouse最適化

## 概要
About セクションの3Dカルーセルカード溢れ修正 + 全体的なLighthouseスコア向上

## PR一覧

### PR1: About カードUI修正 (feature/fix-about-card)
- カード高さ拡張 (`h-[160px] sm:h-[220px]` → より大きく)
- カルーセルシーンの高さも連動して拡張
- インジケーター位置の調整
- description の line-clamp 調整
- ボタンが確実に表示される flex レイアウト修正

### PR2: Lighthouse パフォーマンス最適化 (feature/lighthouse-optimize)
- SpeechBubble: `<img>` → Next.js `<Image>` に置換
- globals.css: 連続アニメーション最適化 (will-change, contain)
- MagneticButton: mousemove イベントのスロットリング
- layout.tsx: SEO メタデータ強化 (viewport, theme-color, OGP)
- アクセシビリティ修正:
  - Header: キーボードナビゲーション
  - MagneticButton: セマンティック要素化
  - Schedule: `<time>` 要素追加
- Sponsors: 非公開時の不要なパララックス処理削除
- CTA/ColorfulOrbs: blur フィルターに will-change 追加

## 実行順序
並行実行 (2エージェント、worktree isolation)

## 優先度
1. PR1 (ユーザーが直接指摘した問題)
2. PR2 (パフォーマンス改善)
