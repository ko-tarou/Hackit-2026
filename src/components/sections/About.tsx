"use client";

import { FadeInText, StaggerContainer, staggerItemVariants } from "@/components/animations";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GroupInfo {
  name: string;
  description: string;
  link: string;
}

const PARTICIPATING_GROUPS: GroupInfo[] = [
  {
    name: "スマプロ",
    description: "Google Developer Group on Campus KITは、Googleの技術を学び、共有し、実践するコミュニティです。Web開発、モバイルアプリ開発、機械学習など幅広い分野で活動しています。",
    link: "https://www.kanazawa-it.ac.jp/nyusi/honor/program.html#sphone"
  },
  {
    name: "フードクリエイション",
    description: "BusStopは、学生による学生のためのサービス開発プロジェクトです。大学生活をより便利で快適にするためのアプリケーションを開発しています。",
    link: "https://www.kanazawa-it.ac.jp/nyusi/honor/program.html#food8"
  },
  {
    name: "IoA",
    description: "Internet of Abilitiesプロジェクトは、IoT技術を活用して人々の能力を拡張し、より良い社会を実現することを目指しています。",
    link: "https://www.kanazawa-it.ac.jp/nyusi/honor/program.html#ioa"
  },
  {
    name: "Security Project",
    description: "セキュリティプロジェクトは、情報セキュリティの知識を深め、実践的なスキルを身につけることを目的としています。CTFやペネトレーションテストなどに取り組んでいます。",
    link: "https://www.kanazawa-it.ac.jp/nyusi/honor/program.html#security-up"
  },
  {
    name: "CirKit",
    description: "DataDreamersは、データサイエンスと機械学習に焦点を当てたプロジェクトです。データ分析、可視化、予測モデルの構築などを通じて実践的なスキルを磨いています。",
    link: "https://www.kanazawa-it.ac.jp/nyusi/honor/program.html#cirkit"
  },
  {
    name: "おもちゃ",
    description: "KITの多様な課外活動プロジェクトが参加しています。それぞれの団体が持つ専門性と情熱を結集し、Hackitを盛り上げていきます。",
    link: "https://www.kanazawa-it.ac.jp/nyusi/honor/program.html#toy"
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  const handleGroupClick = (index: number) => {
    setCurrentIndex(index);
    setRotation(-index * (360 / PARTICIPATING_GROUPS.length));
    setIsModalOpen(true);
  };

  const goToIndex = (targetIndex: number) => {
    const numberOfCells = PARTICIPATING_GROUPS.length;
    const anglePerCell = 360 / numberOfCells;
    const currentAngle = rotation;
    const targetAngle = -targetIndex * anglePerCell;
    
    // 最短距離を計算
    let diff = targetAngle - currentAngle;
    // -180 ~ 180 の範囲に正規化
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    
    setRotation(currentAngle + diff);
    setCurrentIndex(targetIndex);
  };

  const nextCard = () => {
    const nextIndex = (currentIndex + 1) % PARTICIPATING_GROUPS.length;
    goToIndex(nextIndex);
  };

  const prevCard = () => {
    const prevIndex = (currentIndex - 1 + PARTICIPATING_GROUPS.length) % PARTICIPATING_GROUPS.length;
    goToIndex(prevIndex);
  };

  return (
    <section
      id="about"
      className="relative min-h-screen py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-white overflow-hidden snap-start"
    >
      {/* 薄いグリッド */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#2d2d2d_1px,transparent_1px),linear-gradient(to_bottom,#2d2d2d_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />

      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="space-y-10">
            <FadeInText>
              <span className="text-sm font-medium tracking-[0.3em] text-accent mb-4">About</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-base-dark leading-tight">
                Hackitとは？
              </h2>
            </FadeInText>

            <StaggerContainer staggerChildren={0.12} delayChildren={0.2}>
              <motion.div variants={staggerItemVariants} className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-accent tracking-wider mb-2">主催</h3>
                  <p className="text-lg text-base-dark/90">
                    KIT Developers Hub
                    <span className="block text-base mt-1 text-base-dark/70">
                      金沢工業大学の課外活動14プロジェクトが連携
                    </span>
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-accent tracking-wider mb-2">目的</h3>
                  <ul className="space-y-2 text-base-dark/90">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>プロジェクトの垣根を超えた交流</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>1年生の早期スキルアップとコネクション形成</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>プロエンジニアとの共創</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </StaggerContainer>

            <FadeInText delay={0.2}>
              <div className="pt-6 border-t border-base-dark/10">
                <p className="text-sm font-medium text-accent tracking-wider mb-4">参加団体</p>
                <div className="flex flex-wrap gap-3 min-w-0">
                  {PARTICIPATING_GROUPS.map((group, index) => (
                    <button
                      key={group.name}
                      onClick={() => handleGroupClick(index)}
                      className="inline-flex px-4 py-2 bg-base-dark/5 text-base-dark/80 text-sm rounded-xl border border-base-dark/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-200 whitespace-nowrap cursor-pointer hover:scale-105"
                    >
                      {group.name}
                    </button>
                  ))}
                </div>
              </div>
            </FadeInText>
          </div>

          {/* 右: 14をインフォグラフィックとして大きく・背景に溶け込ませる */}
          <motion.div
            className="relative flex items-center justify-center min-h-[320px] lg:min-h-[420px]"
            style={{ scale }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-[min(20vw,14rem)] font-black text-base-dark/[0.06] select-none leading-none tracking-tighter"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              >
                14
              </motion.span>
            </div>
            <motion.div
              className="relative z-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="block text-7xl md:text-8xl lg:text-9xl font-black text-base-dark leading-none">
                14
              </span>
              <span className="block mt-2 text-sm font-bold text-accent uppercase tracking-widest">
                参加団体
              </span>
              <p className="mt-1 text-base md:text-lg text-base-dark/70 max-w-[240px] mx-auto">
                KITの課外活動プロジェクトが連携
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 3Dカルーセルモーダル */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-hidden"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 z-50 text-white/70 hover:text-white transition-colors bg-black/20 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>

            {/* カルーセルシーン */}
            <div 
              className="relative w-full max-w-xl h-[400px] flex items-center justify-center"
              style={{ perspective: '1200px' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* カルーセルコンテナ - 全体を回転 */}
              <motion.div
                key={`carousel-${isModalOpen}`}
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ rotateY: rotation }}
                animate={{
                  rotateY: rotation,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                }}
              >
                {PARTICIPATING_GROUPS.map((group, index) => {
                  const numberOfCells = PARTICIPATING_GROUPS.length;
                  const cellSize = 360; // カードの幅
                  const theta = (360 / numberOfCells);
                  const cellAngle = theta * index;
                  // 円の半径を計算
                  const radius = Math.round((cellSize / 2) / Math.tan(Math.PI / numberOfCells));
                  
                  // 現在のカードが正面かどうか
                  const isCurrent = index === currentIndex;

                  return (
                    <div
                      key={group.name}
                      className="absolute"
                      style={{
                        transformStyle: 'preserve-3d',
                        left: '50%',
                        top: '50%',
                        width: '360px',
                        transform: `translate(-50%, -50%) rotateY(${cellAngle}deg) translateZ(${radius}px)`,
                      }}
                    >
                      <motion.div
                        className="bg-white rounded-2xl shadow-2xl p-6 h-[220px] flex flex-col cursor-pointer"
                        animate={{
                          opacity: isCurrent ? 1 : 0.3,
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isCurrent) {
                            goToIndex(index);
                          }
                        }}
                      >
                        <h3 className="text-xl font-bold text-base-dark mb-3">
                          {group.name}
                        </h3>
                        
                        <AnimatePresence mode="wait">
                          {isCurrent && (
                            <motion.div
                              key={`content-${index}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                              className="flex-1 flex flex-col"
                            >
                              <p className="text-sm text-base-dark/70 leading-relaxed mb-4 flex-1">
                                {group.description}
                              </p>
                              
                              <a
                                href={group.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-[#FFB380] text-white font-medium rounded-lg hover:bg-[#FFA366] transition-all duration-200 hover:scale-105 self-start shadow-md"
                              >
                                詳しく見る →
                              </a>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>

              {/* ナビゲーションボタン */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevCard();
                }}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white text-base-dark rounded-full p-3 shadow-xl transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextCard();
                }}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white text-base-dark rounded-full p-3 shadow-xl transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* インジケーター */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-40">
                {PARTICIPATING_GROUPS.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'bg-white w-8' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
