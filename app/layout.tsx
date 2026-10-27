import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.name}` },
  description: "Plainworks builds products that upgrade the systems businesses already run, so they work faster and sell more.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
