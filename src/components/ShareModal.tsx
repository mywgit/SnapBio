"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import confetti from "canvas-confetti";
import {
  X,
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink,
  Code,
  Sparkles,
} from "lucide-react";
import { useBio } from "@/context/BioContext";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const { profile, t, lang } = useBio();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const publicUrl = typeof window !== "undefined"
    ? `${window.location.origin}/p?u=${encodeURIComponent(profile.username || "creator")}`
    : `https://bio.puretoolhub.com/p?u=${encodeURIComponent(profile.username || "creator")}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQr = () => {
    const svg = document.getElementById("snapbio-qr-svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `${profile.username || "bio"}-qr-code.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Sparkles className="w-3 h-3" />
            <span>{t("freeForever")}</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {t("sharePublish")}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === "zh"
              ? "复制链接挂到你的 TikTok、Instagram、Twitter 主页上"
              : "Share your bio link across TikTok, Instagram, and X"}
          </p>
        </div>

        {/* Live URL Copy Box */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300">
            {t("copyShareLink")}
          </label>
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-950 border border-slate-800">
            <input
              type="text"
              readOnly
              value={publicUrl}
              className="flex-1 bg-transparent px-2 text-xs font-mono text-blue-400 focus:outline-none truncate select-all"
            />
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-blue-600/30"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t("copied") : lang === "zh" ? "复制" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col items-center space-y-3">
          <div className="p-3 bg-white rounded-2xl shadow-inner">
            <QRCodeSVG
              id="snapbio-qr-svg"
              value={publicUrl}
              size={140}
              level="H"
              includeMargin={false}
            />
          </div>
          <button
            onClick={handleDownloadQr}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t("downloadQr")}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{lang === "zh" ? "打开新窗口预览" : "Open in New Tab"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
