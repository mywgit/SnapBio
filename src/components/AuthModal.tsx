"use client";

import React, { useState } from "react";
import { X, Sparkles, Mail, Check, LogIn, ShieldCheck, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useBio } from "@/context/BioContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { t, lang } = useBio();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      const e = err as Error;
      setErrorMsg(e.message || "Failed to sign in with Google");
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    try {
      setIsLoading(true);
      setErrorMsg("");
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
        },
      });

      if (error) throw error;
      setIsSent(true);
      setIsLoading(false);
    } catch (err: unknown) {
      const e = err as Error;
      setErrorMsg(e.message || "Failed to send magic link");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === "zh" ? "云端同步与账号" : "Cloud Sync & Account"}</span>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            {lang === "zh" ? "登录 SnapBio" : "Sign in to SnapBio"}
          </h2>

          <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
            {lang === "zh"
              ? "免记密码，1秒同步您的个人主页与 Pro 订阅特权"
              : "Passwordless 1-click sync for your bio page and Pro membership"}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center">
            {errorMsg}
          </div>
        )}

        {isSent ? (
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">
              {lang === "zh" ? "登录邮件已发送！" : "Magic Link Sent!"}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === "zh"
                ? `已发送免密登录链接到 ${email}，请点击邮件中的链接即可一键登录。`
                : `We've sent a magic login link to ${email}. Check your inbox to sign in instantly.`}
            </p>
            <button
              onClick={() => setIsSent(false)}
              className="text-xs text-blue-400 hover:underline pt-2 inline-block"
            >
              {lang === "zh" ? "使用其他邮箱" : "Try another email"}
            </button>
          </div>
        ) : (
          <div className="space-y-4 relative z-10">
            {/* Google 1-Click Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2.5 group hover:scale-[1.01]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{lang === "zh" ? "使用 Google 账号一键登录" : "Continue with Google"}</span>
            </button>

            <div className="flex items-center gap-3 text-slate-600 text-xs">
              <div className="flex-1 h-px bg-slate-800" />
              <span>{lang === "zh" ? "或使用邮箱免密登录" : "or email magic link"}</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Email Magic Link Form */}
            <form onSubmit={handleEmailLogin} className="space-y-3">
              <div className="space-y-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.name@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono text-[11px]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{isLoading ? (lang === "zh" ? "发送中..." : "Sending...") : (lang === "zh" ? "发送免密登录链接" : "Send Magic Link")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        <div className="pt-2 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>{lang === "zh" ? "100% 隐私保护 · 永不发送垃圾邮件" : "100% Privacy Protected · Zero Spam"}</span>
        </div>
      </div>
    </div>
  );
}
