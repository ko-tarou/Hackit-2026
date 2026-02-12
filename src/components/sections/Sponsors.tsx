"use client";

import { FadeInText, StaggerContainer, staggerItemVariants, ParallaxImage } from "@/components/animations";
import { motion } from "framer-motion";

const SPONSOR_TIERS = [
  { tier: "プラチナスポンサー", tierEn: "Platinum", count: 4, className: "w-56 h-28 md:w-72 md:h-36 flex-shrink-0", scroll: true },
  { tier: "ゴールドスポンサー", tierEn: "Gold", count: 6, className: "w-40 h-20 md:w-52 md:h-26 flex-shrink-0", scroll: false },
  { tier: "シルバースポンサー", tierEn: "Silver", count: 8, className: "w-28 h-14 md:w-36 md:h-18 flex-shrink-0", scroll: false },
];

function SponsorPlaceholder({ className }: { className: string }) {
  return (
    <div
      className={`rounded-xl bg-white/40 backdrop-blur-md border border-base-dark/10 flex items-center justify-center hover:bg-white/60 hover:border-base-dark/20 transition-all duration-300 ${className}`}
    >
      <span className="text-xs text-base-dark/40">Logo</span>
    </div>
  );
}

export function Sponsors() {
  return (
    <section
      id="sponsors"
      className="relative min-h-screen py-20 sm:py-32 md:py-48 px-4 sm:px-6 md:px-16 lg:px-24 bg-base overflow-hidden snap-start"
    >
      {/* 薄いグリッド */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#2d2d2d_1px,transparent_1px),linear-gradient(to_bottom,#2d2d2d_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <FadeInText className="mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-medium tracking-[0.3em] text-accent mb-4">スポンサー</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-base-dark">スポンサー</h2>
        </FadeInText>

        <StaggerContainer staggerChildren={0.12} delayChildren={0.1}>
          <div className="space-y-14 md:space-y-20">
            {SPONSOR_TIERS.map(({ tier, tierEn, count, className, scroll }) => (
              <motion.div key={tier} variants={staggerItemVariants}>
                <p className="text-xs sm:text-sm font-bold text-base-dark/70 tracking-wider mb-3 sm:mb-4">{tier} <span className="text-base-dark/40 font-normal">({tierEn})</span></p>
                {scroll ? (
                  <div className="overflow-x-auto -mx-6 md:-mx-16 px-6 md:px-16 scrollbar-hide">
                    <div className="flex gap-4 md:gap-6 items-center pb-2" style={{ width: "max-content" }}>
                      {Array.from({ length: count }).map((_, i) => (
                        <ParallaxImage key={i} delay={i * 0.05}>
                          <SponsorPlaceholder className={className} />
                        </ParallaxImage>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-4 md:gap-6">
                    {Array.from({ length: count }).map((_, i) => (
                      <ParallaxImage key={i} delay={i * 0.06}>
                        <SponsorPlaceholder className={className} />
                      </ParallaxImage>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
