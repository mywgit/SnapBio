import React from "react";
import { Metadata } from "next";
import { getAlternativeBySlug } from "@/lib/alternativeData";
import { AlternativeLayout } from "@/components/AlternativeLayout";

const data = getAlternativeBySlug("bento-me-alternative")!;

export const metadata: Metadata = {
  title: data.title,
  description: data.metaDesc,
  alternates: {
    canonical: `https://bio.puretoolhub.com${data.path}`,
  },
  openGraph: {
    title: data.title,
    description: data.metaDesc,
    url: `https://bio.puretoolhub.com${data.path}`,
    siteName: "SnapBio",
    locale: "en_US",
    type: "website",
  },
};

export default function BentoAlternativePage() {
  return <AlternativeLayout data={data} />;
}
