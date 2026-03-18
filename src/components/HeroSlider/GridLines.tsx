"use client";

import { motion } from "framer-motion";

/**
 * pathLength 0→1 で描画されるグリッドライン SVG
 * dark: パステル背景用に濃い色の線
 */
export function GridLines({ dark = false }: { dark?: boolean }) {
  const lines = 8;
  const horizontalPaths = Array.from({ length: lines }, (_, i) => {
    const y = (100 / (lines + 1)) * (i + 1);
    return `M 0 ${y} L 100 ${y}`;
  });
  const verticalPaths = Array.from({ length: 10 }, (_, i) => {
    const x = (100 / 11) * (i + 1);
    return `M ${x} 0 L ${x} 100`;
  });

  const strokeH = dark ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)";
  const strokeV = dark ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.08)";
  const strokeWave1 = dark ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.25)";
  const strokeWave2 = dark ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.15)";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {horizontalPaths.map((d, i) => (
          <motion.path
            key={`h-${i}`}
            d={d}
            fill="none"
            stroke={strokeH}
            strokeWidth="0.03"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1 + i * 0.05,
              delay: 0.1 + i * 0.02,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          />
        ))}
        {verticalPaths.map((d, i) => (
          <motion.path
            key={`v-${i}`}
            d={d}
            fill="none"
            stroke={strokeV}
            strokeWidth="0.02"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.2 + (i % 5) * 0.05,
              delay: 0.2 + (i % 5) * 0.03,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          />
        ))}
      </svg>
      {/* 波線パス */}
      <svg
        className="absolute bottom-[12%] left-0 w-full h-24"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,40 Q300,0 600,40 T1200,40"
          fill="none"
          stroke={strokeWave1}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.3,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        />
        <motion.path
          d="M0,60 Q400,20 800,60 T1600,60"
          fill="none"
          stroke={strokeWave2}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.8,
            delay: 0.5,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        />
      </svg>
    </div>
  );
}
