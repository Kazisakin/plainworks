import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { JsonLd, orgJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const manrope = localFont({
  src: [
    { path: "./fonts/Manrope-Regular.woff2", weight: "400" },
    { path: "./fonts/Manrope-Medium.woff2", weight: "500" },
    { path: "./fonts/Manrope-SemiBold.woff2", weight: "600" },
    { path: "./fonts/Manrope-Bold.woff2", weight: "700" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = { themeColor: "#0d0e10", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.homeTitle, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  keywords: ["Plainworks", "product studio", "AI automation", "business technology", "logistics technology", "smart hardware", "PrepLabel", "food prep label printer", "emerging markets", "Fredericton", "Canada"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_CA",
    url: site.url,
    title: site.homeTitle,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.homeTitle, description: site.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  formatDetection: { telephone: false, email: false, address: false },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={manrope.variable} data-scroll-behavior="smooth">
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) add attributes to <body> before React loads */}
      <body suppressHydrationWarning>
        <JsonLd data={[orgJsonLd, websiteJsonLd]} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
