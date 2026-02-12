"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FadeInTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down";
  once?: boolean;
  amount?: number;
}

/**
 * テキストが下からマスクを突き破って現れるアニメーション
 * y軸移動 + opacity + overflow-hidden の組み合わせ
 */
export function FadeInText({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  direction = "up",
  once = true,
  amount = 0.2,
}: FadeInTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const yOffset = direction === "up" ? 60 : -60;

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{
          y: yOffset,
          opacity: 0,
        }}
        animate={
          isInView
            ? {
                y: 0,
                opacity: 1,
                transition: {
                  duration,
                  delay,
                  ease: [0.25, 0.4, 0.25, 1],
                },
              }
            : {}
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
