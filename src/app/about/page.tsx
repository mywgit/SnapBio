import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ShieldCheck, ArrowLeft, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | SnapBio - Free Notion-Style Creator Bio Platform",
  description: "Learn about SnapBio: our mission to give creators 100% free, elegant Notion-style bio links without bloated monthly fees.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 space-y-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to SnapBio Studio
      </Link>

      <div className="space-y-4 border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> About SnapBio
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Empowering Creators with Elegant, Free Bio Links
        </h1>
        <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
          Built for Instagram, TikTok, YouTube, and X creators who want clean Notion aesthetics without recurring monthly subscription fees.
        </p>
      </div>

      <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Why SnapBio Exists</h2>
          <p>
            Legacy link-in-bio tools lock basic features—like custom domains, dark themes, and high-converting typography—behind expensive $10 to $30/month paywalls. Worse, free tiers often display obnoxious third-party branding banners.
          </p>
          <p>
            SnapBio solves this by providing a completely free, lightning-fast Notion-style builder with instant live mobile previews, 8 luxury themes, and automated DNS routing for custom domains.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h3 className="font-bold text-white">No Mandatory Registration</h3>
            <p className="text-xs text-slate-400">Design your page right in your browser. Export and customize instantly.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <Zap className="w-6 h-6 text-amber-400" />
            <h3 className="font-bold text-white">Sub-Second Load Times</h3>
            <p className="text-xs text-slate-400">Lightweight React + Tailwind CSS bundle optimized for 100/100 Core Web Vitals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
