"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SLIDER_PHASES,
  SLIDER_INTERVAL_MS,
  MARQUEE_TEXT,
  type SliderPhase,
} from "./data";
import { Marquee } from "./Marquee";
import { GridLines } from "./GridLines";
import { ConnectionGraphic } from "./ConnectionGraphic";
import { HeroTitle } from "./HeroTitle";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
  exit: {
    y: -30,
    opacity: 0,
    transition: { duration: 0.4 },
  },
};

const textClass = (phase: SliderPhase) =>
  phase.textColor === "dark" ? "text-base-dark" : "text-white";
const textMutedClass = (phase: SliderPhase) =>
  phase.textColor === "dark" ? "text-base-dark/90" : "text-white/95";

function SlideContent({ phase }: { phase: SliderPhase }) {
  const words = phase.mainText.split(" ");
  const isDarkText = phase.textColor === "dark";

  return (
    <div className="absolute inset-0 flex flex-col px-4 sm:px-6 md:px-16 lg:px-24 pt-20 pb-16 sm:pb-20">
      {/* 背景レイヤー: Marquee / グリッド */}
      <Marquee text={MARQUEE_TEXT} opacity={0.08} dark={isDarkText} />
      <GridLines dark={isDarkText} />

      {/* 中央メイン: 「Hackit」をデカく主役に */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-0 z-10">
        <HeroTitle dark={isDarkText} />
      </div>

      {/* 下段1: フェーズメッセージ（CONNECT / CREATE / GO BEYOND + サブ） */}
      <div className="flex-[0_0_auto] flex flex-col items-center justify-center z-10 px-4 pb-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-0.5 text-center max-w-full"
        >
          {words.map((word, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${textClass(phase)} tracking-tight leading-[1.2] px-2`}
            >
              {word}
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          className={`mt-3 text-xs sm:text-sm md:text-base ${textMutedClass(phase)} font-medium max-w-xs sm:max-w-md md:max-w-lg text-center px-4`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {phase.subText}
        </motion.p>
      </div>

      {/* 下段2: 左右に縦書き + 右側つながり図形 */}
      <div className="flex-[0_0_auto] h-[12vh] min-h-[72px] flex items-center justify-between z-10">
        <div className="hidden lg:flex items-center h-full">
          <motion.div
            className={`${textMutedClass(phase)} text-sm font-medium tracking-wider`}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {phase.verticalTextLeft}
          </motion.div>
        </div>
        <div className="hidden lg:flex items-center gap-6">
          <ConnectionGraphic dark={isDarkText} />
          <motion.div
            className={`${textMutedClass(phase)} text-sm font-medium tracking-wider`}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {phase.verticalTextRight}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function HeroSlider() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phase = SLIDER_PHASES[phaseIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % SLIDER_PHASES.length);
    }, SLIDER_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      className="relative min-h-[100dvh] overflow-hidden snap-start"
      animate={{ backgroundColor: phase.bgColor }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={phase.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <SlideContent phase={phase} />
        </motion.div>
      </AnimatePresence>

      {/* インジケーター - パステル背景用に濃い色 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDER_PHASES.map((_, i) => (
          <button
            key={i}
            onClick={() => setPhaseIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === phaseIndex
                ? "bg-base-dark scale-125"
                : "bg-base-dark/40 hover:bg-base-dark/60"
            }`}
            aria-label={`スライド ${i + 1} に移動`}
          />
        ))}
      </div>
    </motion.section>
  );
}
