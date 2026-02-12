"use client";

import { motion } from "framer-motion";

interface SpeechBubbleProps {
  src: string;
  alt: string;
  delay?: number;
  className?: string;
}

/**
 * 吹き出し形状でクリッピングされた画像
 * Pop-in spring アニメーション
 */
const speechBubbleClipPath =
  "polygon(0% 0%, 100% 0%, 100% 85%, 92% 100%, 0% 100%)";

export function SpeechBubble({ src, alt, delay = 0, className = "" }: SpeechBubbleProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl aspect-square ${className}`}
      style={{
        clipPath: speechBubbleClipPath,
        WebkitClipPath: speechBubbleClipPath,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.8,
          delay,
        },
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
