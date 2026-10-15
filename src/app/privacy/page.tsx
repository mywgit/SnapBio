import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | SnapBio",
  description:
    "SnapBio privacy policy detailing our 100% in-browser privacy guarantee, cookie disclosures, and data protection compliance.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
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
          <ShieldCheck className="w-3.5 h-3.5" /> Legal &amp; Privacy Compliance
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-400">
          Last updated: <span className="text-slate-200">October 15, 2026</span>
        </p>
      </div>

      <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-400" /> 1. In-Browser Privacy &amp; Local Storage
          </h2>
          <p>
            SnapBio (<code className="text-blue-300 bg-slate-900 px-1.5 py-0.5 rounded">https://bio.puretoolhub.com</code>) is built on a privacy-first foundation. While designing your link-in-bio page, all draft data, themes, and social links are stored directly inside your browser&apos;s local storage (localStorage). We do not harvest or sell your audience metrics or bio link structures.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-400" /> 2. Information We Collect
          </h2>
          <p>
            When you publish a public creator page (e.g. <code>/p/username</code>) or attach a custom domain, the profile data you explicitly choose to publish (display name, bio text, social media links) becomes publicly viewable on the internet as requested. We collect standard anonymous web server logs (IP address, user agent, timestamps) strictly for infrastructure security.
          </p>
        </section>

        <section className="space-y-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" /> 3. Third-Party Advertising &amp; Cookies
          </h2>
          <p>
            Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites. Users may opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Google Ads Settings
            </a>{" "}
            or{" "}
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              www.aboutads.info
            </a>.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-800 pt-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" /> 4. Contact Us
          </h2>
          <p>
            For privacy inquiries or profile deletion requests, contact us at:{" "}
            <a href="mailto:support@puretoolhub.com" className="text-blue-400 hover:underline">
              support@puretoolhub.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
