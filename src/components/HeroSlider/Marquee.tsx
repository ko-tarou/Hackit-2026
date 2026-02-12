"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  text: string;
  opacity?: number;
  dark?: boolean; // パステル背景時は濃い色
}

/**
 * 無限横スクロール Marquee アニメーション
 * 背景最背面に巨大文字がゆっくり横スクロール
 */
export function Marquee({ text, opacity = 0.08, dark = false }: MarqueeProps) {
  const content = Array(3)
    .fill(text)
    .join("  •  ");

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none flex items-center"
      style={{ opacity }}
    >
      <motion.div
        className={`inline-flex shrink-0 font-bold text-[min(10vw,5rem)] leading-none tracking-[0.15em] ${dark ? "text-base-dark" : "text-white"}`}
        style={{ width: "max-content" }}
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          },
        }}
      >
        <span className="shrink-0">{content}</span>
        <span className="shrink-0 ml-[0.5em]">{content}</span>
      </motion.div>
    </div>
  );
}
