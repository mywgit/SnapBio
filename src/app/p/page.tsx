"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BioRenderer } from "@/components/BioRenderer";
import { DEFAULT_PROFILE } from "@/lib/defaultProfile";
import { UserProfile } from "@/lib/types";

function PublicBioContent() {
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    try {
      // If data is in localStorage or URL
      const savedProfile = localStorage.getItem("snapbio_profile_v2");
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch {
      // Fallback to default
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
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
