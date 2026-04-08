"use client";

import React, { useEffect, useState } from "react";
import useSettings from "../hooks/useSettings";

export default function DeadlineBanner() {
    const { settings } = useSettings();
    const [now, setNow] = useState<Date>(new Date());

    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    function parseSettingDate(s: typeof settings, key: string): Date | null {
        if (!s) return null;
        const v = (s as Record<string, unknown>)[key];
        if (!v) return null;
        const d = new Date(v as string);
        return isNaN(d.getTime()) ? null : d;
    }

    function renderDeadlineCountdown(target: Date, label: string) {
        const diff = Math.max(0, target.getTime() - now.getTime());
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        return (
            <div className="p-4 bg-sky-50 border border-sky-200 rounded text-center mb-4">
                <div className="text-sm text-slate-700 whitespace-pre-line">{label}</div>
                <div className="mt-2 text-xl font-mono">{`${days}日 ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}</div>
                <p className="mt-2 text-sm text-slate-600">締切日時: {target.toLocaleString("ja-JP", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
            </div>
        );
    }

    const eventEnd = parseSettingDate(settings, "eventApplicationEnd");

    const showEventEnd = eventEnd && now < eventEnd;

    return (
        <div>
            {showEventEnd && renderDeadlineCountdown(eventEnd!, `参加募集中。\n締切までの残り時間：`)}
        </div>
    );
}
