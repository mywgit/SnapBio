"use client";

import React from "react";
import { Smartphone, ExternalLink, QrCode, Sparkles } from "lucide-react";
import { useBio } from "@/context/BioContext";
import { BioRenderer } from "./BioRenderer";

interface PhoneMockupProps {
  onOpenShare: () => void;
}

export function PhoneMockup({ onOpenShare }: PhoneMockupProps) {
  const { profile, t } = useBio();

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Top Floating Helper Bar */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-xl text-xs font-semibold text-slate-300">
        <span className="flex items-center gap-1.5 text-blue-400">
          <Smartphone className="w-4 h-4" /> {t("previewMobile")}
        </span>
        <span className="text-slate-700">|</span>
        <button
          onClick={onOpenShare}
          className="flex items-center gap-1 hover:text-white transition-colors text-slate-400 hover:text-blue-300"
        >
          <QrCode className="w-3.5 h-3.5" /> {t("scanQr")}
        </button>
      </div>

      {/* iPhone 16 Pro Frame */}
      <div className="relative w-[340px] sm:w-[375px] h-[720px] rounded-[52px] bg-[#1e293b] p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(59,130,246,0.15)] border-4 border-slate-700/60 ring-1 ring-white/10">
        {/* Dynamic Island Pill */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-30 flex items-center justify-between px-2.5 shadow-md">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
          <div className="w-2 h-2 rounded-full bg-blue-500/80 animate-pulse" />
        </div>

        {/* Screen Bezel & Scroll Container */}
        <div className="w-full h-full rounded-[42px] overflow-hidden bg-slate-950 flex flex-col relative">
          {/* Status Bar */}
          <div className="h-10 w-full px-7 flex items-center justify-between text-[11px] font-bold text-slate-400 shrink-0 z-20 select-none pt-1">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 opacity-80">
              <span>5G</span>
              <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center">
                <div className="h-full w-full bg-slate-300 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Inner Bio Page Container */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <BioRenderer profile={profile} />
          </div>

          {/* Home Indicator Bar */}
          <div className="h-4 w-full flex items-center justify-center shrink-0 pb-1 z-20 select-none">
            <div className="w-32 h-1 bg-slate-500/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
