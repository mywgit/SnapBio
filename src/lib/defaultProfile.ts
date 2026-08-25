import { UserProfile } from "./types";

export const DEFAULT_PROFILE: UserProfile = {
  username: "alex_rivers",
  displayName: "Alex Rivers",
  bio: "🚀 Full-stack indie hacker & tech creator. Building micro-SaaS in public. Exploring React 19, AI agents & digital nomad life.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  themeId: "midnight",
  isVerified: true,
  customBadge: "Builder & Creator",
  location: "San Francisco / Remote",
  enableTipJar: true,
  tipJarTitle: "Buy me a coffee ☕",
  tipJarUrl: "https://buy.stripe.com/28EaEYg7f6T83sIcRQ0Ny00",
  removeWatermark: false,
  socialLinks: [
    { id: "1", platform: "x", url: "https://x.com/alexrivers" },
    { id: "2", platform: "github", url: "https://github.com/alexrivers" },
    { id: "3", platform: "youtube", url: "https://youtube.com/@alexrivers" },
    { id: "4", platform: "instagram", url: "https://instagram.com/alexrivers" },
    { id: "5", platform: "email", url: "mailto:alex@puretoolhub.com" },
  ],
  blocks: [
    {
      id: "b1",
      type: "link",
      title: "🔥 ToolHub Developer Matrix",
      subtitle: "100% in-browser privacy developer & file tools",
      url: "https://tool.lehuoliaoyu.com",
      isHighlighted: true,
      animation: "pulse",
    },
    {
      id: "b2",
      type: "link",
      title: "📊 CalcHub - Financial & Creator Calculators",
      subtitle: "Stripe fee solver, TikTok & YouTube revenue projections",
      url: "https://calc.puretoolhub.com",
      isHighlighted: false,
    },
    {
      id: "b3",
      type: "youtube",
      title: "🎬 My Latest YouTube Tech Breakdown",
      subtitle: "How we built an in-browser SaaS matrix",
      embedId: "dQw4w9WgXcQ", // Standard demo video ID
    },
    {
      id: "b4",
      type: "link",
      title: "📬 Join My Weekly Indie Hacker Newsletter",
      subtitle: "Zero spam, actionable SaaS metrics & tactics",
      url: "https://calc.puretoolhub.com/saas-mrr-calculator",
    },
  ],
};
