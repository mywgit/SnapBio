"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile, BioBlock, SocialLink, ThemeConfig } from "@/lib/types";
import { DEFAULT_PROFILE } from "@/lib/defaultProfile";
import { getTheme } from "@/lib/themes";
import { Language, DICTIONARY } from "@/lib/i18n";
import { supabase } from "@/lib/supabaseClient";

interface BioContextType {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  theme: ThemeConfig;
  setThemeId: (id: string) => void;
  // Blocks management
  addBlock: (type: BioBlock["type"]) => void;
  updateBlock: (id: string, updates: Partial<BioBlock>) => void;
  removeBlock: (id: string) => void;
  moveBlock: (id: string, direction: "up" | "down") => void;
  // Social Links management
  addSocialLink: (platform: SocialLink["platform"]) => void;
  updateSocialLink: (id: string, url: string) => void;
  removeSocialLink: (id: string) => void;
  // Supabase Auth & User
  user: User | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  signOut: () => Promise<void>;
  // Pro Status
  isPro: boolean;
  proEmail?: string;
  activatePro: (email: string) => void;
  deactivatePro: () => void;
  // Language & i18n
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  // Utilities
  resetProfile: () => void;
  loadProfile: (newProfile: UserProfile) => void;
}

const BioContext = createContext<BioContextType | undefined>(undefined);

const STORAGE_KEY = "snapbio_profile_v2";
const LANG_STORAGE_KEY = "snapbio_lang_v1";
const PRO_STORAGE_KEY = "snapbio_pro_license_v1";

export function BioProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [lang, setLangState] = useState<Language>("en");
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [proEmail, setProEmail] = useState<string | undefined>(undefined);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from LocalStorage, Supabase Auth, and URL params
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(STORAGE_KEY);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }

      // Only check user pro status via Supabase DB API
      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Language;
      if (savedLang && DICTIONARY[savedLang]) {
        setLangState(savedLang);
      } else {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("zh")) setLangState("zh");
        else if (browserLang.startsWith("es")) setLangState("es");
        else if (browserLang.startsWith("pt")) setLangState("pt");
        else if (browserLang.startsWith("de")) setLangState("de");
        else if (browserLang.startsWith("fr")) setLangState("fr");
        else if (browserLang.startsWith("ja")) setLangState("ja");
        else setLangState("en");
      }
    } catch {
      // Ignore localStorage errors
    }
    setIsHydrated(true);

    // Check Supabase Auth Session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        checkUserProStatus(session.user.email || "", session.user.id);
      } else {
        setIsPro(false);
        setProEmail(undefined);
        setProfile((prev) => ({ ...prev, removeWatermark: false }));
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        checkUserProStatus(session.user.email || "", session.user.id);
      } else {
        setUser(null);
        setIsPro(false);
        setProEmail(undefined);
        setProfile((prev) => ({ ...prev, removeWatermark: false }));
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUserProStatus = async (email: string, userId?: string) => {
    if (!email && !userId) {
      setIsPro(false);
      return;
    }

    try {
      // 1. Direct Supabase Query
      let query = supabase.from("profiles").select("is_pro, pro_tier, username");
      if (userId) {
        query = query.eq("user_id", userId);
      } else if (email) {
        const prefix = email.split("@")[0];
        query = query.or(`stripe_customer_email.ilike.${email},username.ilike.${prefix},username.ilike.${email}`);
      }

      const { data: dbData } = await query.limit(1);

      if (dbData && dbData.length > 0 && dbData[0].is_pro) {
        setIsPro(true);
        setProEmail(email);
        localStorage.setItem(PRO_STORAGE_KEY, JSON.stringify({ isPro: true, email }));
        setProfile((prev) => ({ ...prev, removeWatermark: true, customBadge: prev.customBadge || "PRO Member 💎" }));
        return;
      }

      // 2. Fallback to server API
      const params = new URLSearchParams();
      if (email) params.set("email", email);
      if (userId) params.set("userId", userId);

      const res = await fetch(`/api/verify-subscription?${params.toString()}`);
      const data = await res.json();
      if (data.isPro) {
        setIsPro(true);
        setProEmail(email);
        localStorage.setItem(PRO_STORAGE_KEY, JSON.stringify({ isPro: true, email }));
        setProfile((prev) => ({ ...prev, removeWatermark: true, customBadge: prev.customBadge || "PRO Member 💎" }));
      } else {
        setIsPro(false);
        setProEmail(undefined);
        localStorage.removeItem(PRO_STORAGE_KEY);
        setProfile((prev) => ({ ...prev, removeWatermark: false }));
      }
    } catch {
      setIsPro(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsPro(false);
    setProEmail(undefined);
    localStorage.removeItem(PRO_STORAGE_KEY);
    setProfile((prev) => ({ ...prev, removeWatermark: false }));
  };

  // Save to LocalStorage whenever profile changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Ignore quota exceeded
    }
  }, [profile, isHydrated]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
    } catch {}
  };

  const t = (key: string): string => {
    return DICTIONARY[lang]?.[key] || DICTIONARY.en[key] || key;
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      const sanitizedUpdates = { ...updates };
      // If user is not Pro, prevent setting removeWatermark
      if (!isPro && sanitizedUpdates.removeWatermark !== undefined) {
        sanitizedUpdates.removeWatermark = false;
      }
      return { ...prev, ...sanitizedUpdates };
    });
  };

  const setThemeId = (themeId: string) => {
    setProfile((prev) => ({ ...prev, themeId }));
  };

  const addBlock = (type: BioBlock["type"]) => {
    const newBlock: BioBlock = {
      id: "b_" + Date.now(),
      type,
      title:
        type === "link"
          ? "My Cool Project Link"
          : type === "youtube"
          ? "Watch My Video"
          : type === "header"
          ? "Featured Collection"
          : "New Block",
      subtitle: type === "link" ? "Click to explore" : undefined,
      url: type === "link" ? "https://example.com" : undefined,
      embedId: type === "youtube" ? "dQw4w9WgXcQ" : undefined,
      isHighlighted: false,
    };
    setProfile((prev) => ({
      ...prev,
      blocks: [newBlock, ...prev.blocks],
    }));
  };

  const updateBlock = (id: string, updates: Partial<BioBlock>) => {
    setProfile((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    }));
  };

  const removeBlock = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((b) => b.id !== id),
    }));
  };

  const moveBlock = (id: string, direction: "up" | "down") => {
    setProfile((prev) => {
      const idx = prev.blocks.findIndex((b) => b.id === id);
      if (idx === -1) return prev;
      if (direction === "up" && idx === 0) return prev;
      if (direction === "down" && idx === prev.blocks.length - 1) return prev;

      const newBlocks = [...prev.blocks];
      const targetIdx = direction === "up" ? idx - 1 : idx + 1;
      const temp = newBlocks[idx];
      newBlocks[idx] = newBlocks[targetIdx];
      newBlocks[targetIdx] = temp;

      return { ...prev, blocks: newBlocks };
    });
  };

  const addSocialLink = (platform: SocialLink["platform"]) => {
    const newSocial: SocialLink = {
      id: "s_" + Date.now(),
      platform,
      url:
        platform === "email"
          ? "mailto:hello@example.com"
          : `https://${platform}.com/yourhandle`,
    };
    setProfile((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, newSocial],
    }));
  };

  const updateSocialLink = (id: string, url: string) => {
    setProfile((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((s) =>
        s.id === id ? { ...s, url } : s
      ),
    }));
  };

  const removeSocialLink = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((s) => s.id !== id),
    }));
  };

  const activatePro = (email: string) => {
    setIsPro(true);
    setProEmail(email);
    localStorage.setItem(PRO_STORAGE_KEY, JSON.stringify({ isPro: true, email, activatedAt: new Date().toISOString() }));
    setProfile((prev) => ({ ...prev, removeWatermark: true, customBadge: prev.customBadge || "PRO Member 💎" }));

    // Send to Supabase DB backend
    fetch("/api/verify-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username: profile.username }),
    }).catch(() => {});
  };

  const deactivatePro = () => {
    setIsPro(false);
    setProEmail(undefined);
    localStorage.removeItem(PRO_STORAGE_KEY);
    setProfile((prev) => ({ ...prev, removeWatermark: false }));
  };

  const resetProfile = () => {
    setProfile(DEFAULT_PROFILE);
  };

  const loadProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const currentTheme = getTheme(profile.themeId);

  return (
    <BioContext.Provider
      value={{
        profile,
        setProfile,
        updateProfile,
        theme: currentTheme,
        setThemeId,
        addBlock,
        updateBlock,
        removeBlock,
        moveBlock,
        addSocialLink,
        updateSocialLink,
        removeSocialLink,
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        signOut,
        isPro,
        proEmail,
        activatePro,
        deactivatePro,
        lang,
        setLang,
        t,
        resetProfile,
        loadProfile,
      }}
    >
      {children}
    </BioContext.Provider>
  );
}

export function useBio() {
  const context = useContext(BioContext);
  if (!context) {
    throw new Error("useBio must be used within a BioProvider");
  }
  return context;
}
