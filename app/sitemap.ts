import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const u = (p: string) => `${site.url}${p}`;

// Bump these when a page's content meaningfully changes. A fixed date tells
// search engines the truth; `new Date()` claims every page changed on every crawl.
const updated = {
  home: new Date("2026-10-28"),
  preplabel: new Date("2026-10-28"),
  about: new Date("2026-10-28"),
  contact: new Date("2026-10-27"),
  legal: new Date("2026-10-27"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: u("/"), lastModified: updated.home, changeFrequency: "weekly", priority: 1,
      images: [u("/renders/preplabel-food-label-printer-sage.webp")] },
    { url: u("/preplabel"), lastModified: updated.preplabel, changeFrequency: "weekly", priority: 0.9,
      images: [
        u("/renders/preplabel-food-label-printer-arctic-white.webp"),
        u("/renders/preplabel-food-label-printer-sage.webp"),
        u("/renders/preplabel-food-label-printer-clay.webp"),
        u("/renders/preplabel-food-label-printer-graphite.webp"),
        u("/renders/preplabel-touchscreen-close-up.webp"),
        u("/renders/preplabel-printed-prep-label-close-up.webp"),
        u("/renders/preplabel-label-roll-change-lid-open.webp"),
        u("/renders/preplabel-rear-usb-c-power-ports.webp"),
        u("/ui/preplabel-55x40-food-prep-label.png"),
        u("/ui/preplabel-screen-choose-category.png"),
      ] },
    { url: u("/about"), lastModified: updated.about, changeFrequency: "monthly", priority: 0.7 },
    { url: u("/contact"), lastModified: updated.contact, changeFrequency: "yearly", priority: 0.6 },
    { url: u("/privacy"), lastModified: updated.legal, changeFrequency: "yearly", priority: 0.3 },
    { url: u("/terms"), lastModified: updated.legal, changeFrequency: "yearly", priority: 0.3 },
  ];
}
