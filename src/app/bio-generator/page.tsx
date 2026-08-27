import React from "react";
import { Metadata } from "next";
import { BioGenerator } from "@/components/BioGenerator";

export const metadata: Metadata = {
  title: "Social Bio Generator (2026) - Free Instagram, TikTok & Creator Bio Copy",
  description:
    "Generate high-converting, professional Bio copy for Instagram, TikTok, Twitter, and LinkedIn. 100% free with 1-click customization for founders, creators, and freelancers.",
  alternates: {
    canonical: "https://bio.puretoolhub.com/bio-generator",
  },
  openGraph: {
    title: "Social Bio Generator (2026) - Free Instagram, TikTok & Creator Bio Copy",
    description:
      "Generate high-converting Bio copy for Instagram, TikTok, and creator personal hubs in seconds. 100% free.",
    url: "https://bio.puretoolhub.com/bio-generator",
  },
};

export default function BioGeneratorPage() {
  return (
    <main className="min-h-screen py-10">
      <BioGenerator />
    </main>
  );
}
