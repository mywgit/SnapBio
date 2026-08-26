"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Check, Globe, Shield, Smartphone, Layers, ArrowUpRight, HelpCircle, ChevronDown, ChevronUp, Calculator, Wrench } from "lucide-react";
import { useBio } from "@/context/BioContext";

export function SeoEditorial() {
  const { lang } = useBio();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const isZh = lang === "zh";

  const faqs = [
    {
      q: isZh ? "SnapBio 相比传统 Linktree 有什么优势？" : "What makes SnapBio better than Linktree?",
      a: isZh
        ? "SnapBio 采用现代 Notion 模块化美学与玻璃拟态暗黑风格，免注册即刻在浏览器中体验 1:1 手机预览。同时提供 0 平台抽成打赏、8 套免费奢华主题，以及极低门槛的专属独立顶级域名（Custom Domain）全自动云端解析。"
        : "SnapBio combines modern Notion-style modular aesthetics with dark glassmorphism. You get instant 1:1 phone previews with zero login barriers, 0% platform commission on creator payouts, 8 luxury themes, and automated custom domain connection via Vercel edge infrastructure.",
    },
    {
      q: isZh ? "我可以将个人独立域名（如 bio.mysite.com）绑定到 SnapBio 吗？" : "Can I connect my own custom domain to SnapBio?",
      a: isZh
        ? "完全可以！SnapBio Pro 提供全自助 DNS 配置面板，只需在 Cloudflare 或域名服务商处添加一条 CNAME 解析记录，系统会在几秒钟内自动完成 SSL 证书签发与全网生效验证，实现 100% 纯净白标独立微官网。"
        : "Yes! SnapBio Pro offers a self-service DNS setup panel. Simply add a single CNAME record pointing to our edge server, and our system automatically verifies and provisions an SSL certificate in seconds for a pure white-label experience.",
    },
    {
      q: isZh ? "SnapBio 是否适合 Instagram、TikTok 和 YouTube 创作者？" : "Is SnapBio optimized for TikTok, Instagram, and YouTube creators?",
      a: isZh
        ? "是的！SnapBio 专为短视频与社交媒体创作者优化。支持嵌入可直接播放的 YouTube 视频播放器、社交媒体图标阵列、电子书/课程跳转卡片与粉丝打赏组件，极大提升主页点击率与粉丝转化率。"
        : "Absolutely! SnapBio is specifically tailored for social media bio links. You can embed playable YouTube videos, social media matrices, digital product promo cards, and tip jars to maximize follower conversion.",
    },
  ];

  return (
    <div className="mt-20 border-t border-slate-800/80 pt-16 space-y-16 max-w-5xl mx-auto px-4">
      {/* 3 Core Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-3 hover:border-slate-700 transition-all">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            {isZh ? "Notion 级模块化视觉" : "Notion-Inspired Aesthetic"}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isZh
              ? "告别千篇一律的丑陋按钮堆叠。8 套精心打造的高端主题，让你的个人品牌瞬间脱颖而出。"
              : "Move beyond generic button stacks. Choose from 8 luxury glassmorphism themes designed to turn visitors into loyal fans."}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-3 hover:border-slate-700 transition-all">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            {isZh ? "全自动顶级独立域名" : "Automated Custom Domains"}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isZh
              ? "支持一键绑定 bio.yourname.com，全球 CDN 毫秒级秒开，附带终身免费 HTTPS SSL 证书。"
              : "Connect your custom domain seamlessly with automatic SSL provisioning and lightning-fast global edge delivery."}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-3 hover:border-slate-700 transition-all">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            {isZh ? "0% 平台抽成与极速隐私" : "0% Take-Rate & Privacy"}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isZh
              ? "直接结算到个人 Stripe 账户，平台不抽一分钱。100% 浏览器本地计算，零隐私泄露。"
              : "Collect tips directly with 0% platform commissions. 100% in-browser client computation with complete privacy."}
          </p>
        </div>
      </div>

      {/* Competitor Alternative Index Links (SEO Booster) */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>{isZh ? "寻找更优秀的创作者主页方案？" : "Explore Top Competitor Alternatives (2026)"}</span>
          </h3>
          <span className="text-[11px] text-slate-400">
            {isZh ? "深度横向对比" : "In-depth comparisons"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/linktree-alternative"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all group"
          >
            <div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors block">
                Linktree Alternative
              </span>
              <span className="text-[10px] text-slate-400">
                {isZh ? "Linktree 最佳免费替代品" : "Free Notion-style vs Linktree"}
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
          </Link>

          <Link
            href="/bento-me-alternative"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all group"
          >
            <div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors block">
                Bento.me Alternative
              </span>
              <span className="text-[10px] text-slate-400">
                {isZh ? "更灵活的网格微官网" : "Instant modular grid bio"}
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
          </Link>

          <Link
            href="/beacons-ai-alternative"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all group"
          >
            <div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors block">
                Beacons.ai Alternative
              </span>
              <span className="text-[10px] text-slate-400">
                {isZh ? "无杂质轻量高转化" : "Clean & high converting"}
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
          </Link>
        </div>
      </div>

      {/* SEO FAQ Accordion */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-indigo-400" />
          <span>{isZh ? "关于 SnapBio 的常见问题" : "Frequently Asked Questions about SnapBio"}</span>
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-800 rounded-2xl bg-slate-900/40 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-5 py-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200 hover:text-white"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-blue-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/40 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Matrix Ecosystem Cross Links */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/30 via-slate-900 to-indigo-950/30 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300">
            {isZh ? "PureToolHub 矩阵互联生态" : "Explore The PureToolHub Ecosystem"}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">100% In-Browser</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://calc.puretoolhub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-blue-500/50 transition-all group"
          >
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors block">
                CalcHub - Creator & Business Calculators
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {isZh ? "测算 TikTok 创作者分成、YouTube RPM 与 Stripe 费率" : "Model TikTok Creator Rewards, YouTube AdSense & Stripe fees."}
              </span>
            </div>
          </a>

          <a
            href="https://tool.lehuoliaoyu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/50 transition-all group"
          >
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors block">
                ToolHub - Developer & Web Utilities
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {isZh ? "纯前端 JSON 格式化、JWT 解码与极客效率工具箱" : "Client-side JSON formatters, JWT debuggers, and crypto utilities."}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
