"use client";

import React from "react";
import Link from "next/link";
import { Zap, ShieldCheck, Coffee, Sparkles, ExternalLink } from "lucide-react";
import { useBio } from "@/context/BioContext";

export function Footer() {
  const { lang } = useBio();
  const isZh = lang === "zh";

  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950/90 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Col */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-2 text-white font-black text-base">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Zap className="w-3.5 h-3.5 fill-current" />
            </div>
            <span>SnapBio</span>
          </div>
          <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
            {isZh
              ? "100% 免费的 Notion 风格创作者多合一链接与个人主页生成器。无需注册、即刻生成、极速加载。"
              : "100% Free Notion-style creator link-in-bio platform. Instant in-browser customization, zero ads bloat, sub-second performance."}
          </p>
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>{isZh ? "100% 浏览器本地存储与隐私保护" : "100% In-Browser Privacy & Local Storage"}</span>
          </div>
        </div>

        {/* Cross-Link Column 1: CalcHub */}
        <div className="space-y-2">
          <span className="font-bold text-white uppercase tracking-wider block flex items-center gap-1.5">
            <span>{isZh ? "收益与商业计算器" : "Business Calculators"}</span>
            <span className="text-[9px] px-1 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">PRO</span>
          </span>
          <ul className="space-y-1.5 text-slate-300">
            <li>
              <a
                href="https://calc.puretoolhub.com/stripe-fee-calculator"
                target="_blank"
                rel="noopener"
                className="hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <span>{isZh ? "Stripe & PayPal 手续费计算器" : "Stripe & PayPal Fee Solver"}</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </li>
            <li>
              <a
                href="https://calc.puretoolhub.com/tiktok-money-calculator"
                target="_blank"
                rel="noopener"
                className="hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <span>{isZh ? "TikTok 创作者分成计算器" : "TikTok Creator Rewards"}</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </li>
            <li>
              <a
                href="https://calc.puretoolhub.com/saas-mrr-calculator"
                target="_blank"
                rel="noopener"
                className="hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <span>{isZh ? "SaaS MRR 增长模拟器" : "SaaS MRR & LTV Simulator"}</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </li>
          </ul>
        </div>

        {/* Cross-Link Column 2: ToolHub */}
        <div className="space-y-2">
          <span className="font-bold text-white uppercase tracking-wider block">
            {isZh ? "开发者极客工具箱" : "Developer Tools"}
          </span>
          <ul className="space-y-1.5 text-slate-300">
            <li>
              <a
                href="https://tool.lehuoliaoyu.com/json-formatter"
                target="_blank"
                rel="noopener"
                className="hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <span>JSON Formatter & Validator</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </li>
            <li>
              <a
                href="https://tool.lehuoliaoyu.com/jwt-debugger"
                target="_blank"
                rel="noopener"
                className="hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <span>JWT Token Debugger</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </li>
            <li>
              <a
                href="https://tool.lehuoliaoyu.com"
                target="_blank"
                rel="noopener"
                className="text-blue-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>{isZh ? "访问 ToolHub 全量工具 ➔" : "Explore ToolHub Matrix ➔"}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
        <p>© {new Date().getFullYear()} SnapBio. Powered by PureToolHub Network. 100% Free.</p>
        <div className="flex items-center gap-4">
          <a href="https://calc.puretoolhub.com" className="hover:text-slate-400 transition-colors">CalcHub</a>
          <a href="https://tool.lehuoliaoyu.com" className="hover:text-slate-400 transition-colors">ToolHub</a>
        </div>
      </div>
    </footer>
  );
}
