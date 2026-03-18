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
    name: "Science Project for Children",
    description: "大学生が小中高校生に向けて科学技術の出前講座を実施し、STEAMの楽しさや可能性を伝える活動をしています。学びを「体験」として届け、次世代の科学技術への興味関心を広げることを目指しています。",
    link: "https://sites.google.com/view/spfc-kit/"
  },
  {
    name: "情報セキュリティ・スキルアッププロジェクト",
    description: "初学者から、ホワイトハッカーへ。セキュリティ領域の基礎を互いに教え合いながら学ぶプロジェクトです！石川県警察との連携を通じて社会のセキュリティ意識の向上に寄与する活動にも取り組んでいます。",
    link: "https://www.kanazawa-it.ac.jp/nyusi/honor/program.html#security-up"
  },
  {
    name: "スマートフォンアプリプロジェクト",
    description: "スマホ・Webアプリケーション開発を行うプロジェクトです！様々な技術の勉強会や就活情報、成果物の共有なども行っています。実践的な開発経験を積みながら、一緒に成長できるコミュニティです！",
    link: "#"
  },
  {
    name: "ロボットプロジェクト",
    description: "夢考房ロボットプロジェクト Team_Roboconでは、NHK学生ロボコンへ向けたロボット作製を行っています。アプリ開発や画像認識など最先端技術を活用し、完全自動ロボットの開発を行っています。",
    link: "#"
  },
  {
    name: "IoAプロジェクト",
    description: "主にXR技術の活用に焦点を当て、実践に取り組んでいます。現在はVRによる、CAD・アニメーションソフト・ゲームエンジン、VRヘッドセット活用等の活動を各学生の専門分野に応じて柔軟に実施しています。",
    link: "https://www.kanazawa-it.ac.jp/nyusi/honor/program.html#ioa"
  },
  {
    name: "おもちゃ",
    description: "こどもが楽しく学び成長できる「おもちゃ」開発を行うプロジェクトです。幼稚園の要望をもとに様々なテーマで開発を進めています。完成したものは実際に施設で遊んでもらい、改良を重ねながら制作しています。",
    link: "https://www.kanazawa-it.ac.jp/nyusi/honor/program.html#toy"
  },
  {
    name: "DataDreamers",
    description: "夢考房AI・データサイエンスプロジェクトとして、AI・データサイエンスの技術を活用し、社会課題を解決できる人材の育成を目的として活動しています。複数の班に分かれてコンペティションへの参加や勉強会、アプリ開発などに取り組みスキル向上を目指しています。",
    link: "#"
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
      className="relative min-h-screen py-20 sm:py-32 md:py-48 px-4 sm:px-6 md:px-16 lg:px-24 bg-white overflow-hidden snap-start"
    >
      {/* 薄いグリッド */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#2d2d2d_1px,transparent_1px),linear-gradient(to_bottom,#2d2d2d_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />

      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="space-y-10">
            <FadeInText>
              <span className="text-xs sm:text-sm font-medium tracking-[0.3em] text-accent mb-4">About</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-base-dark leading-tight">
                Hackitとは？
              </h2>
            </FadeInText>

            <StaggerContainer staggerChildren={0.12} delayChildren={0.2}>
              <motion.div variants={staggerItemVariants} className="space-y-6">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-accent tracking-wider mb-2">主催</h3>
                  <p className="text-base sm:text-lg text-base-dark/90">
                    KIT Developers Hub
                    <span className="block text-sm sm:text-base mt-1 text-base-dark/70">
                      金沢工業大学の課外活動14プロジェクトが連携
                    </span>
                  </p>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-accent tracking-wider mb-2">目的</h3>
                  <ul className="space-y-2 text-sm sm:text-base text-base-dark/90">
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
                <p className="text-xs sm:text-sm font-medium text-accent tracking-wider mb-4">DevelopersHub参加団体</p>
                <div className="flex flex-wrap gap-2 sm:gap-3 min-w-0">
                  {PARTICIPATING_GROUPS.map((group, index) => (
                    <button
                      key={group.name}
                      onClick={() => handleGroupClick(index)}
                      className="inline-flex px-3 sm:px-4 py-1.5 sm:py-2 bg-base-dark/5 text-base-dark/80 text-xs sm:text-sm rounded-xl border border-base-dark/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-200 whitespace-nowrap cursor-pointer hover:scale-105"
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
            className="relative flex items-center justify-center min-h-[280px] sm:min-h-[320px] lg:min-h-[420px]"
            style={{ scale }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-[min(30vw,14rem)] sm:text-[min(25vw,14rem)] md:text-[min(20vw,14rem)] font-black text-base-dark/[0.06] select-none leading-none tracking-tighter"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              >
                14
              </motion.span>
            </div>
            <motion.div
              className="relative z-10 text-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-base-dark leading-none">
                14
              </span>
              <span className="block mt-2 text-xs sm:text-sm font-bold text-accent uppercase tracking-widest">
                DevelopersHub参加団体
              </span>
              <p className="mt-1 text-sm sm:text-base md:text-lg text-base-dark/70 max-w-[200px] sm:max-w-[240px] mx-auto">
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

            {/* カルーセル全体のコンテナ */}
            <div className="relative w-full flex items-center justify-center px-14 sm:px-0 sm:gap-4 md:gap-8">
              {/* 左ナビゲーションボタン */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevCard();
                }}
                className="absolute left-2 sm:static sm:flex-shrink-0 z-40 bg-white/70 hover:bg-white text-base-dark rounded-full p-1.5 sm:p-3 shadow-xl transition-all hover:scale-110"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>

              {/* カルーセルシーン */}
              <div 
                className="relative w-full max-w-[200px] xs:max-w-[240px] sm:max-w-md md:max-w-xl h-[340px] xs:h-[360px] sm:h-[420px] md:h-[460px] flex items-center justify-center"
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
                  const cellSize = typeof window !== 'undefined' && window.innerWidth < 640 ? 240 : 360; // カードの幅（レスポンシブ）
                  const theta = (360 / numberOfCells);
                  const cellAngle = theta * index;
                  // 円の半径を計算（1.5倍に拡大してスペースを確保）
                  const baseRadius = Math.round((cellSize / 2) / Math.tan(Math.PI / numberOfCells));
                  const radius = baseRadius * 1.5;
                  
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
                        width: typeof window !== 'undefined' && window.innerWidth < 640 ? '240px' : '360px',
                        transform: `translate(-50%, -50%) rotateY(${cellAngle}deg) translateZ(${radius}px)`,
                      }}
                    >
                      <motion.div
                        className="bg-white rounded-2xl shadow-2xl p-3 sm:p-6 h-[200px] sm:h-[280px] flex flex-col cursor-pointer overflow-hidden"
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
                        <h3 className="text-sm sm:text-xl font-bold text-base-dark mb-1.5 sm:mb-3 line-clamp-1">
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
                              className="flex-1 flex flex-col min-h-0"
                            >
                              <p className="text-[10px] leading-tight sm:text-sm sm:leading-relaxed text-base-dark/70 mb-2 sm:mb-4 flex-1 overflow-hidden line-clamp-3 sm:line-clamp-4">
                                {group.description}
                              </p>
                              
                              <a
                                href={group.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-sm bg-[#FFB380] text-white font-medium rounded-lg hover:bg-[#FFA366] transition-all duration-200 hover:scale-105 self-start shadow-md whitespace-nowrap"
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

                {/* インジケーター */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-40">
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

              {/* 右ナビゲーションボタン */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextCard();
                }}
                className="absolute right-2 sm:static sm:flex-shrink-0 z-40 bg-white/70 hover:bg-white text-base-dark rounded-full p-1.5 sm:p-3 shadow-xl transition-all hover:scale-110"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
