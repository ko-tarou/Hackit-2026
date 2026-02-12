"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollTiltProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * スクロールに連動して3D傾斜するセクション
 */
export function ScrollTilt({ children, className = "" }: ScrollTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-5, 0, 0, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        scale,
        y,
        transformOrigin: "center center",
        perspective: "1000px",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
