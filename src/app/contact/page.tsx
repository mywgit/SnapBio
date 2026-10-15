import type { Metadata } from "next";
import Link from "next/link";
import { Mail, ArrowLeft, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | SnapBio Support",
  description: "Contact the SnapBio team for support, custom domain setup help, or feature suggestions.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
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
          <Mail className="w-3.5 h-3.5" /> Support &amp; Feedback
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contact SnapBio
        </h1>
        <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
          Need help configuring your custom domain DNS or have suggestions for new creator themes? We are here to help.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-sm">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-400" /> Direct Support Channels
        </h2>
        <div className="space-y-4 text-slate-300">
          <div>
            <span className="text-xs uppercase font-bold text-slate-400 block">Support Email</span>
            <a href="mailto:support@puretoolhub.com" className="text-base font-semibold text-blue-400 hover:underline">
              support@puretoolhub.com
            </a>
          </div>
          <div>
            <span className="text-xs uppercase font-bold text-slate-400 block">Response Time</span>
            <p className="text-xs text-slate-400">Within 24 to 48 business hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
