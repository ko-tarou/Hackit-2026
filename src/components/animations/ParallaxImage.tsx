"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  delay?: number;
  once?: boolean;
}

/**
 * スクロールに合わせてパララックス効果を持つ画像/要素
 * 遅れて表示 + スクロール速度とずれた動き
 */
export function ParallaxImage({
  children,
  className = "",
  speed = 0.3,
  delay = 0,
  once = true,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [30 * speed, -20 * speed, -50 * speed]
  );

  return (
    <motion.div ref={ref} className={className} style={{ y: parallaxY }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.9,
                  delay,
                  ease: [0.25, 0.4, 0.25, 1],
                },
              }
            : {}
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
