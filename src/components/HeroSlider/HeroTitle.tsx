"use client";

import { motion } from "framer-motion";

interface HeroTitleProps {
  dark?: boolean;
}

const letters = "Hackit".split("");

/**
 * 中央にデカく表示する「Hackit」の凝ったアニメーション
 * 文字ごとにスタッガー + スプリング + 微細な浮遊ループ
 */
export function HeroTitle({ dark = false }: HeroTitleProps) {
  return (
    <div
      className="relative flex items-center justify-center pointer-events-none w-full h-full"
      style={{ perspective: "1000px" }}
      aria-hidden
    >
      <motion.div
        className="flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.09,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className={`inline-block font-black tracking-[-0.04em] select-none ${
              dark ? "text-base-dark" : "text-white"
            }`}
            style={{
              fontSize: "clamp(4.5rem, 22vw, 18rem)",
              lineHeight: 1,
              textShadow: dark
                ? "0 2px 24px rgba(45,45,45,0.15)"
                : "0 2px 24px rgba(255,255,255,0.25)",
            }}
            variants={{
              hidden: {
                y: 100,
                opacity: 0,
                scale: 0.2,
                rotateY: -40,
              },
              visible: {
                y: 0,
                opacity: 1,
                scale: 1,
                rotateY: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  mass: 0.9,
                },
              },
            }}
          >
            <motion.span
              className="inline-block"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2.5 + i * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.08,
              }}
            >
              {letter}
            </motion.span>
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
