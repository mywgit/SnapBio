import type { Metadata } from "next";
import "./globals.css";
import { BioProvider } from "@/context/BioContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "SnapBio - 100% Free Notion-Style Link-in-Bio & Creator Hub (2026)",
  description:
    "Create a beautiful, high-converting Notion-style link-in-bio page in 30 seconds. Zero ads, instant real-time mobile preview, 8 premium themes, and 100% free.",
  metadataBase: new URL("https://bio.puretoolhub.com"),
  alternates: {
    canonical: "https://bio.puretoolhub.com",
  },
  openGraph: {
    title: "SnapBio - 100% Free Notion-Style Link-in-Bio",
    description:
      "Create your free creator bio link page with 8 luxury themes in 30 seconds.",
    url: "https://bio.puretoolhub.com",
    siteName: "SnapBio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#070a13] text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
        <BioProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </BioProvider>
      </body>
    </html>
  );
}
