"use client";

import { Trophy, Award, Medal } from "lucide-react";
import { FadeInText, StaggerContainer, staggerItemVariants } from "@/components/animations";
import { motion } from "framer-motion";

const AWARDS = [
  {
    id: "grand",
    name: "最優秀賞",
    subName: "Grand Prize",
    amount: "100,000",
    unit: "円",
    icon: Trophy,
    highlighted: true,
  },
  {
    id: "audience",
    name: "オーディエンス賞",
    subName: "Best Audience Award",
    amount: null,
    unit: null,
    icon: Award,
    highlighted: false,
  },
  {
    id: "sponsor",
    name: "スポンサー賞",
    subName: "Sponsor Award",
    amount: null,
    unit: null,
    icon: Medal,
    highlighted: false,
  },
];

export function Awards() {
  return (
    <section
      id="awards"
      className="relative min-h-screen py-20 sm:py-32 md:py-48 px-4 sm:px-6 md:px-16 lg:px-24 bg-base overflow-hidden snap-start"
    >
      {/* 薄いグリッド背景（設計図メタファー） */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#2d2d2d_1px,transparent_1px),linear-gradient(to_bottom,#2d2d2d_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <FadeInText className="mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-medium tracking-[0.3em] text-accent mb-4">
            賞品
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-base-dark">
            賞
          </h2>
        </FadeInText>

        {/* Bento Grid: 最優秀賞を大きく、他をコンパクトに */}
        <StaggerContainer staggerChildren={0.15} delayChildren={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-fr">
            {/* 最優秀賞: 2列×2行でメイン */}
            {AWARDS.filter((a) => a.highlighted).map((award) => (
              <motion.div
                key={award.id}
                variants={staggerItemVariants}
                className="md:col-span-2 md:row-span-2"
              >
                <div className="h-full min-h-[280px] md:min-h-full rounded-2xl border-[3px] border-base-dark bg-white p-4 sm:p-6 md:p-10 flex flex-col justify-between shadow-none">
                  <div className="flex items-start justify-between">
                    <award.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-accent" strokeWidth={2} />
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest text-base-dark/60 border border-base-dark/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                      メイン賞
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-base-dark mb-0.5">
                      {award.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-base-dark/60 mb-3 sm:mb-4">{award.subName}</p>
                    {/* 金額を極端に大きく */}
                    <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-base-dark tracking-tighter leading-none">
                      {award.amount}
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold ml-1">{award.unit}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* 他2賞: 1列ずつ、Brutalism枠のみ */}
            {AWARDS.filter((a) => !a.highlighted).map((award) => (
              <motion.div key={award.id} variants={staggerItemVariants} className="md:col-span-2">
                <div className="h-full min-h-[140px] sm:min-h-[160px] rounded-2xl border-2 border-base-dark/20 bg-white/60 backdrop-blur-sm p-4 sm:p-6 flex flex-col justify-center">
                  <award.icon className="w-7 h-7 sm:w-8 sm:h-8 text-accent mb-2 sm:mb-3" strokeWidth={1.5} />
                  <h3 className="text-base sm:text-lg font-bold text-base-dark">{award.name}</h3>
                  <p className="text-xs sm:text-sm text-base-dark/60">{award.subName}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
