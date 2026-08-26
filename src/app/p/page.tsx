"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BioRenderer } from "@/components/BioRenderer";
import { DEFAULT_PROFILE } from "@/lib/defaultProfile";
import { UserProfile } from "@/lib/types";

import { supabase } from "@/lib/supabaseClient";

import { getTheme } from "@/lib/themes";

function PublicBioContent() {
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    const u = searchParams.get("u");
    let domain = searchParams.get("domain");

    if (!domain && typeof window !== "undefined") {
      const host = window.location.hostname.toLowerCase();
      const isMain =
        host === "bio.puretoolhub.com" ||
        host === "localhost" ||
        host.includes("127.0.0.1") ||
        host.endsWith("vercel.app");
      if (!isMain) {
        domain = host;
      }
    }

    if (u || domain) {
      let query = supabase.from("profiles").select("*");
      if (domain) {
        query = query.eq("custom_domain", domain);
      } else if (u) {
        query = query.eq("username", u);
      }

      query.limit(1).then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const row = data[0];
          if (row.bio_data && Object.keys(row.bio_data).length > 0) {
            setProfile({
              ...row.bio_data,
              removeWatermark: Boolean(row.is_pro),
            });
          } else {
            setProfile((prev) => ({
              ...prev,
              username: row.username || prev.username,
              displayName: row.display_name || row.username || prev.displayName,
              customDomain: row.custom_domain,
              removeWatermark: Boolean(row.is_pro),
            }));
          }
        }
      });
    } else {
      try {
        const savedProfile = localStorage.getItem("snapbio_profile_v2");
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        }
      } catch {
        // Fallback to default
      }
    }
  }, [searchParams]);

  const theme = getTheme(profile.themeId);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center transition-colors duration-300"
      style={{
        backgroundColor: theme.bgPage,
        backgroundImage: theme.bgGradient,
      }}
    >
      <div className="w-full max-w-lg min-h-screen flex flex-col justify-between shadow-2xl">
        <BioRenderer profile={profile} isPublic={true} />
      </div>
    </div>
  );
}

export default function PublicBioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070a13] flex items-center justify-center text-slate-500 text-xs">Loading SnapBio...</div>}>
      <PublicBioContent />
    </Suspense>
  );
}
