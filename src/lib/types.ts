export type BlockType =
  | "link"
  | "header"
  | "youtube"
  | "spotify"
  | "text"
  | "tipjar";

export interface BioBlock {
  id: string;
  type: BlockType;
  title: string;
  url?: string;
  subtitle?: string;
  icon?: string;
  isHighlighted?: boolean;
  animation?: "none" | "pulse" | "bounce" | "glow";
  embedId?: string; // YouTube Video ID or Spotify Track/Album URI
}

export interface SocialLink {
  id: string;
  platform:
    | "x"
    | "twitter"
    | "instagram"
    | "tiktok"
    | "youtube"
    | "github"
    | "discord"
    | "telegram"
    | "linkedin"
    | "email"
    | "website"
    | "twitch"
    | "xiaohongshu"
    | "bilibili"
    | "wechat";
  url: string;
}

export interface UserProfile {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  themeId: string;
  isVerified: boolean;
  customBadge?: string;
  location?: string;
  socialLinks: SocialLink[];
  blocks: BioBlock[];
  enableTipJar: boolean;
  tipJarTitle?: string;
  tipJarUrl?: string;
  removeWatermark?: boolean;
  customDomain?: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  nameZh: string;
  bgGradient: string;
  bgPage: string;
  cardBg: string;
  cardHoverBg: string;
  cardBorder: string;
  textColor: string;
  subtextColor: string;
  accentColor: string;
  buttonClass: string;
  isDark: boolean;
  avatarBorder: string;
}
