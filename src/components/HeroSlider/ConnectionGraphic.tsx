"use client";

import { motion } from "framer-motion";

/**
 * 右側の「つながり」を表す図形アニメーション
 * dark: パステル背景用に濃い色
 */
export function ConnectionGraphic({ dark = false }: { dark?: boolean }) {
  const strokeColor = dark ? "rgba(45,45,45,0.5)" : "rgba(255,255,255,0.6)";
  const fillColor = dark ? "#2d2d2d" : "white";

  const dotPositions = [
    { x: 20, y: 15 },
    { x: 60, y: 25 },
    { x: 35, y: 55 },
    { x: 80, y: 60 },
    { x: 50, y: 85 },
  ];

  const linePaths = [
    "M 20 15 L 60 25",
    "M 60 25 L 80 60",
    "M 35 55 L 60 25",
    "M 35 55 L 50 85",
    "M 80 60 L 50 85",
  ];

  return (
    <div className="relative w-24 h-32 md:w-32 md:h-40">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
      >
        {linePaths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.5 + i * 0.1,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          />
        ))}
        {dotPositions.map((pos, i) => (
          <motion.circle
            key={i}
            cx={pos.x}
            cy={pos.y}
            r="4"
            fill={fillColor}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.8 + i * 0.1,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
