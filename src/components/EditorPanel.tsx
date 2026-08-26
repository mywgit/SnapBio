"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Link as LinkIcon,
  Palette,
  Share2,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Coffee,
  CheckCircle2,
  Video,
  ExternalLink,
  Layers,
  Upload,
  Copy,
  RefreshCw,
  Globe,
  Check,
} from "lucide-react";
import { useBio } from "@/context/BioContext";
import { THEMES } from "@/lib/themes";
import { SocialLink } from "@/lib/types";

export function EditorPanel() {
  const {
    profile,
    updateProfile,
    theme,
    setThemeId,
    addBlock,
    updateBlock,
    removeBlock,
    moveBlock,
    addSocialLink,
    updateSocialLink,
    removeSocialLink,
    lang,
    t,
    isPro,
    user,
  } = useBio();

  const [activeTab, setActiveTab] = useState<"profile" | "links" | "themes" | "social">("profile");

  const [isSavingDomain, setIsSavingDomain] = useState(false);
  const [isCheckingDns, setIsCheckingDns] = useState(false);
  const [copiedDns, setCopiedDns] = useState(false);
  const [dnsInfo, setDnsInfo] = useState<{
    recordType: string;
    recordName: string;
    recommendedValue: string;
    isConfigured: boolean;
  } | null>(null);

  const checkDnsStatus = async (domain: string) => {
    if (!domain) return;
    setIsCheckingDns(true);
    try {
      const res = await fetch(`/api/domains?domain=${encodeURIComponent(domain)}`);
      const data = await res.json();
      if (data.recordType && data.recommendedValue) {
        setDnsInfo({
          recordType: data.recordType,
          recordName: data.recordName,
          recommendedValue: data.recommendedValue,
          isConfigured: Boolean(data.isConfigured),
        });
      }
    } catch {
      // Ignore
    } finally {
      setIsCheckingDns(false);
    }
  };

  useEffect(() => {
    if (profile.customDomain) {
      checkDnsStatus(profile.customDomain);
    }
  }, [profile.customDomain]);

  const handleSaveAndConnectDomain = async () => {
    if (!profile.customDomain) {
      alert(lang === "zh" ? "请输入要绑定的域名" : "Please enter a domain");
      return;
    }
    setIsSavingDomain(true);
    try {
      const res = await fetch("/api/domains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: profile.customDomain,
          userId: user?.id,
          email: user?.email,
          username: profile.username,
        }),
      });
      const data = await res.json();
      if (data.success) {
        await checkDnsStatus(profile.customDomain);
      } else {
        alert("Error: " + (data.error || "Failed to register domain"));
      }
    } catch {
      // Fallback
    } finally {
      setIsSavingDomain(false);
    }
  };

  const avatarPresets = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
  ];

  return (
    <div className="w-full bg-slate-900/70 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-md space-y-6">
      {/* Navigation Tabs */}
      <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs font-bold">
        <button
          onClick={() => setActiveTab("profile")}
          className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeTab === "profile"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{lang === "zh" ? "身份" : "Profile"}</span>
        </button>

        <button
          onClick={() => setActiveTab("links")}
          className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeTab === "links"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{lang === "zh" ? "内容" : "Links"}</span>
        </button>

        <button
          onClick={() => setActiveTab("themes")}
          className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeTab === "themes"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{lang === "zh" ? "主题" : "Themes"}</span>
        </button>

        <button
          onClick={() => setActiveTab("social")}
          className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeTab === "social"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Coffee className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{lang === "zh" ? "社交/赞助" : "Social"}</span>
        </button>
      </div>

      {/* Tab 1: Profile & Identity */}
      {activeTab === "profile" && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-300">{t("avatarImage")}</label>
              <span className="text-[11px] text-slate-400">
                {lang === "zh" ? "支持直接本地上传或填 URL" : "Upload local photo or paste URL"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Local File Upload Button */}
              <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 shrink-0">
                <Upload className="w-4 h-4" />
                <span>{lang === "zh" ? "本地上传照片" : "Upload Local Photo"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          updateProfile({ avatarUrl: event.target.result as string });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>

              {/* Or paste URL */}
              <input
                type="text"
                value={profile.avatarUrl.startsWith("data:") ? "" : profile.avatarUrl}
                onChange={(e) => updateProfile({ avatarUrl: e.target.value })}
                placeholder={profile.avatarUrl.startsWith("data:") ? (lang === "zh" ? "已使用本地上传头像 (或粘贴新 URL)" : "Local photo uploaded (or paste URL)") : t("avatarUrlPlaceholder")}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Quick stock presets */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-400">{lang === "zh" ? "官方预设头像：" : "Stock Avatars:"}</span>
              {avatarPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => updateProfile({ avatarUrl: preset })}
                  className="w-6 h-6 rounded-full overflow-hidden border border-slate-700 hover:scale-110 transition-transform"
                >
                  <img src={preset} alt="preset" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">{t("displayName")}</label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) => updateProfile({ displayName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">{t("username")}</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 text-xs font-bold">@</span>
                <input
                  type="text"
                  value={profile.username}
                  onChange={(e) => updateProfile({ username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "") })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">{t("customBadge")}</label>
              <input
                type="text"
                value={profile.customBadge || ""}
                onChange={(e) => updateProfile({ customBadge: e.target.value })}
                placeholder="e.g. Founder & Creator"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">{t("location")}</label>
              <input
                type="text"
                value={profile.location || ""}
                onChange={(e) => updateProfile({ location: e.target.value })}
                placeholder="e.g. San Francisco / Remote"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">{t("bioDescription")}</label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => updateProfile({ bio: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-3 pt-2">
            {/* Verified Badge */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-slate-200">{t("verifiedBadge")}</span>
              </div>
              <input
                type="checkbox"
                checked={profile.isVerified}
                onChange={(e) => updateProfile({ isVerified: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 cursor-pointer accent-blue-600"
              />
            </div>

            {/* Pro Feature 1: Remove Watermark Toggle */}
            <div className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
              isPro
                ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30"
                : "bg-slate-950/60 border-slate-800 opacity-80"
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <div>
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <span>{lang === "zh" ? "隐藏底部 SnapBio 平台水印" : "Remove SnapBio Branding"}</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-gradient-to-r from-purple-500 to-pink-500 text-white">PRO</span>
                  </span>
                  <p className="text-[10px] text-slate-400">
                    {lang === "zh" ? "100% 纯净个人品牌，主页不含任何第三方微标" : "100% white-label experience"}
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={Boolean(profile.removeWatermark)}
                disabled={!isPro}
                onChange={(e) => updateProfile({ removeWatermark: e.target.checked })}
                className="w-4 h-4 rounded text-purple-600 bg-slate-900 border-slate-700 cursor-pointer accent-purple-600 disabled:opacity-50"
              />
            </div>

            {/* Pro Feature 2: Custom Domain Connection & Self-Service DNS Card */}
            {isPro && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>{lang === "zh" ? "绑定个人顶级独立域名" : "Connect Custom Domain"}</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-blue-500 text-white">PRO</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={profile.customDomain || ""}
                    onChange={(e) => updateProfile({ customDomain: e.target.value.toLowerCase().trim() })}
                    placeholder="e.g. bio.yourname.com"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-blue-400 font-mono text-[11px] focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    disabled={isSavingDomain}
                    onClick={handleSaveAndConnectDomain}
                    className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold transition-all shrink-0 shadow-md shadow-blue-600/20 flex items-center gap-1.5"
                  >
                    {isSavingDomain ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                    <span>{lang === "zh" ? "保存并自动绑定" : "Save & Connect"}</span>
                  </button>
                </div>

                {/* Self-Service DNS Configuration Table */}
                {dnsInfo && (
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-300">
                        {lang === "zh" ? "📋 您的专属 DNS 解析配置表" : "Your DNS Configuration"}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          dnsInfo.isConfigured
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {dnsInfo.isConfigured ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            {lang === "zh" ? "已全网生效" : "Active & SSL Valid"}
                          </>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            {lang === "zh" ? "等待 DNS 解析生效" : "Pending DNS Verification"}
                          </>
                        )}
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[11px] font-mono border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                            <th className="pb-1.5 font-bold">Type</th>
                            <th className="pb-1.5 font-bold">Name (主机记录)</th>
                            <th className="pb-1.5 font-bold">Value (记录值)</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-200 divide-y divide-slate-800/50">
                          <tr>
                            <td className="py-2 font-bold text-blue-400">{dnsInfo.recordType}</td>
                            <td className="py-2 text-purple-300 font-bold">{dnsInfo.recordName}</td>
                            <td className="py-2 text-slate-300">
                              <div className="flex items-center gap-1.5">
                                <span className="bg-slate-950 px-2 py-1 rounded-md text-[10px] select-all border border-slate-800 break-all">
                                  {dnsInfo.recommendedValue}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(dnsInfo.recommendedValue);
                                    setCopiedDns(true);
                                    setTimeout(() => setCopiedDns(false), 2000);
                                  }}
                                  className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
                                  title="Copy"
                                >
                                  {copiedDns ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <p className="text-[10px] text-slate-400">
                        {lang === "zh"
                          ? "去您的域名 DNS 后台（如 Cloudflare / 阿里云）添加上述记录即可"
                          : "Add the record above at your DNS provider."}
                      </p>
                      <button
                        type="button"
                        onClick={() => checkDnsStatus(profile.customDomain || "")}
                        disabled={isCheckingDns}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold transition-all shrink-0"
                      >
                        <RefreshCw className={`w-3 h-3 ${isCheckingDns ? "animate-spin text-blue-400" : ""}`} />
                        <span>{lang === "zh" ? "检测状态" : "Check Status"}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Content Blocks & Links */}
      {activeTab === "links" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">{t("contentBlocks")}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => addBlock("link")}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20"
              >
                <Plus className="w-3.5 h-3.5" /> {t("addLink")}
              </button>
              <button
                onClick={() => addBlock("youtube")}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 text-xs font-bold transition-all"
              >
                <Video className="w-3.5 h-3.5" /> {lang === "zh" ? "YouTube" : "Video"}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {profile.blocks.map((block, idx) => (
              <div
                key={block.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative group"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-900 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-black text-slate-400 flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      {block.type === "youtube" ? "🎬 YouTube Video" : "🔗 Link Card"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveBlock(block.id, "up")}
                      disabled={idx === 0}
                      className="p-1 rounded text-slate-500 hover:text-white disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveBlock(block.id, "down")}
                      disabled={idx === profile.blocks.length - 1}
                      className="p-1 rounded text-slate-500 hover:text-white disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeBlock(block.id)}
                      className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={block.title}
                    onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                    placeholder="Link Card Title"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-blue-500"
                  />

                  {block.type === "link" && (
                    <>
                      <input
                        type="text"
                        value={block.url || ""}
                        onChange={(e) => updateBlock(block.id, { url: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500 font-mono text-[11px]"
                      />
                      <input
                        type="text"
                        value={block.subtitle || ""}
                        onChange={(e) => updateBlock(block.id, { subtitle: e.target.value })}
                        placeholder="Subtitle description (optional)"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 focus:outline-none focus:border-blue-500"
                      />
                    </>
                  )}

                  {block.type === "youtube" && (
                    <input
                      type="text"
                      value={block.embedId || ""}
                      onChange={(e) => updateBlock(block.id, { embedId: e.target.value.replace(/.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/, "$1") })}
                      placeholder="YouTube Video ID or Full URL (e.g. dQw4w9WgXcQ)"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:border-rose-500"
                    />
                  )}

                  {/* Highlight Pill Toggle */}
                  <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-400">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={block.isHighlighted || false}
                        onChange={(e) => updateBlock(block.id, { isHighlighted: e.target.checked })}
                        className="rounded text-blue-600 accent-blue-600"
                      />
                      <span>{lang === "zh" ? "发光高亮卡片" : "Highlight Card"}</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={block.animation === "pulse"}
                        onChange={(e) => updateBlock(block.id, { animation: e.target.checked ? "pulse" : "none" })}
                        className="rounded text-blue-600 accent-blue-600"
                      />
                      <span>{lang === "zh" ? "呼吸动效" : "Pulse Animation"}</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Themes */}
      {activeTab === "themes" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-300">{t("chooseTheme")}</span>
            <p className="text-[11px] text-slate-400">
              {lang === "zh" ? "8 套由专业设计师打造的高级 Notion 磨砂质感主题" : "Handcrafted Notion & Glassmorphism designer aesthetics"}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {THEMES.map((th) => {
              const isSelected = profile.themeId === th.id;
              return (
                <button
                  key={th.id}
                  onClick={() => setThemeId(th.id)}
                  className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden group flex flex-col justify-between h-28 ${
                    isSelected
                      ? "border-blue-500 ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/20"
                      : "border-slate-800 hover:border-slate-700 bg-slate-950/60"
                  }`}
                  style={{
                    backgroundColor: th.bgPage,
                  }}
                >
                  <div className="w-full space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: th.accentColor }}
                      />
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      )}
                    </div>
                    <div
                      className="w-full h-3 rounded-md"
                      style={{ backgroundColor: th.cardBg, border: `1px solid ${th.cardBorder}` }}
                    />
                    <div
                      className="w-3/4 h-3 rounded-md"
                      style={{ backgroundColor: th.cardBg, border: `1px solid ${th.cardBorder}` }}
                    />
                  </div>

                  <span
                    className="text-[11px] font-bold tracking-tight block truncate mt-2"
                    style={{ color: th.textColor }}
                  >
                    {lang === "zh" ? th.nameZh : th.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Social & Tip Jar */}
      {activeTab === "social" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Tip Jar Section */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                <Coffee className="w-4 h-4" />
                <span>{t("tipJar")}</span>
              </div>
              <input
                type="checkbox"
                checked={profile.enableTipJar}
                onChange={(e) => updateProfile({ enableTipJar: e.target.checked })}
                className="w-4 h-4 rounded text-amber-500 accent-amber-500 cursor-pointer"
              />
            </div>

            {profile.enableTipJar && (
              <div className="space-y-2 pt-2 border-t border-amber-500/20">
                <div className="space-y-1">
                  <label className="block text-[11px] text-amber-200/80 font-semibold">{t("tipJarTitle")}</label>
                  <input
                    type="text"
                    value={profile.tipJarTitle || ""}
                    onChange={(e) => updateProfile({ tipJarTitle: e.target.value })}
                    placeholder="Buy me a coffee ☕"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] text-amber-200/80 font-semibold">{t("tipJarUrl")}</label>
                  <input
                    type="text"
                    value={profile.tipJarUrl || ""}
                    onChange={(e) => updateProfile({ tipJarUrl: e.target.value })}
                    placeholder="https://buy.stripe.com/..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono text-[11px] focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Social Links List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">{t("socialLinks")}</span>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    addSocialLink(e.target.value as SocialLink["platform"]);
                    e.target.value = "";
                  }
                }}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="">{t("addSocial")}</option>
                <option value="x">X / Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
                <option value="github">GitHub</option>
                <option value="discord">Discord</option>
                <option value="telegram">Telegram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="email">Email</option>
                <option value="website">Personal Website</option>
              </select>
            </div>

            <div className="space-y-2">
              {profile.socialLinks.map((social) => (
                <div
                  key={social.id}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800"
                >
                  <span className="text-xs font-bold text-slate-400 w-24 uppercase truncate">
                    {social.platform}
                  </span>
                  <input
                    type="text"
                    value={social.url}
                    onChange={(e) => updateSocialLink(social.id, e.target.value)}
                    placeholder="https://..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono text-[11px] focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => removeSocialLink(social.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
