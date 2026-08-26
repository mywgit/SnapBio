"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Smartphone, Edit3, Share2, Layers, Zap } from "lucide-react";
import { useBio } from "@/context/BioContext";
import { EditorPanel } from "@/components/EditorPanel";
import { PhoneMockup } from "@/components/PhoneMockup";
import { ShareModal } from "@/components/ShareModal";
import PublicBioPage from "./p/page";

export default function HomePage() {
  const { t, lang } = useBio();
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCustomDomain, setIsCustomDomain] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname.toLowerCase();
      const isMain =
        host === "bio.puretoolhub.com" ||
        host === "localhost" ||
        host.includes("127.0.0.1") ||
        host.endsWith("vercel.app");
      if (!isMain) {
        setIsCustomDomain(true);
      }
    }
  }, []);

  if (isCustomDomain) {
    return <PublicBioPage />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Mobile Tab Switcher (Visible only on < lg screens) */}
      <div className="lg:hidden flex items-center justify-center">
        <div className="grid grid-cols-2 p-1 bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xs shadow-lg">
          <button
            onClick={() => setMobileTab("edit")}
            className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === "edit"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{lang === "zh" ? "可视化编辑" : "Editor"}</span>
          </button>
          <button
            onClick={() => setMobileTab("preview")}
            className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === "preview"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{lang === "zh" ? "手机实时预览" : "Preview"}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Editor Workspace (7 Cols on Desktop) */}
        <div
          className={`lg:col-span-7 space-y-6 ${
            mobileTab === "preview" ? "hidden lg:block" : "block"
          }`}
        >
          {/* Header Banner */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{t("freeForever")}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === "zh" ? "定制你的 Notion 级个人主页" : "Design Your Creator Bio Page"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
              {t("tagline")}
            </p>
          </div>

          {/* Interactive Editor Panel */}
          <EditorPanel />
        </div>

        {/* Right Side: Sticky iPhone Mockup (5 Cols on Desktop) */}
        <div
          className={`lg:col-span-5 lg:sticky lg:top-24 flex justify-center ${
            mobileTab === "edit" ? "hidden lg:flex" : "flex"
          }`}
        >
          <PhoneMockup onOpenShare={() => setIsShareOpen(true)} />
        </div>
      </div>

      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </div>
  );
}
