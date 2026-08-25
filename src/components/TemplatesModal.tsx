"use client";

import React from "react";
import Image from "next/image";
import { X, Sparkles, Check } from "lucide-react";
import { useBio } from "@/context/BioContext";
import { UserProfile } from "@/lib/types";

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TEMPLATES: { name: string; nameZh: string; desc: string; descZh: string; profile: UserProfile }[] = [
  {
    name: "Tech Indie Hacker",
    nameZh: "科技独立开发者 (Alex)",
    desc: "Clean dark developer vibe with GitHub, YouTube & SaaS links",
    descZh: "极简暗黑极客风，带有 GitHub、YouTube 与 SaaS 演示卡片",
    profile: {
      username: "alex_builder",
      displayName: "Alex Builder",
      bio: "🚀 Building open-source micro-SaaS & developer tools. Next.js 16 + React 19 enthusiast.",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      themeId: "midnight",
      isVerified: true,
      customBadge: "Full-Stack Dev",
      location: "San Francisco / Remote",
      enableTipJar: true,
      tipJarTitle: "Buy me a coffee ☕",
      tipJarUrl: "https://buy.stripe.com/28EaEYg7f6T83sIcRQ0Ny00",
      socialLinks: [
        { id: "1", platform: "x", url: "https://x.com" },
        { id: "2", platform: "github", url: "https://github.com" },
        { id: "3", platform: "youtube", url: "https://youtube.com" },
      ],
      blocks: [
        { id: "t1", type: "link", title: "⚡ ToolHub Matrix", subtitle: "100% in-browser developer tools", url: "https://tool.lehuoliaoyu.com", isHighlighted: true },
        { id: "t2", type: "link", title: "📊 CalcHub Financial Suite", subtitle: "Creator & SaaS fee calculators", url: "https://calc.puretoolhub.com" },
      ],
    },
  },
  {
    name: "TikTok & Lifestyle Influencer",
    nameZh: "TikTok 潮流时尚博主 (Mia)",
    desc: "Dopamine sunset gradient with Instagram, TikTok & shop links",
    descZh: "多巴胺日落微光，适合穿搭、美妆与好物推荐",
    profile: {
      username: "mia_vance",
      displayName: "Mia Vance ✨",
      bio: "🌴 Daily fashion, skincare routines & aesthetic vlogs. Living between LA & Tokyo.",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
      themeId: "sunset",
      isVerified: true,
      customBadge: "Lifestyle & Style",
      location: "Los Angeles, CA",
      enableTipJar: true,
      tipJarTitle: "Support my content 💖",
      tipJarUrl: "https://buy.stripe.com/28EaEYg7f6T83sIcRQ0Ny00",
      socialLinks: [
        { id: "1", platform: "tiktok", url: "https://tiktok.com" },
        { id: "2", platform: "instagram", url: "https://instagram.com" },
        { id: "3", platform: "youtube", url: "https://youtube.com" },
      ],
      blocks: [
        { id: "m1", type: "link", title: "🛍️ My Amazon Favorite Outfits", subtitle: "Weekly updated wishlist", url: "https://amazon.com", isHighlighted: true },
        { id: "m2", type: "link", title: "💄 10-Step Morning Skincare Guide", subtitle: "Free PDF download", url: "https://calc.puretoolhub.com" },
      ],
    },
  },
  {
    name: "Cyberpunk DJ & Producer",
    nameZh: "电子音乐人 & DJ (NeonPulse)",
    desc: "Vibrant neon purple with Spotify & Soundcloud vibe",
    descZh: "高对比赛博霓虹，带有音乐专栏与演出购票链接",
    profile: {
      username: "neon_pulse",
      displayName: "NEON PULSE 🎧",
      bio: "⚡ Electronic Music Producer & Cyberpunk Sound Designer. New album dropping soon.",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      themeId: "cyberpunk",
      isVerified: true,
      customBadge: "Official Artist",
      location: "Berlin, DE",
      enableTipJar: true,
      tipJarTitle: "Buy me a drink 🍸",
      tipJarUrl: "https://buy.stripe.com/28EaEYg7f6T83sIcRQ0Ny00",
      socialLinks: [
        { id: "1", platform: "youtube", url: "https://youtube.com" },
        { id: "2", platform: "x", url: "https://x.com" },
        { id: "3", platform: "instagram", url: "https://instagram.com" },
      ],
      blocks: [
        { id: "np1", type: "link", title: "🔥 Stream My New Single on Spotify", subtitle: "Over 1M+ streams worldwide", url: "https://spotify.com", isHighlighted: true, animation: "pulse" },
        { id: "np2", type: "link", title: "🎟️ World Tour 2026 Tickets", subtitle: "Limited presale passes", url: "https://calc.puretoolhub.com" },
      ],
    },
  },
];

export function TemplatesModal({ isOpen, onClose }: TemplatesModalProps) {
  const { loadProfile, t, lang } = useBio();

  if (!isOpen) return null;

  const handleSelectTemplate = (templateProfile: UserProfile) => {
    loadProfile(templateProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Sparkles className="w-3 h-3" />
            <span>{t("presetTemplates")}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {lang === "zh" ? "挑选一套现成的设计师模板" : "Choose a Designer Creator Template"}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === "zh" ? "一键套用，秒级替换为自己的图片与链接" : "1-click clone and customize with your own avatar and links"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TEMPLATES.map((tmpl, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-4 group shadow-lg"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-700 shadow-md">
                  <Image
                    src={tmpl.profile.avatarUrl}
                    alt={tmpl.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    unoptimized
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {lang === "zh" ? tmpl.nameZh : tmpl.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                    {lang === "zh" ? tmpl.descZh : tmpl.desc}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleSelectTemplate(tmpl.profile)}
                className="w-full py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-500 text-blue-300 hover:text-white text-xs font-bold transition-all"
              >
                {t("useTemplate")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
