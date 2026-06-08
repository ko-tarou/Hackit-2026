"use client";

import { FadeInText, StaggerContainer, staggerItemVariants } from "@/components/animations";
import { motion } from "framer-motion";
import Image from "next/image";

/** 公開時は true に変更するとスポンサー一覧UIが表示されます */
const SPONSORS_PUBLIC = true;

type Sponsor = {
  name: string;
  /**
   * ロゴ画像のパス（任意）。public/sponsors/ 配下に透過PNG/SVGを置き、
   * 例 "/sponsors/play.png" のように設定するとテキストの代わりにロゴが表示されます。
   * 未設定（undefined）の場合は企業名テキストを表示します。
   */
  logo?: string;
  /** スポンサー企業のWebサイトURL（任意） */
  url?: string;
};

type SponsorTier = {
  tier: string;
  tierEn: string;
  className: string;
  scroll: boolean;
  sponsors: Sponsor[];
};

const SPONSOR_TIERS: SponsorTier[] = [
  {
    tier: "プラチナスポンサー",
    tierEn: "Platinum",
    className: "w-56 h-28 md:w-72 md:h-36 flex-shrink-0",
    scroll: false,
    sponsors: [
      // logo: "/sponsors/play.png" のように設定するとロゴ表示に切り替わります
      { name: "PLAY" },
      { name: "DMM" },
      { name: "ULSコンサルティング" },
    ],
  },
  {
    tier: "ゴールドスポンサー",
    tierEn: "Gold",
    className: "w-40 h-20 md:w-52 md:h-26 flex-shrink-0",
    scroll: false,
    sponsors: [
      { name: "CyberAgent" },
    ],
  },
  {
    tier: "シルバースポンサー",
    tierEn: "Silver",
    className: "w-28 h-14 md:w-36 md:h-18 flex-shrink-0",
    scroll: false,
    sponsors: [
      { name: "チームラボ" },
      { name: "Beta Computing" },
      { name: "MIXI" },
      { name: "サイボウズ" },
      { name: "NeoRealX" },
    ],
  },
];

function SponsorCard({ sponsor, className }: { sponsor: Sponsor; className: string }) {
  const base = `rounded-xl bg-white/40 backdrop-blur-md border border-base-dark/10 flex items-center justify-center overflow-hidden ${className}`;

  const inner = sponsor.logo ? (
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      fill
      sizes="(max-width: 768px) 50vw, 25vw"
      className="object-contain p-4"
    />
  ) : (
    <span className="px-3 text-center font-semibold text-base-dark/80 text-sm md:text-base leading-tight break-words">
      {sponsor.name}
    </span>
  );

  // logo ありのときは Image の fill のため relative が必要
  const card = (
    <div className={`relative ${base}`}>{inner}</div>
  );

  if (sponsor.url) {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-[1.03]"
      >
        {card}
      </a>
    );
  }

  return card;
}

export function Sponsors() {
  return (
    <section
      id="sponsors"
      className={`relative px-4 sm:px-6 md:px-16 lg:px-24 bg-base overflow-hidden snap-start ${SPONSORS_PUBLIC ? "min-h-screen py-20 sm:py-32 md:py-48" : "py-16 sm:py-20"}`}
    >
      {/* 薄いグリッド */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#2d2d2d_1px,transparent_1px),linear-gradient(to_bottom,#2d2d2d_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <FadeInText className="mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-medium tracking-[0.3em] text-accent mb-4">スポンサー</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-base-dark">スポンサー</h2>
        </FadeInText>

        {SPONSORS_PUBLIC ? (
          <StaggerContainer staggerChildren={0.12} delayChildren={0.1}>
            <div className="space-y-14 md:space-y-20">
              {SPONSOR_TIERS.map(({ tier, tierEn, className, scroll, sponsors }) => (
                <motion.div key={tier} variants={staggerItemVariants}>
                  <p className="text-xs sm:text-sm font-bold text-base-dark/70 tracking-wider mb-3 sm:mb-4">{tier} <span className="text-base-dark/40 font-normal">({tierEn})</span></p>
                  {scroll ? (
                    <div className="overflow-x-auto -mx-6 md:-mx-16 px-6 md:px-16 scrollbar-hide">
                      <div className="flex gap-4 md:gap-6 items-center pb-2" style={{ width: "max-content" }}>
                        {sponsors.map((sponsor) => (
                          <SponsorCard key={sponsor.name} sponsor={sponsor} className={className} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-4 md:gap-6">
                      {sponsors.map((sponsor) => (
                        <SponsorCard key={sponsor.name} sponsor={sponsor} className={className} />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </StaggerContainer>
        ) : (
          <div className="relative overflow-hidden rounded-2xl h-[200px] sm:h-[240px]">
            {/* プラチナスポンサー相当のカードだけ薄く表示し、下でフェードアウト */}
            <div
              className="opacity-50 pointer-events-none absolute inset-0"
              style={{
                maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 90%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 90%)",
              }}
            >
              <div>
                <p className="text-xs sm:text-sm font-bold text-base-dark/70 tracking-wider mb-3 sm:mb-4">
                  {SPONSOR_TIERS[0].tier} <span className="text-base-dark/40 font-normal">({SPONSOR_TIERS[0].tierEn})</span>
                </p>
                <div className="flex flex-wrap gap-4 md:gap-6">
                  {SPONSOR_TIERS[0].sponsors.map((sponsor) => (
                    <SponsorCard key={sponsor.name} sponsor={sponsor} className={SPONSOR_TIERS[0].className} />
                  ))}
                </div>
              </div>
            </div>
            {/* 後日公開テキスト */}
            <FadeInText delay={0.15} className="absolute inset-0 flex items-center justify-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-base-dark tracking-tight drop-shadow-sm">
                後日公開
              </p>
            </FadeInText>
          </div>
        )}
      </div>
    </section>
  );
}
