/**
 * Hackit 2026 オートプレイスライダー用データ定義
 * パステルカラー: オレンジ / 黄色 / ピンク
 */
export interface SliderPhase {
  id: string;
  bgColor: string;
  textColor: "light" | "dark"; // パステル背景に合わせたテキスト色
  mainText: string; // 英語メインテキスト
  subText: string; // 日本語サブテキスト
  verticalTextLeft: string; // 左縦書き
  verticalTextRight: string; // 右縦書き
}

export const SLIDER_PHASES: SliderPhase[] = [
  {
    id: "orange",
    bgColor: "#FFCC99", // パステルオレンジ
    textColor: "dark",
    mainText: "CONNECT",
    subText: "プロジェクトの垣根を超えた交流。",
    verticalTextLeft: "金沢工業大学",
    verticalTextRight: "14団体",
  },
  {
    id: "yellow",
    bgColor: "#FFF3B0", // パステルイエロー
    textColor: "dark",
    mainText: "CREATE",
    subText: "1年生の早期スキルアップとコネクション形成。",
    verticalTextLeft: "ハッカソン",
    verticalTextRight: "2026",
  },
  {
    id: "pink",
    bgColor: "#FFB6C1", // パステルピンク
    textColor: "dark",
    mainText: "GO BEYOND",
    subText: "プロエンジニアとの共創。",
    verticalTextLeft: "8月1日〜3日",
    verticalTextRight: "KIT Developers Hub",
  },
];

export const SLIDER_INTERVAL_MS = 7000;
export const MARQUEE_TEXT = "Hackit 2026 — Connect. Create. Go Beyond.";