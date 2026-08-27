"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Check, ArrowRight, Wand2, Type, Heart, ShieldCheck, Flame } from "lucide-react";
import Link from "next/link";
import { useBio } from "@/context/BioContext";
import { useRouter } from "next/navigation";

// Unicode Font Transformation Maps
const FONT_STYLES: { id: string; name: string; tag: string; transform: (text: string) => string }[] = [
  {
    id: "script-bold",
    name: "Cursive / Luxury Script",
    tag: "Aesthetic",
    transform: (text) => {
      const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const script = "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔩";
      return text.split("").map(c => {
        const idx = normal.indexOf(c);
        return idx !== -1 ? [...script][idx] : c;
      }).join("");
    }
  },
  {
    id: "gothic-bold",
    name: "Gothic / Fraktur",
    tag: "Dark Vibe",
    transform: (text) => {
      const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const gothic = "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟";
      return text.split("").map(c => {
        const idx = normal.indexOf(c);
        return idx !== -1 ? [...gothic][idx] : c;
      }).join("");
    }
  },
  {
    id: "double-struck",
    name: "Blackboard / Double-Struck",
    tag: "Clean Tech",
    transform: (text) => {
      const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const dbl = "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡";
      return text.split("").map(c => {
        const idx = normal.indexOf(c);
        return idx !== -1 ? [...dbl][idx] : c;
      }).join("");
    }
  },
  {
    id: "bold-sans",
    name: "Bold Sans-Serif",
    tag: "High CTR",
    transform: (text) => {
      const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const bld = "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵";
      return text.split("").map(c => {
        const idx = normal.indexOf(c);
        return idx !== -1 ? [...bld][idx] : c;
      }).join("");
    }
  },
  {
    id: "italic-sans",
    name: "Italic Minimalist",
    tag: "Notion Look",
    transform: (text) => {
      const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const itl = "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻";
      return text.split("").map(c => {
        const idx = normal.indexOf(c);
        return idx !== -1 ? [...itl][idx] : c;
      }).join("");
    }
  },
  {
    id: "bubble-circled",
    name: "Bubble / Circled",
    tag: "Cute & Playful",
    transform: (text) => {
      const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const bbl = "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨";
      return text.split("").map(c => {
        const idx = normal.indexOf(c);
        return idx !== -1 ? [...bbl][idx] : c;
      }).join("");
    }
  },
  {
    id: "small-caps",
    name: "Mini Small Caps",
    tag: "Trendy Bio",
    transform: (text) => {
      const normal = "abcdefghijklmnopqrstuvwxyz";
      const caps = "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ";
      return text.split("").map(c => {
        const idx = normal.indexOf(c.toLowerCase());
        return idx !== -1 ? caps[idx] : c;
      }).join("");
    }
  },
  {
    id: "monospace",
    name: "Monospace Hacker",
    tag: "Indie Dev",
    transform: (text) => {
      const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const mono = "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿";
      return text.split("").map(c => {
        const idx = normal.indexOf(c);
        return idx !== -1 ? [...mono][idx] : c;
      }).join("");
    }
  },
  {
    id: "aesthetic-stars",
    name: "Cyber Stars & Sparkles",
    tag: "Viral TikTok",
    transform: (text) => `✦ ˚｡⋆ ${text} ⋆｡˚ ✦`
  },
  {
    id: "hearts-cute",
    name: "Sweet Hearts Aesthetic",
    tag: "Romantic",
    transform: (text) => `♡ ˗ˏˋ ${text} ˎˊ˗ ♡`
  },
  {
    id: "brackets-minimal",
    name: "Japanese Aesthetic Brackets",
    tag: "Minimalist",
    transform: (text) => `【 ${text} 】`
  }
];

export function FontGenerator() {
  const [inputText, setInputText] = useState("Alex Rivers | Creator & Designer ✦ NYC");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { profile, updateProfile } = useBio();
  const router = useRouter();

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApplyToSnapBio = (fancyText: string) => {
    updateProfile({
      displayName: fancyText,
    });
    router.push("/");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>100% Free Instagram & TikTok Bio Font Generator (2026)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Aesthetic Bio <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Font Generator</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Type your bio text or name below to instantly convert it into 15+ aesthetic Unicode fonts. Copy & paste directly into Instagram, TikTok, Twitter, or your SnapBio link in bio page.
        </p>
      </div>

      {/* Main Input Box */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Type className="w-4 h-4 text-pink-400" />
            <span>Type Your Text or Bio Intro:</span>
          </label>
          <span className="text-xs text-slate-500">{inputText.length} characters</span>
        </div>
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your bio or headline..."
            className="w-full px-5 py-4 bg-slate-950/90 border border-slate-700 rounded-2xl text-lg font-medium text-white placeholder-slate-600 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all shadow-inner"
          />
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => setInputText("✨ Digital Creator & Designer | London")}
            className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
          >
            Sample: Creator Bio
          </button>
          <button
            onClick={() => setInputText("Building SaaS & AI Apps 🚀 NYC")}
            className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
          >
            Sample: Indie Hacker
          </button>
          <button
            onClick={() => setInputText("aesthetic vibes only 🕯️ coffee & books")}
            className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
          >
            Sample: Aesthetic Vibe
          </button>
        </div>
      </div>

      {/* Output Font Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FONT_STYLES.map((style) => {
          const transformed = style.transform(inputText || "Sample Text");
          const isCopied = copiedId === style.id;

          return (
            <div
              key={style.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/40 transition-all group flex flex-col justify-between gap-3 shadow-lg"
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-800/60 pb-2">
                <span className="text-xs font-semibold text-slate-300">{style.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-pink-300 font-medium">
                  {style.tag}
                </span>
              </div>

              {/* Converted Text Display */}
              <div className="py-2 px-3 bg-slate-950/60 rounded-xl border border-slate-900 min-h-[52px] flex items-center overflow-x-auto text-slate-100 text-base select-all">
                {transformed}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleCopy(style.id, transformed)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isCopied
                      ? "bg-emerald-500 text-slate-950 font-extrabold shadow-lg"
                      : "bg-pink-600 hover:bg-pink-500 text-white shadow-md shadow-pink-900/20"
                  }`}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? "Copied to Clipboard!" : "Copy Font"}</span>
                </button>
                <button
                  onClick={() => handleApplyToSnapBio(transformed)}
                  title="Apply directly to your SnapBio profile"
                  className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span className="hidden sm:inline">Use in Bio</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Funnel Banner to SnapBio */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-pink-950/30 via-purple-950/30 to-slate-900 border border-pink-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-300 uppercase tracking-wider">
            <Flame className="w-4 h-4 text-pink-400" />
            <span>Ready for your complete creator website?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Create a Notion-Style Link in Bio Page in 30 Seconds
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Combine your new custom font with 8 luxury themes, 1:1 real-time live preview, custom domain SSL support, and 0% platform commission. 100% Free forever.
          </p>
        </div>
        <Link
          href="/"
          className="shrink-0 px-6 py-3.5 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white rounded-2xl text-sm font-bold shadow-xl shadow-pink-950/50 flex items-center gap-2 transition-all hover:scale-105"
        >
          <span>Open SnapBio Studio</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* SEO Editorial & FAQ Guide */}
      <div className="pt-8 border-t border-slate-800/80 space-y-6 text-slate-400 text-xs sm:text-sm leading-relaxed">
        <h2 className="text-xl font-bold text-white">
          How to Use Fancy Fonts on Instagram, TikTok & Social Media (2026 Guide)
        </h2>
        <p>
          Instagram, TikTok, and Twitter do not natively allow changing fonts in your profile settings. However, Unicode contains thousands of special mathematical and alphabetic glyphs (like Script 𝓐, Gothic 𝕲, and Double-Struck 𝔻). When you copy text from our free **Instagram Font Generator**, social media apps treat these characters as standard Unicode text, allowing them to render beautifully across all iOS, Android, and desktop devices.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-1">
            <h3 className="font-bold text-slate-200">1. Type Your Text</h3>
            <p className="text-xs text-slate-400">Enter your name, profession, or bio slogan into the text box above.</p>
          </div>
          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-1">
            <h3 className="font-bold text-slate-200">2. One-Click Copy</h3>
            <p className="text-xs text-slate-400">Choose from 15+ aesthetic font styles and click the pink copy button.</p>
          </div>
          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-1">
            <h3 className="font-bold text-slate-200">3. Paste Anywhere</h3>
            <p className="text-xs text-slate-400">Paste directly into your Instagram Bio, TikTok profile, or SnapBio micro-site.</p>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <h3 className="text-base font-bold text-white">Frequently Asked Questions (FAQ)</h3>
          <div className="space-y-2">
            <details className="p-3 bg-slate-900/40 rounded-xl border border-slate-800 cursor-pointer">
              <summary className="font-semibold text-slate-300">Are these fonts compatible with all devices and iPhones?</summary>
              <p className="pt-2 text-xs text-slate-400">Yes! All generated fonts use standard Universal Unicode characters supported by modern iOS, Android, macOS, and Windows operating systems.</p>
            </details>
            <details className="p-3 bg-slate-900/40 rounded-xl border border-slate-800 cursor-pointer">
              <summary className="font-semibold text-slate-300">Is this font generator completely free?</summary>
              <p className="pt-2 text-xs text-slate-400">Yes, 100% free with unlimited copy operations and zero registration required.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
