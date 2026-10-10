import React from "react";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bio.puretoolhub.com/#webapp",
        "name": "SnapBio",
        "url": "https://bio.puretoolhub.com",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "description":
          "Create a high-converting, aesthetic Notion-style link-in-bio page in 30 seconds. 100% free with 8 premium themes, real-time mobile preview, and custom domains.",
        "featureList": [
          "Notion-style aesthetic modular blocks",
          "Instant real-time mobile preview canvas",
          "Custom domain connection with automated SSL",
          "Zero platform commission on tip jar",
          "Instagram & TikTok aesthetic bio fonts generator",
        ],
      },
      {
        "@type": "Organization",
        "@id": "https://bio.puretoolhub.com/#organization",
        "name": "SnapBio Atelier",
        "url": "https://bio.puretoolhub.com",
        "logo": "https://bio.puretoolhub.com/favicon.ico",
        "sameAs": [
          "https://github.com/mywgit/SnapBio",
          "https://puretoolhub.com",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
