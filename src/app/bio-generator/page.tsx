import React from "react";
import { Metadata } from "next";
import { BioGenerator } from "@/components/BioGenerator";

export const metadata: Metadata = {
  title: "TikTok & Instagram Bio Generator (2026) - Free AI Creator Bio Copy | SnapBio",
  description:
    "Free online TikTok & Instagram Bio generator (2026). Create catchy, aesthetic, high-converting Bio copy for TikTok, Instagram, Twitter, and LinkedIn profiles in seconds.",
  keywords: [
    "tiktok bio generator",
    "instagram bio generator",
    "social bio generator",
    "aesthetic bio generator",
    "bio generator for creators",
    "free bio generator 2026",
  ],
  alternates: {
    canonical: "https://bio.puretoolhub.com/bio-generator",
  },
  openGraph: {
    title: "TikTok & Instagram Bio Generator (2026) - Free AI Creator Bio Copy",
    description:
      "Generate high-converting, aesthetic Bio copy for TikTok, Instagram, and creator links in seconds. 100% free.",
    url: "https://bio.puretoolhub.com/bio-generator",
    siteName: "SnapBio",
    locale: "en_US",
    type: "website",
  },
};

export default function BioGeneratorPage() {
  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I create a high-converting TikTok Bio in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A high-converting TikTok Bio should clearly state who you are, what value you provide in one sentence, and include a clear Call-to-Action (CTA) pointing to your link-in-bio hub.",
        },
      },
      {
        "@type": "Question",
        "name": "What is the character limit for Instagram and TikTok bios?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Instagram allows up to 150 characters for your bio, while TikTok allows up to 80 characters. Our generator automatically crafts bios that fit these limits.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <BioGenerator />
    </main>
  );
}
