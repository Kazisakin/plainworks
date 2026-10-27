import type { Metadata } from "next";
import { site } from "./site";

type PageSeo = { title: string; description: string; path: string; image?: string; imageAlt?: string; keywords?: string[] };

// Builds full metadata for a page: canonical URL, Open Graph and Twitter cards.
export function pageMeta({ title, description, path, image, imageAlt, keywords }: PageSeo): Metadata {
  const url = `${site.url}${path}`;
  const images = image ? [{ url: image, width: 1200, height: 630, alt: imageAlt ?? title }] : undefined;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { type: "website", url, title, description, siteName: site.name, locale: "en_CA", ...(images && { images }) },
    twitter: { card: "summary_large_image", title, description, ...(images && { images: images.map((i) => i.url) }) },
  };
}

export const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.png`,
  description: site.description,
  ...(site.email.includes("example.com") ? {} : { email: site.email }),
  address: { "@type": "PostalAddress", addressLocality: site.locality, addressRegion: site.region, addressCountry: site.country },
  areaServed: ["Canada", "Bangladesh", "South Asia", "Africa"],
  knowsAbout: ["business software", "restaurant technology", "food prep labeling", "point of sale upgrades", "emerging markets"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  inLanguage: "en-CA",
  publisher: { "@id": `${site.url}/#organization` },
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}

export const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${site.url}/preplabel#product`,
  name: "PrepLabel",
  description:
    "PrepLabel is an offline touchscreen food prep label printer for restaurant kitchens. Tap a category, tap an item, and a dated 55 x 40 mm label prints in about two seconds with made and use-by dates, staff initials and a QR code linked to an exportable print log.",
  brand: { "@type": "Brand", name: site.name },
  manufacturer: { "@id": `${site.url}/#organization` },
  category: "Food labeling equipment",
  url: `${site.url}/preplabel`,
  image: [
    `${site.url}/renders/preplabel-food-label-printer-arctic-white.webp`,
    `${site.url}/renders/preplabel-food-label-printer-sage.webp`,
    `${site.url}/renders/preplabel-label-roll-change-lid-open.webp`,
    `${site.url}/ui/preplabel-55x40-food-prep-label.png`,
  ],
  color: "Arctic white, Sage, Clay, Graphite",
  width: { "@type": "QuantitativeValue", value: 140, unitCode: "MMT" },
  depth: { "@type": "QuantitativeValue", value: 162, unitCode: "MMT" },
  height: { "@type": "QuantitativeValue", value: 105, unitCode: "MMT" },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Print method", value: "Direct thermal, 203 dpi" },
    { "@type": "PropertyValue", name: "Label size", value: "55 x 40 mm" },
    { "@type": "PropertyValue", name: "Connectivity", value: "USB-C setup only, no Wi-Fi or Bluetooth" },
    { "@type": "PropertyValue", name: "Screen", value: "2.8 inch touchscreen" },
  ],
};

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
