"use client";

import { motion } from "framer-motion";

/**
 * Yamacs風：カラフルでローテーションする装飾オーブ
 * オレンジ、イエロー、コーラル、ピンク、ブルーを浮遊・回転
 */
const ORBS = [
  {
    size: "w-32 h-32 md:w-48 md:h-48",
    color: "bg-accent/30",
    top: "top-[10%]",
    left: "left-[5%]",
    animation: "animate-float-slow",
    delay: 0,
  },
  {
    size: "w-24 h-24 md:w-32 md:h-32",
    color: "bg-accent-yellow/40",
    top: "top-[20%]",
    right: "right-[10%]",
    left: "",
    bottom: "",
    animation: "animate-float-medium",
    delay: 0.5,
  },
  {
    size: "w-20 h-20 md:w-28 md:h-28",
    color: "bg-accent-coral/35",
    top: "top-[60%]",
    left: "left-[15%]",
    right: "",
    bottom: "",
    animation: "animate-float-fast",
    delay: 1,
  },
  {
    size: "w-28 h-28 md:w-40 md:h-40",
    color: "bg-accent-pink/30",
    bottom: "bottom-[15%]",
    right: "right-[5%]",
    top: "",
    left: "",
    animation: "animate-float-slow",
    delay: 0.3,
  },
  {
    size: "w-16 h-16 md:w-24 md:h-24",
    color: "bg-accent-blue/35",
    top: "top-[40%]",
    right: "right-[25%]",
    left: "",
    bottom: "",
    animation: "animate-float-medium",
    delay: 0.8,
  },
  {
    size: "w-36 h-36 md:w-52 md:h-52",
    color: "bg-accent/20",
    bottom: "bottom-[30%]",
    left: "left-[20%]",
    top: "",
    right: "",
    animation: "animate-rotate-slow",
    delay: 0,
  },
  {
    size: "w-12 h-12 md:w-20 md:h-20",
    color: "bg-accent-yellow/50",
    top: "top-[75%]",
    right: "right-[30%]",
    left: "",
    bottom: "",
    animation: "animate-rotate-medium",
    delay: 0.6,
  },
];

export function ColorfulOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-md ${orb.size} ${orb.color} ${orb.top} ${orb.left} ${orb.right} ${orb.bottom} ${orb.animation}`}
          style={{ willChange: "transform, opacity" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 1.2, delay: orb.delay, ease: "easeOut" },
          }}
        />
      ))}
      {/* Yamacs風：回転する円形フレーム */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border-2 border-accent/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full border-2 border-accent-yellow/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 right-[5%] w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full border-2 border-accent-coral/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[15%] left-[5%] w-[150px] h-[150px] md:w-[220px] md:h-[220px] rounded-full border-2 border-accent-pink/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
