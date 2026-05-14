"use client";

import { FadeInText } from "@/components/animations";
import { Mail } from "lucide-react";

export function CTA() {
  return (
    <footer
      id="cta"
      className="relative min-h-screen py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden snap-start flex flex-col"
    >
      {/* 白ベースに淡いアクセントのグラデーション */}
      <div className="absolute inset-0 bg-white -z-10" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10" style={{ willChange: "transform" }} />
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-accent-yellow/10 rounded-full blur-3xl -z-10" style={{ willChange: "transform" }} />
      <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-accent-pink/8 rounded-full blur-3xl -z-10" style={{ willChange: "transform" }} />
      <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-accent-blue/8 rounded-full blur-3xl -z-10" style={{ willChange: "transform" }} />

      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInText>
            <div className="mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-dark mb-6 sm:mb-8 tracking-tight px-4">
                エントリー受付中！
              </h2>
              <p className="text-base-dark/60 text-sm sm:text-base md:text-lg mb-0 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-4">
                チームまたは個人でエントリーできます。
                <br className="hidden sm:inline" />
                <span className="sm:ml-1">下のボタンからお申し込みください。</span>
              </p>
            </div>
          </FadeInText>

          <FadeInText delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
              <a
                href="/entry"
                className="inline-flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-4 rounded-2xl bg-accent text-white font-bold hover:bg-accent/90 transition-all duration-300 shadow-xl shadow-accent/20 hover:shadow-accent/30 hover:scale-[1.02] text-sm sm:text-base whitespace-nowrap"
              >
                エントリーする
              </a>
              <a
                href="https://x.com/search?q=%23Hackit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white text-base-dark font-bold hover:bg-accent-yellow transition-all duration-300 border-2 border-base-dark/15 shadow-xl shadow-black/20 hover:shadow-accent-yellow/20 hover:scale-[1.02] text-sm sm:text-base whitespace-nowrap"
              >
                <span className="text-lg sm:text-xl font-bold" aria-hidden>{"\u{1D54F}"}</span>
                <span>#Hackit</span>
              </a>
            </div>
          </FadeInText>

          <FadeInText delay={0.3}>
            <div className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-base-dark/10 max-w-2xl mx-auto px-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-base-dark mb-3 tracking-tight">
                お問い合わせ
              </h3>
              <p className="text-base-dark/60 text-xs sm:text-sm md:text-base mb-6 sm:mb-8 leading-relaxed">
                ご質問・取材のお問い合わせはこちらから。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a
                  href="mailto:haccckit@gmail.com"
                  aria-label="メールでお問い合わせ（haccckit@gmail.com）"
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-2xl bg-white text-base-dark font-semibold hover:bg-accent-yellow/40 transition-all duration-300 border-2 border-base-dark/15 shadow-md shadow-black/5 hover:shadow-lg hover:scale-[1.02] text-sm whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden />
                  <span>メールで問い合わせ</span>
                </a>
                <a
                  href="https://x.com/HacKit_KIT"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (旧Twitter) の @HacKit_KIT を新しいタブで開く"
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-2xl bg-white text-base-dark font-semibold hover:bg-accent-yellow/40 transition-all duration-300 border-2 border-base-dark/15 shadow-md shadow-black/5 hover:shadow-lg hover:scale-[1.02] text-sm whitespace-nowrap"
                >
                  <span className="text-base sm:text-lg font-bold" aria-hidden>{"\u{1D54F}"}</span>
                  <span>@HacKit_KIT</span>
                </a>
              </div>
            </div>
          </FadeInText>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-base-dark/40 text-center py-6 px-4 mt-auto">
        © 2026 KIT Developers Hub. Hackit 2026.
      </p>
    </footer>
  );
}
