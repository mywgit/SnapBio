import React from "react";
import { Metadata } from "next";
import { FontGenerator } from "@/components/FontGenerator";

export const metadata: Metadata = {
  title: "Instagram Font Generator (2026) - Aesthetic Fancy Fonts for Bio & TikTok",
  description:
    "Free online Instagram and TikTok font generator. Convert plain text into 15+ aesthetic cursive, gothic, bold, and bubble Unicode fonts. 1-click copy & paste.",
  alternates: {
    canonical: "https://bio.puretoolhub.com/instagram-font-generator",
  },
  openGraph: {
    title: "Instagram Font Generator (2026) - Aesthetic Fancy Fonts for Bio",
    description:
      "Free aesthetic font generator for Instagram, TikTok, and creator bio links. 100% free with instant copy.",
    url: "https://bio.puretoolhub.com/instagram-font-generator",
  },
};

export default function InstagramFontPage() {
  return (
    <main className="min-h-screen py-10">
      <FontGenerator />
    </main>
  );
}
