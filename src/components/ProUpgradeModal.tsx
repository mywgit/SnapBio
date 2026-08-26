"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  X,
  Sparkles,
  Globe,
  EyeOff,
  BarChart3,
  Percent,
  Check,
  ShieldCheck,
  Mail,
} from "lucide-react";
import { useBio } from "@/context/BioContext";

interface ProUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProUpgradeModal({ isOpen, onClose }: ProUpgradeModalProps) {
  const { t, lang, isPro, proEmail, activatePro, deactivatePro } = useBio();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [showRestore, setShowRestore] = useState(false);
  const [restoreEmail, setRestoreEmail] = useState("");
  const [restoreSuccess, setRestoreSuccess] = useState(false);

  if (!isOpen) return null;

  const monthlyUrl = process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_URL || "https://buy.stripe.com/9B6cN6cV36T8d3idVU0Ny01";
  const yearlyUrl = process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_URL || "https://buy.stripe.com/6oUdRaaMV2CS1kAcRQ0Ny02";

  const handleStartTrial = () => {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.5 },
    });
    const targetUrl = billingCycle === "yearly" ? yearlyUrl : monthlyUrl;
    window.open(targetUrl, "_blank");
  };

  const handleRestore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restoreEmail || !restoreEmail.includes("@")) return;
    activatePro(restoreEmail);
    setRestoreSuccess(true);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
      setRestoreSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-400 border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isPro ? "SNAPBIO PRO ACTIVE 👑" : "SNAPBIO PRO"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isPro ? (lang === "zh" ? "您已是 Pro 尊贵会员" : "You're a Pro Member!") : t("proFeaturesTitle")}
          </h2>

          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {isPro
              ? (lang === "zh" ? `已关联邮箱：${proEmail || "已激活"}` : `Linked email: ${proEmail || "Active"}`)
              : (lang === "zh"
                  ? "专为独立创作者、出海品牌与专业博主打造的高阶特权"
                  : "Built for top creators, digital nomads, and indie founders who care about branding")}
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-3 relative z-10">
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">{t("proFeature1")}</h4>
              <p className="text-[11px] text-slate-400">
                {lang === "zh"
                  ? "直接绑定你自己购买的 .com 域名，免费自动配置 SSL 证书"
                  : "Connect your custom domain with free automatic Anycast SSL"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
              <EyeOff className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">{t("proFeature2")}</h4>
              <p className="text-[11px] text-slate-400">
                {lang === "zh"
                  ? "100% 纯白标模式，主页底部不显示任何平台水印广告"
                  : "100% white-label experience with zero platform badges"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">{t("proFeature3")}</h4>
              <p className="text-[11px] text-slate-400">
                {lang === "zh"
                  ? "查看每个链接的点击率、访客国家、设备与每日转化趋势"
                  : "Track daily CTR, country demographics, and referrer channels"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <Percent className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">{t("proFeature4")}</h4>
              <p className="text-[11px] text-slate-400">
                {lang === "zh"
                  ? "粉丝打赏与数字商品直连你的 Stripe 账户，平台零抽成"
                  : "Direct Stripe payout with 0% platform fee"}
              </p>
            </div>
          </div>
        </div>

        {/* If Already Pro: Show Pro Status & Manage */}
        {isPro ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 relative z-10">
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
              <Check className="w-4 h-4" />
              <span>{lang === "zh" ? "所有 Pro 特权已全部生效！" : "All Pro Features are Active!"}</span>
            </div>
            <p className="text-xs text-slate-400">
              {lang === "zh"
                ? "底部水印已自动隐藏，专属 PRO 徽标已点亮。"
                : "Watermark is hidden, custom domain and analytics unlocked."}
            </p>
            <button
              onClick={deactivatePro}
              className="text-[11px] text-slate-500 hover:text-rose-400 underline transition-colors"
            >
              {lang === "zh" ? "退出当前 Pro 会员状态" : "Deactivate on this device"}
            </button>
          </div>
        ) : (
          <>
            {/* Billing Cycle Switcher */}
            <div className="flex items-center justify-center p-1 bg-slate-950 border border-slate-800 rounded-2xl max-w-xs mx-auto relative z-10">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  billingCycle === "monthly"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {lang === "zh" ? "按月付 $5/月" : "Monthly $5/mo"}
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  billingCycle === "yearly"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>{lang === "zh" ? "按年付 $39/年" : "Yearly $39/yr"}</span>
                <span className="px-1 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-black">
                  -35%
                </span>
              </button>
            </div>

            {/* Pricing CTA */}
            <div className="pt-2 text-center space-y-3 relative z-10">
              <button
                onClick={handleStartTrial}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-black transition-all shadow-xl shadow-blue-600/30 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {billingCycle === "yearly"
                    ? (lang === "zh" ? "立即开通 Pro 年付会员 ($39/年)" : "Upgrade to Pro Yearly ($39/yr)")
                    : (lang === "zh" ? "立即开通 Pro 月付会员 ($5/月)" : "Upgrade to Pro Monthly ($5/mo)")}
                </span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {lang === "zh" ? "随时一键取消订阅" : "Cancel anytime"}
                </span>
                <span>•</span>
                <span>{lang === "zh" ? "Stripe 官方安全扣款" : "Stripe Secure Checkout"}</span>
              </div>
            </div>

            {/* Restore Pro Section */}
            <div className="pt-2 border-t border-slate-800/80 text-center relative z-10">
              {!showRestore ? (
                <button
                  onClick={() => setShowRestore(true)}
                  className="text-xs text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  {lang === "zh" ? "🔑 已经付款过？点击输入邮箱恢复 Pro 特权" : "Already subscribed? Restore with email"}
                </button>
              ) : (
                <form onSubmit={handleRestore} className="space-y-2 max-w-sm mx-auto">
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      required
                      value={restoreEmail}
                      onChange={(e) => setRestoreEmail(e.target.value)}
                      placeholder={lang === "zh" ? "输入在 Stripe 付款时的邮箱" : "Enter Stripe billing email"}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono text-[11px]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shrink-0"
                    >
                      {restoreSuccess ? <Check className="w-3.5 h-3.5" /> : (lang === "zh" ? "恢复" : "Restore")}
                    </button>
                  </div>
                  {restoreSuccess && (
                    <p className="text-[11px] text-emerald-400 font-semibold">
                      {lang === "zh" ? "✅ Pro 权限已成功恢复！" : "Pro access restored!"}
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Official Support Email */}
            <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5 relative z-10">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === "zh" ? "需要人工支持或订阅疑问？" : "Need help with subscription?"}</span>
              <a
                href="mailto:support@puretoolhub.com"
                className="text-blue-400 hover:text-blue-300 font-mono font-medium hover:underline"
              >
                support@puretoolhub.com
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
