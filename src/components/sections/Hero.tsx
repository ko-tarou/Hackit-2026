"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInText, ColorfulOrbs, MagneticButton } from "@/components/animations";

export function Hero() {
  return (
    <section className="relative min-h-screen min-h-[100dvh] flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-32 pb-24 overflow-hidden snap-start">
      {/* カラフルなローテーション背景 - Yamacs風 */}
      <ColorfulOrbs />
      <div className="absolute inset-0 bg-gradient-to-br from-base via-white/95 to-accent/5 -z-10" />

      <div className="max-w-5xl mx-auto w-full space-y-8 md:space-y-12">
        {/* イベント名 */}
        <FadeInText delay={0.1} duration={1}>
          <p className="text-sm md:text-base font-medium tracking-[0.3em] text-accent mb-4">
            ハッカソン 2026
          </p>
        </FadeInText>
        <FadeInText delay={0.2} duration={1}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-base-dark">
            Hackit
            <span className="block bg-gradient-to-r from-accent via-accent-coral to-accent-yellow bg-clip-text text-transparent">
              2026
            </span>
          </h1>
        </FadeInText>

        {/* キャッチコピー */}
        <FadeInText delay={0.4} duration={0.9}>
          <p className="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-base-dark/90 max-w-2xl leading-relaxed">
            繋がる、創る、超えていく。
          </p>
        </FadeInText>

        {/* 日程・場所 */}
        <FadeInText delay={0.6} duration={0.9}>
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-base-dark/80">
            <div>
              <span className="text-sm font-medium text-accent block mb-1">
                日程
              </span>
              <p className="font-medium">2026年8月1日 — 8月3日</p>
            </div>
            <div>
              <span className="text-sm font-medium text-accent block mb-1">
                場所
              </span>
              <p className="font-medium">
                金沢工業大学
                <span className="block text-sm mt-1">（石川県）</span>
              </p>
            </div>
          </div>
        </FadeInText>
      </div>

      {/* スクロールを促す - マグネティックボタン */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 1.2, duration: 0.6 },
        }}
      >
        <MagneticButton
          strength={0.4}
          onClick={() =>
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 rounded-full px-6 py-4 hover:bg-accent/10 transition-colors"
          >
            <span className="text-xs font-medium tracking-widest text-accent">
              下にスクロール
            </span>
            <ChevronDown className="w-6 h-6 text-accent" strokeWidth={2} />
          </motion.div>
        </MagneticButton>
      </motion.div>
    </section>
  );
}
