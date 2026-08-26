"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, X, ShieldCheck, Zap, ChevronDown, ChevronUp, Sparkles, ArrowRight, Layers, Globe, Star } from "lucide-react";
import { AlternativePageData } from "@/lib/alternativeData";
import { useBio } from "@/context/BioContext";

interface AlternativeLayoutProps {
  data: AlternativePageData;
}

export function AlternativeLayout({ data }: AlternativeLayoutProps) {
  const { lang } = useBio();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const isZh = lang === "zh";
  const h1 = isZh ? data.h1Zh : data.h1;
  const badge = isZh ? data.badgeZh : data.badge;
  const subheading = isZh ? data.subheadingZh : data.subheading;
  const whyTitle = isZh ? data.whySwitchTitleZh : data.whySwitchTitle;
  const whyDesc = isZh ? data.whySwitchDescZh : data.whySwitchDesc;

  // Schema.org JSON-LD
  const jsonLdWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": isZh ? data.titleZh : data.title,
    "url": `https://bio.puretoolhub.com${data.path}`,
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "description": isZh ? data.metaDescZh : data.metaDesc,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map((faq) => ({
      "@type": "Question",
      "name": isZh ? faq.questionZh : faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": isZh ? faq.answerZh : faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {h1}
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {subheading}
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02]"
            >
              <span>{isZh ? "免费创建你的 Notion 级名片 ➔" : "Build Your Free Bio Page Now ➔"}</span>
            </Link>
          </div>
        </div>

        {/* Comparison Feature Table */}
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {isZh ? `SnapBio vs ${data.competitorName} 功能对决` : `SnapBio vs ${data.competitorName} Direct Comparison`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {isZh ? "公开透明的功能、定价与体验对比" : "Feature-by-feature transparent breakdown"}
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-2xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400">
                  <th className="py-4 px-4 sm:px-6 font-bold">{isZh ? "核心功能维度" : "Feature / Capability"}</th>
                  <th className="py-4 px-4 sm:px-6 font-extrabold text-blue-400 bg-blue-500/10">SnapBio</th>
                  <th className="py-4 px-4 sm:px-6 font-bold text-slate-400">{data.competitorName}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {data.comparisons.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-slate-200">
                      {isZh ? row.featureZh : row.feature}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-bold text-emerald-400 bg-blue-500/5">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{isZh ? row.snapbioZh : row.snapbio}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <X className="w-4 h-4 text-rose-400/80 shrink-0" />
                        <span>{isZh ? row.competitorZh : row.competitor}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Switch Editorial Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {whyTitle}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {whyDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">{isZh ? "独立顶级域名自动化" : "Custom Domain Automation"}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isZh ? "绑定 bio.yourdomain.com，全球 CDN 毫秒级分发与终身免费 SSL。" : "Connect your own branding with global CDN and automated SSL certs."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">{isZh ? "Notion 级极简美学" : "Notion Aesthetic"}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isZh ? "8 套精心打磨的暗黑玻璃拟态与极简主题，告别千篇一律的丑陋按钮堆叠。" : "8 luxury glassmorphism themes designed to elevate your personal brand."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Star className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">{isZh ? "0% 平台抽成" : "0% Platform Take-Rate"}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isZh ? "粉丝打赏与数字商品直连 Stripe，每一分钱 100% 进自己腰包。" : "Direct Stripe connection with zero platform intermediary cut."}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {isZh ? "常见问题解答 (FAQ)" : "Frequently Asked Questions"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {isZh ? "关于迁移与使用的关键解答" : "Everything you need to know about switching"}
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {data.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-800 rounded-2xl bg-slate-900/50 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-bold text-slate-200 hover:text-white"
                >
                  <span>{isZh ? faq.questionZh : faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-blue-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/40 pt-3">
                    {isZh ? faq.answerZh : faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/30 text-center space-y-4 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {isZh ? "准备好体验更高级的 Notion 风格个人主页了吗？" : "Ready to Build a High-Converting Notion Bio?"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            {isZh
              ? "无需信用卡，无需漫长注册。打开即用，30 秒即可定制并上线你的专属微官网。"
              : "100% free core tier. Zero coding required. Launch your personalized hub in 30 seconds."}
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-slate-950 font-black text-sm hover:bg-slate-100 transition-all shadow-lg hover:scale-105"
            >
              <span>{isZh ? "立即免费开始 ➔" : "Get Started Free ➔"}</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
