import type { Metadata } from "next";
import Link from "next/link";
import { Scale, ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | SnapBio",
  description: "SnapBio creator platform terms of service and acceptable use policy.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
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
          <Scale className="w-3.5 h-3.5" /> Terms &amp; Conditions
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-400">
          Last updated: <span className="text-slate-200">October 15, 2026</span>
        </p>
      </div>

      <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-400" /> 1. Acceptance &amp; Creator Conduct
          </h2>
          <p>
            By using SnapBio (<code className="text-blue-300 bg-slate-900 px-1.5 py-0.5 rounded">https://bio.puretoolhub.com</code>), you agree not to publish illegal content, malware, phishing links, hate speech, or defamatory material on your creator bio pages.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Free Service &amp; Availability</h2>
          <p>
            SnapBio is provided free of charge. While we strive for 99.9% uptime and sub-second global CDN delivery, we do not guarantee uninterrupted availability and are not liable for lost clicks or third-party platform changes.
          </p>
        </section>
      </div>
    </div>
  );
}
