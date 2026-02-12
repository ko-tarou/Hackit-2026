"use client";

import { useRef } from "react";
import { FadeInText, StaggerContainer, staggerItemVariants } from "@/components/animations";
import { motion, useScroll, useTransform } from "framer-motion";

const SCHEDULE_ITEMS = [
  { date: "2026.07.25", title: "キックオフ", description: "キックオフイベント" },
  { date: "2026.08.01", title: "1日目", description: "アイデアソン / メンター紹介 / ハッキングスタート" },
  { date: "2026.08.02", title: "2日目", description: "ハッキング / 中間発表" },
  { date: "2026.08.03", title: "3日目", description: "最終発表 / 表彰式 / パーティー" },
];

export function Schedule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.3"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 0.25, 0.5, 0.75, 1]);

  return (
    <section
      id="schedule"
      ref={containerRef}
      className="relative min-h-screen py-20 sm:py-32 md:py-48 px-4 sm:px-6 md:px-16 lg:px-24 bg-base overflow-hidden snap-start"
    >
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#2d2d2d_1px,transparent_1px),linear-gradient(to_bottom,#2d2d2d_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />

      <div className="max-w-5xl mx-auto">
        <FadeInText className="mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-medium tracking-[0.3em] text-accent mb-4">スケジュール</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-base-dark">スケジュール</h2>
        </FadeInText>

        <StaggerContainer staggerChildren={0.1} delayChildren={0.1}>
          <div className="relative">
            {/* スクロールで伸びるタイムライン（SVG pathLength） */}
            <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-base-dark/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-0 w-full bg-gradient-to-b from-accent via-accent-yellow/80 to-accent-coral rounded-full origin-top"
                style={{ scaleY: lineProgress }}
              />
            </div>

            <div className="space-y-0">
              {SCHEDULE_ITEMS.map((item) => (
                <motion.div
                  key={item.date}
                  variants={staggerItemVariants}
                  className="relative pl-12 sm:pl-16 md:pl-24 pb-10 sm:pb-14 last:pb-0 group"
                >
                  <div className="absolute left-3 sm:left-4 md:left-6 top-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent group-hover:scale-150 group-hover:ring-4 group-hover:ring-accent/30 transition-all -translate-x-1/2 z-10" />
                  <div className="flex flex-col md:flex-row md:items-baseline gap-1 sm:gap-2 md:gap-8">
                    <span className="text-xs sm:text-sm font-bold text-accent tracking-wider whitespace-nowrap">{item.date}</span>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-base-dark mb-1 group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-base-dark/70">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
