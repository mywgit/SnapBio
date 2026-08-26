import React from "react";

export function StructuredData() {
  const jsonLdSoftware = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SnapBio",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "url": "https://bio.puretoolhub.com",
    "description": "100% Free Notion-Style Link-in-Bio and Personal Creator Micro-Site Builder with custom domain integration.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1280",
    },
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is SnapBio and is it really 100% free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SnapBio is a modern Notion-style link-in-bio builder designed for creators, indie hackers, and influencers. Core features including 8 luxury themes, YouTube video embeds, tip jars, and real-time mobile previews are 100% free forever.",
        },
      },
      {
        "@type": "Question",
        "name": "Can I connect my own custom domain (e.g., bio.myname.com)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! SnapBio Pro supports automated custom domain connection with instant Vercel SSL certificates and white-label clean rendering.",
        },
      },
      {
        "@type": "Question",
        "name": "How is SnapBio different from Linktree or Bento.me?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SnapBio features a clean Notion modular design, 0% platform commission on tips/payouts, sub-second edge load speed, and 100% in-browser privacy with zero intrusive ads.",
        },
      },
    ],
  };

  const jsonLdHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Create a Notion-Style Link in Bio Page in 30 Seconds",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Customize Profile & Bio",
        "text": "Upload your avatar, enter your display name, and write an engaging bio with verified badge.",
      },
      {
        "@type": "HowToStep",
        "name": "Add Links & Media Blocks",
        "text": "Add social icons (Instagram, YouTube, GitHub, X), interactive video embeds, and project cards.",
      },
      {
        "@type": "HowToStep",
        "name": "Choose a Luxury Theme & Publish",
        "text": "Select from 8 Notion, Cyberpunk, or Obsidian themes and publish with your unique short link or custom domain.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
      />
    </>
  );
}
