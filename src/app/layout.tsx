import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  weight: ["300", "400", "500", "700", "900"],
});

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  variable: "--font-shippori-mincho",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hackit 2026 | 繋がる、創る、超えていく。",
  description:
    "KIT Developers Hub主催のハッカソン Hackit 2026。2026年8月1日〜3日、金沢工業大学で開催。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${shipporiMincho.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
