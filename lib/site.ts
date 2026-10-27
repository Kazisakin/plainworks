// Site settings. On Vercel, these can be overridden in Project → Settings → Environment Variables.
export const site = {
  name: "Plainworks",
  legalName: "Plainworks",
  tagline: "Upgrade the systems you already run.",
  description:
    "Plainworks builds simple technology that upgrades the systems businesses already run, so they waste less time and sell more. Based in Fredericton, Canada, building for emerging markets.",
  city: "Fredericton, New Brunswick, Canada",
  locality: "Fredericton",
  region: "NB",
  country: "CA",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@plainworks.solutions",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://plainworks.solutions").replace(/\/$/, ""),
  linkedin: "",
};

export const nav = [
  { href: "/preplabel", label: "PrepLabel" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
