"use client";

import { FadeInText, StaggerContainer, staggerItemVariants } from "@/components/animations";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PARTICIPATING_GROUPS = [
  "GDGoC KIT",
  "BusStop",
  "IoA",
  "Security Project",
  "DataDreamers",
  "他9団体",
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);

  return (
    <section
      id="about"
      className="relative min-h-screen py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-white overflow-hidden snap-start"
    >
      {/* 薄いグリッド */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#2d2d2d_1px,transparent_1px),linear-gradient(to_bottom,#2d2d2d_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />

      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="space-y-10">
            <FadeInText>
              <span className="text-sm font-medium tracking-[0.3em] text-accent mb-4">About</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-base-dark leading-tight">
                Hackitとは？
              </h2>
            </FadeInText>

            <StaggerContainer staggerChildren={0.12} delayChildren={0.2}>
              <motion.div variants={staggerItemVariants} className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-accent tracking-wider mb-2">主催</h3>
                  <p className="text-lg text-base-dark/90">
                    KIT Developers Hub
                    <span className="block text-base mt-1 text-base-dark/70">
                      金沢工業大学の課外活動14プロジェクトが連携
                    </span>
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-accent tracking-wider mb-2">目的</h3>
                  <ul className="space-y-2 text-base-dark/90">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>プロジェクトの垣根を超えた交流</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>1年生の早期スキルアップとコネクション形成</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>プロエンジニアとの共創</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </StaggerContainer>

            <FadeInText delay={0.2}>
              <div className="pt-6 border-t border-base-dark/10">
                <p className="text-sm font-medium text-accent tracking-wider mb-4">参加団体</p>
                <div className="flex flex-wrap gap-3 min-w-0">
                  {PARTICIPATING_GROUPS.map((group) => (
                    <span
                      key={group}
                      className="inline-flex px-4 py-2 bg-base-dark/5 text-base-dark/80 text-sm rounded-xl border border-base-dark/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-200 whitespace-nowrap"
                    >
                      {group}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInText>
          </div>

          {/* 右: 14をインフォグラフィックとして大きく・背景に溶け込ませる */}
          <motion.div
            className="relative flex items-center justify-center min-h-[320px] lg:min-h-[420px]"
            style={{ scale }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-[min(20vw,14rem)] font-black text-base-dark/[0.06] select-none leading-none tracking-tighter"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              >
                14
              </motion.span>
            </div>
            <motion.div
              className="relative z-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="block text-7xl md:text-8xl lg:text-9xl font-black text-base-dark leading-none">
                14
              </span>
              <span className="block mt-2 text-sm font-bold text-accent uppercase tracking-widest">
                参加団体
              </span>
              <p className="mt-1 text-base md:text-lg text-base-dark/70 max-w-[240px] mx-auto">
                KITの課外活動プロジェクトが連携
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
