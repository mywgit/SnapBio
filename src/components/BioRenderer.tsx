"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, ExternalLink, Coffee, MapPin, Sparkles } from "lucide-react";
import { UserProfile, ThemeConfig, BioBlock } from "@/lib/types";
import { getTheme } from "@/lib/themes";
import { SocialIcon } from "./SocialIcons";

interface BioRendererProps {
  profile: UserProfile;
  isPublic?: boolean;
}

export function BioRenderer({ profile, isPublic = false }: BioRendererProps) {
  const theme: ThemeConfig = getTheme(profile.themeId);

  return (
    <div
      className="min-h-full w-full py-8 px-4 sm:px-6 flex flex-col items-center justify-between transition-colors duration-300 relative"
      style={{
        backgroundColor: theme.bgPage,
        backgroundImage: theme.bgGradient,
        color: theme.textColor,
      }}
    >
      {/* Top Header Profile Area */}
      <div className="w-full max-w-md flex flex-col items-center text-center space-y-4">
        {/* Avatar */}
        <div className="relative group">
          <div
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 shadow-2xl transition-transform duration-300 group-hover:scale-105 ${theme.avatarBorder}`}
          >
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.displayName}
                width={112}
                height={112}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center text-2xl font-bold text-slate-400">
                {profile.displayName.slice(0, 1) || "A"}
              </div>
            )}
          </div>

          {profile.isVerified && (
            <div
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 shadow-lg border-2 border-slate-950"
              title="Verified Creator"
            >
              <CheckCircle2 className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Display Name & Handle */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: theme.textColor }}>
              {profile.displayName || "Your Name"}
            </h1>
            {profile.customBadge && (
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-white/10 border border-white/15 backdrop-blur-sm flex items-center gap-1 text-blue-300">
                <Sparkles className="w-2.5 h-2.5" />
                {profile.customBadge}
              </span>
            )}
          </div>

          {profile.username && (
            <p className="text-xs font-semibold tracking-wide" style={{ color: theme.subtextColor }}>
              @{profile.username}
            </p>
          )}

          {profile.location && (
            <p className="text-[11px] flex items-center justify-center gap-1 opacity-80" style={{ color: theme.subtextColor }}>
              <MapPin className="w-3 h-3" /> {profile.location}
            </p>
          )}
        </div>

        {/* Bio Text */}
        {profile.bio && (
          <p
            className="text-xs sm:text-sm leading-relaxed max-w-sm font-normal px-2"
            style={{ color: theme.subtextColor }}
          >
            {profile.bio}
          </p>
        )}

        {/* Social Icons Bar */}
        {profile.socialLinks && profile.socialLinks.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            {profile.socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                style={{
                  backgroundColor: theme.cardBg,
                  border: `1px solid ${theme.cardBorder}`,
                  color: theme.textColor,
                }}
              >
                <SocialIcon platform={social.platform} className="w-4 h-4" />
              </a>
            ))}
          </div>
        )}

        {/* Tip Jar / Buy Me a Coffee Button */}
        {profile.enableTipJar && (
          <div className="w-full pt-1">
            <a
              href={profile.tipJarUrl || "https://buy.stripe.com/28EaEYg7f6T83sIcRQ0Ny00"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold transition-all duration-300 shadow-xl group border bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border-amber-500/40 text-amber-300 hover:scale-[1.02] hover:shadow-amber-500/20"
            >
              <Coffee className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>{profile.tipJarTitle || "Buy me a coffee ☕"}</span>
            </a>
          </div>
        )}

        {/* Block Cards Stream */}
        <div className="w-full space-y-3 pt-2">
          {profile.blocks.map((block: BioBlock) => {
            if (block.type === "youtube" && block.embedId) {
              return (
                <div
                  key={block.id}
                  className="w-full rounded-2xl overflow-hidden shadow-lg border p-3 space-y-2 text-left"
                  style={{
                    backgroundColor: theme.cardBg,
                    borderColor: theme.cardBorder,
                  }}
                >
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/50">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${block.embedId}`}
                      title={block.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  {block.title && (
                    <div className="px-1">
                      <h3 className="text-xs font-bold" style={{ color: theme.textColor }}>
                        {block.title}
                      </h3>
                      {block.subtitle && (
                        <p className="text-[11px]" style={{ color: theme.subtextColor }}>
                          {block.subtitle}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            if (block.type === "header") {
              return (
                <div key={block.id} className="pt-3 pb-1 text-center">
                  <h3
                    className="text-xs font-black uppercase tracking-widest"
                    style={{ color: theme.accentColor }}
                  >
                    {block.title}
                  </h3>
                </div>
              );
            }

            // Standard Link Card
            return (
              <a
                key={block.id}
                href={block.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full p-4 rounded-2xl flex items-center justify-between text-left transition-all duration-300 border hover:scale-[1.02] ${theme.buttonClass} ${
                  block.isHighlighted ? "ring-2 ring-blue-500/50" : ""
                } ${block.animation === "pulse" ? "animate-pulse-glow" : ""}`}
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: block.isHighlighted ? theme.accentColor : theme.cardBorder,
                }}
              >
                <div className="space-y-0.5 pr-2">
                  <h3 className="text-xs sm:text-sm font-bold" style={{ color: theme.textColor }}>
                    {block.title}
                  </h3>
                  {block.subtitle && (
                    <p className="text-[11px] leading-tight" style={{ color: theme.subtextColor }}>
                      {block.subtitle}
                    </p>
                  )}
                </div>
                <ExternalLink className="w-4 h-4 shrink-0 opacity-60 hover:opacity-100" style={{ color: theme.textColor }} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Viral Watermark Loop (Hidden for Pro / White-label users) */}
      {!profile.removeWatermark && !profile.customDomain && (
        <div className="pt-8 pb-4">
          <a
            href={isPublic ? "https://bio.puretoolhub.com" : "/"}
            target={isPublic ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border backdrop-blur-md opacity-75 hover:opacity-100 hover:scale-105"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.cardBorder,
              color: theme.textColor,
            }}
          >
            <span>⚡ Powered by <strong>SnapBio</strong> (Free)</span>
          </a>
        </div>
      )}
    </div>
  );
}
