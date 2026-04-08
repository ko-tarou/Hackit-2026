"use client";

import { FadeInText, StaggerContainer, staggerItemVariants } from "@/components/animations";
import { motion } from "framer-motion";
import { Users, Trophy, Shuffle, Coins, Briefcase, GraduationCap } from "lucide-react";

const RULES = [
  {
    icon: Users,
    title: "チーム参加（3~5人）",
    description: "仲間と協力してプロダクトを作り上げよう",
  },
  {
    icon: GraduationCap,
    title: "1年生が最低1人必要",
    description: "各チームに1年生を含めることが参加条件です",
  },
  {
    icon: Shuffle,
    title: "プロジェクト横断OK",
    description: "プロジェクトの垣根を超えたチーム編成が可能",
  },
  {
    icon: Coins,
    title: "賞金総額10万円",
    description: "優秀なプロダクトには賞金を贈呈します",
  },
  {
    icon: Briefcase,
    title: "企業メンターがサポート",
    description: "企業エンジニアがメンターとして技術支援します",
  },
  {
    icon: Trophy,
    title: "先輩が審査員",
    description: "卒業生・4年生の先輩が審査員を務めます",
  },
];

export function HackathonInfo() {
  return (
    <section
      id="hackathon"
      className="relative min-h-screen py-20 sm:py-32 md:py-48 px-4 sm:px-6 md:px-16 lg:px-24 bg-white overflow-hidden snap-start"
    >
      {/* 薄いグリッド */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#2d2d2d_1px,transparent_1px),linear-gradient(to_bottom,#2d2d2d_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Part A: ハッカソンとは？ */}
        <div className="mb-16 sm:mb-24">
          <FadeInText>
            <span className="text-xs sm:text-sm font-medium tracking-[0.3em] text-accent mb-4">
              Hackathon
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-base-dark leading-tight">
              ハッカソンとは？
            </h2>
          </FadeInText>

          <FadeInText delay={0.15}>
            <div className="mt-8 sm:mt-10 max-w-3xl">
              <p className="text-base sm:text-lg md:text-xl text-base-dark/80 leading-relaxed sm:leading-loose">
                ハッカソンとは、チームで短期間に集中してプロダクトを開発するイベントです。
                <br />
                プログラミングだけでなく、デザインやアイデアも大歓迎！初心者も経験者も一緒に楽しめます。
              </p>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base text-base-dark/60 leading-relaxed">
                Hackit 2026では、KIT DevelopersHubに所属する14プロジェクトのメンバーが
                プロジェクトの枠を超えてチームを組み、3日間で新しいプロダクトを生み出します。
              </p>
            </div>
          </FadeInText>
        </div>

        {/* Part B: 参加ルール */}
        <div>
          <FadeInText>
            <span className="text-xs sm:text-sm font-medium tracking-[0.3em] text-accent mb-4">
              Rules
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-dark leading-tight">
              参加ルール
            </h2>
          </FadeInText>

          <StaggerContainer
            staggerChildren={0.08}
            delayChildren={0.2}
            className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {RULES.map((rule) => {
              const Icon = rule.icon;
              return (
                <motion.div
                  key={rule.title}
                  variants={staggerItemVariants}
                  className="group relative rounded-2xl border border-base-dark/10 bg-white p-5 sm:p-6 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-base-dark mb-1">
                        {rule.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-base-dark/60 leading-relaxed">
                        {rule.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
