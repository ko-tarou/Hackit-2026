"use client";

import { Twitter, Bell } from "lucide-react";
import { FadeInText } from "@/components/animations";

export function CTA() {
  return (
    <footer
      id="cta"
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-16 lg:px-24 overflow-hidden snap-start flex flex-col justify-center"
    >
      {/* 柔らかいグラデーション（サイト世界観に合わせたパステル寄り） */}
      <div className="absolute inset-0 bg-gradient-to-br from-base-dark/95 via-base-dark/90 to-base-dark/95 -z-10" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-accent/15 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-accent-yellow/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        <FadeInText>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            エントリー開始までお待ちください
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            開催まで今しばらくお待ちください。
            エントリー・イベント情報はSNSと通知でお知らせします。
          </p>
        </FadeInText>

        <FadeInText delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {/* 主CTA: 通知を受け取る */}
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-base-dark font-bold hover:bg-accent-yellow/90 transition-all border-2 border-white/50 shadow-lg"
            >
              <Bell className="w-5 h-5" />
              <span>通知を受け取る</span>
            </a>
            <a
              href="https://x.com/search?q=%23Hackit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 border-2 border-white/30 text-white font-medium hover:bg-white/20 hover:border-white/50 transition-all"
            >
              <Twitter className="w-5 h-5" />
              <span>#Hackit</span>
            </a>
          </div>
        </FadeInText>

        <FadeInText delay={0.25}>
          <p className="text-sm text-white/50">© 2026 KIT Developers Hub. Hackit 2026.</p>
        </FadeInText>
      </div>
    </footer>
  );
}
