"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Check, ArrowRight, Wand2, User, Briefcase, Globe, Target, Flame } from "lucide-react";
import Link from "next/link";
import { useBio } from "@/context/BioContext";
import { useRouter } from "next/navigation";

interface BioTemplate {
  id: string;
  category: "indie" | "creator" | "aesthetic" | "coach" | "freelance";
  title: string;
  generate: (name: string, role: string, niche: string, cta: string) => string;
}

const TEMPLATES: BioTemplate[] = [
  {
    id: "indie-1",
    category: "indie",
    title: "SaaS Founder / Build in Public",
    generate: (name, role, niche, cta) =>
      `🚀 ${name || "Alex"} | ${role || "Indie Hacker"}\n🔨 Building micro-SaaS products in public\n💡 Sharing MRR milestones & startup lessons\n👇 ${cta || "Check my latest live apps"}`
  },
  {
    id: "indie-2",
    category: "indie",
    title: "AI & Tech Solopreneur",
    generate: (name, role, niche, cta) =>
      `⚡ ${role || "Full-Stack Dev & AI Creator"}\n🎯 Helping founders ship web apps in 48 hours\n📍 Remote everywhere\n👉 ${cta || "View my portfolio & code templates"}`
  },
  {
    id: "creator-1",
    category: "creator",
    title: "YouTube & Content Creator",
    generate: (name, role, niche, cta) =>
      `🎬 ${name || "Alex"} | ${niche || "Tech & Productivity"}\n🎥 New video every Thursday\n💌 20k+ weekly newsletter readers\n🎁 ${cta || "Get my free Notion dashboard below"}`
  },
  {
    id: "creator-2",
    category: "creator",
    title: "TikTok & Shorts Storyteller",
    generate: (name, role, niche, cta) =>
      `✨ Daily insights on ${niche || "AI tools & digital lifestyle"}\n☕ Based in NYC\n🤝 Business / Collabs: support@puretoolhub.com\n👇 ${cta || "Explore my curated tool stack"}`
  },
  {
    id: "aesthetic-1",
    category: "aesthetic",
    title: "Minimalist / Lifestyle Aesthetic",
    generate: (name, role, niche, cta) =>
      `🕊️ ${name || "alex"} ✦ ${niche || "daily lifestyle & visual diary"}\n🕯️ slow living, coffee & neutral tones\n🌿 let's create something timeless\n♡ ${cta || "my presets & favorite links"} ♡`
  },
  {
    id: "aesthetic-2",
    category: "aesthetic",
    title: "Visual Artist & Photographer",
    generate: (name, role, niche, cta) =>
      `🎞️ ${name || "Alex Rivers"} | Visuals & Street Photography\n📷 Leica & 35mm film archives\n📍 Tokyo / London\n⬇️ ${cta || "Book client sessions & view prints"}`
  },
  {
    id: "coach-1",
    category: "coach",
    title: "Fitness & Wellness Coach",
    generate: (name, role, niche, cta) =>
      `🏋️ Online Coach | ${niche || "Fat Loss & Muscle Building"}\n🔥 Helped 500+ busy professionals transform\n🏆 1-on-1 Personalized Coaching\n⚡ ${cta || "Claim your Free 7-Day Workout Plan"}`
  },
  {
    id: "coach-2",
    category: "coach",
    title: "Business & Growth Consultant",
    generate: (name, role, niche, cta) =>
      `📈 Scaled 3 brands to 7-figures\n💡 Teaching solopreneurs how to monetize their audience\n🎙️ Host of the Growth Podcast\n👇 ${cta || "Book a 1:1 strategy call"}`
  },
  {
    id: "freelance-1",
    category: "freelance",
    title: "Freelance UI/UX & Brand Designer",
    generate: (name, role, niche, cta) =>
      `🎨 ${name || "Alex"} | Senior Product & Brand Designer\n✨ Crafting high-converting SaaS interfaces\n🟢 Available for select Q3 client projects\n👉 ${cta || "View Case Studies & Rates"}`
  }
];

export function BioGenerator() {
  const [name, setName] = useState("Alex Rivers");
  const [role, setRole] = useState("Solo Founder & Designer");
  const [niche, setNiche] = useState("AI Productivity & SaaS");
  const [cta, setCta] = useState("Check out my live projects");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { updateProfile } = useBio();
  const router = useRouter();

  const filteredTemplates = selectedCategory === "all" 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === selectedCategory);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApplyToSnapBio = (bioText: string) => {
    updateProfile({
      displayName: name,
      bio: bioText,
    });
    router.push("/");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Hero */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Wand2 className="w-3.5 h-3.5" />
          <span>100% Free Social Bio Idea Generator (2026)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          High-Converting <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Social Bio Generator</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Generate irresistible, professional Instagram, TikTok, and Twitter bio copy tailored for your creator niche in seconds. Copy or apply directly to your SnapBio personal hub.
        </p>
      </div>

      {/* Input Form Panel */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Customize Your Bio Parameters:</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-indigo-400" /> Your Name / Handle:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rivers"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" /> Primary Role / Title:
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Indie Hacker & Designer"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-indigo-400" /> Niche / Topic:
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. SaaS, Photography, Fitness"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-indigo-400" /> Call to Action (CTA text):
            </label>
            <input
              type="text"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              placeholder="e.g. Grab my free starter guide"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs text-slate-400 font-medium">Filter Niche:</span>
          {[
            { id: "all", label: "All Categories" },
            { id: "indie", label: "🚀 Indie Hackers" },
            { id: "creator", label: "🎬 Creators & YouTubers" },
            { id: "aesthetic", label: "🕊️ Aesthetic & Visual" },
            { id: "coach", label: "🏋️ Coaches & Consultants" },
            { id: "freelance", label: "🎨 Freelancers & Designers" }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/30"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Bio Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map((template) => {
          const generatedBio = template.generate(name, role, niche, cta);
          const isCopied = copiedId === template.id;

          return (
            <div
              key={template.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between gap-4 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-xs font-bold text-indigo-300">{template.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium capitalize">
                  {template.category}
                </span>
              </div>

              {/* Bio Code Box */}
              <pre className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-900 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed select-all">
                {generatedBio}
              </pre>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleCopy(template.id, generatedBio)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isCopied
                      ? "bg-emerald-500 text-slate-950 font-extrabold shadow-lg"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/20"
                  }`}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? "Copied!" : "Copy Bio"}</span>
                </button>
                <button
                  onClick={() => handleApplyToSnapBio(generatedBio)}
                  className="py-2 px-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Apply to SnapBio</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA to SnapBio */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-wider">
            <Flame className="w-4 h-4 text-indigo-400" />
            <span>Turn your Bio into a high-converting storefront</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Build your Notion-Style Link in Bio Page for Free
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Take your new bio copy and showcase your links, tip jars, social profiles, and custom domain in one aesthetic studio.
          </p>
        </div>
        <Link
          href="/"
          className="shrink-0 px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-2xl text-sm font-bold shadow-xl shadow-indigo-950/50 flex items-center gap-2 transition-all hover:scale-105"
        >
          <span>Open SnapBio Studio</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
