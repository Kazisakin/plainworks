// Site settings. On Vercel, these can be overridden in Project → Settings → Environment Variables.
export const site = {
  name: "Plainworks",
  legalName: "Plainworks",
  tagline: "Products that make businesses run better.",
  homeTitle: "Plainworks | AI software and smart hardware for business",
  description:
    "Plainworks is a product studio in Fredericton, Canada, building AI software and smart hardware that take slow, costly work out of running a business.",
  city: "Fredericton, New Brunswick, Canada",
  locality: "Fredericton",
  region: "NB",
  country: "CA",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@plainworks.solutions",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    "https://plainworks.solutions"
  ).replace(/\/$/, ""),
  linkedin: "",
};

export const nav = [
  { href: "/preplabel", label: "PrepLabel" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
