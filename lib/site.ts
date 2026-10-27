// Site settings. On Vercel, set these in Project → Settings → Environment Variables.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  name: "Plainworks",
  tagline: "Upgrade the systems you already run.",
  city: "Fredericton, New Brunswick, Canada",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),
};

export const nav = [
  { href: "/preplabel", label: "PrepLabel" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
