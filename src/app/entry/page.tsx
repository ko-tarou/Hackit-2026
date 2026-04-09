"use client";

import Link from "next/link";
import EventForm from "./components/EventForm";

export default function EntryPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FFF5EE] to-white p-4 md:p-8">
            <main className="max-w-4xl mx-auto">
                {/* Back Link */}
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center text-[#FF6B35] hover:text-[#e55e2b] font-medium transition-colors">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        トップページに戻る
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="mb-4">
                        <p className="text-sm md:text-base text-[#cc5226] font-semibold tracking-wide">KIT Developers Hub</p>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-2 text-[#2d2d2d]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>HacKit 2026</h1>
                    <p className="text-lg md:text-xl text-[#b34720] font-medium mb-2">繋がる、創る、超えていく。</p>
                    <p className="text-[#cc5226] max-w-2xl mx-auto">プロジェクトの垣根を超えた交流型ハッカソン。金沢工業大学の14プロジェクトが連携し、1年生の早期スキルアップとコネクション形成、プロエンジニアとの共創を実現します。</p>
                </div>

                {/* Form */}
                <div className="bg-white bg-opacity-80 rounded-2xl shadow-xl p-6 md:p-10 border-4 border-[#FFD4B0]">
                    <EventForm />
                </div>

                {/* Footer Info */}
                <footer className="mt-12 text-center text-[#cc5226] text-sm">
                    <div className="mb-2">
                        <span>スケジュール: キックオフ 2026.07.25 | ハッキング 2026.08.01-02 | 最終発表 2026.08.03</span>
                    </div>
                    <div className="mb-2">
                        <Link href="/" className="underline hover:text-[#2d2d2d]">詳細情報はこちら</Link>
                    </div>
                    <div>
                        <span>ご質問は </span>
                        <a href="https://x.com/HacKit_KIT" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#2d2d2d]">@HacKit_KIT</a>
                        <span> までお問い合わせください。</span>
                    </div>
                </footer>
            </main>
        </div>
    );
}
