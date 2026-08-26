"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, Share2, Sparkles, LayoutTemplate } from "lucide-react";
import { useBio } from "@/context/BioContext";
import { LanguageSelector } from "./LanguageSelector";
import { ShareModal } from "./ShareModal";
import { ProUpgradeModal } from "./ProUpgradeModal";
import { TemplatesModal } from "./TemplatesModal";
import { AuthModal } from "./AuthModal";
import { User, LogOut } from "lucide-react";

import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const { t, isPro, user, isAuthModalOpen, setIsAuthModalOpen, signOut, lang } = useBio();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isProOpen, setIsProOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);

  // Do not render Header on public creator profile pages or custom domains
  if (pathname.startsWith("/p")) {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform border border-white/20">
              <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-white text-base tracking-tight flex items-center gap-1.5">
                Snap<span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Bio</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  FREE
                </span>
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">{t("siteTagline")}</span>
            </div>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Templates Trigger */}
            <button
              onClick={() => setIsTemplatesOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all hidden md:flex"
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t("templates")}</span>
            </button>

            {/* Pro Upgrade Trigger */}
            <button
              onClick={() => setIsProOpen(true)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isPro
                  ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 hover:scale-105"
                  : "bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/40 text-purple-300 hover:text-white"
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isPro ? "text-amber-400" : "text-pink-400"}`} />
              <span>{isPro ? "👑 PRO ACTIVE" : t("upgradePro")}</span>
            </button>

            {/* Share & Publish Trigger */}
            <button
              onClick={() => setIsShareOpen(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{t("sharePublish")}</span>
            </button>

            {/* Supabase User Account / Login Button */}
            {user ? (
              <div className="flex items-center gap-2 p-1 pl-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="font-semibold text-slate-300 max-w-[100px] truncate hidden sm:inline">
                  {user.email?.split("@")[0]}
                </span>
                <button
                  onClick={signOut}
                  title="Sign out"
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all"
              >
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span>{lang === "zh" ? "登录" : "Sign In"}</span>
              </button>
            )}

            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Modals */}
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
      <ProUpgradeModal isOpen={isProOpen} onClose={() => setIsProOpen(false)} />
      <TemplatesModal isOpen={isTemplatesOpen} onClose={() => setIsTemplatesOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
