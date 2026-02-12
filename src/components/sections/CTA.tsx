"use client";

import { Twitter, Bell } from "lucide-react";
import { FadeInText } from "@/components/animations";

export function CTA() {
  return (
    <footer
      id="cta"
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-16 lg:px-24 overflow-hidden snap-start flex flex-col justify-center"
    >
      {/* 白ベースに淡いアクセントのグラデーション */}
      <div className="absolute inset-0 bg-white -z-10" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-accent-yellow/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-accent-pink/8 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-accent-blue/8 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        <FadeInText>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-dark mb-8 tracking-tight">
              エントリー開始までお待ちください
            </h2>
            <p className="text-base-dark/60 text-base md:text-lg mb-0 max-w-2xl mx-auto leading-relaxed">
              開催まで今しばらくお待ちください。
              <br />
              エントリー・イベント情報はSNSと通知でお知らせします。
            </p>
          </div>
        </FadeInText>

        <FadeInText delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-base-dark font-bold hover:bg-accent-yellow transition-all duration-300 border-2 border-base-dark/15 shadow-xl shadow-black/20 hover:shadow-accent-yellow/20 hover:scale-[1.02]"
            >
              <Bell className="w-5 h-5" />
              <span>通知を受け取る</span>
            </a>
            <a
              href="https://x.com/search?q=%23Hackit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-base-dark font-bold hover:bg-accent-yellow transition-all duration-300 border-2 border-base-dark/15 shadow-xl shadow-black/20 hover:shadow-accent-yellow/20 hover:scale-[1.02]"
            >
              <Twitter className="w-5 h-5" />
              <span>#Hackit</span>
            </a>
          </div>
        </FadeInText>

        <FadeInText delay={0.25}>
          <p className="text-sm text-base-dark/40">© 2026 KIT Developers Hub. Hackit 2026.</p>
        </FadeInText>
      </div>
    </footer>
  );
}
