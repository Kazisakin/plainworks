import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { photos } from "@/lib/photos";

const u = (p: string) => `${site.url}${p}`;
const clean = (src: string) => src.replace(/&/g, "&amp;");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: u("/"), lastModified: now, changeFrequency: "weekly", priority: 1,
      images: [u("/renders/preplabel-food-label-printer-sage.webp"), clean(photos.earthNight), clean(photos.dhaka), clean(photos.lagos), clean(photos.nairobi)] },
    { url: u("/preplabel"), lastModified: now, changeFrequency: "weekly", priority: 0.9,
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
    { url: u("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: u("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: u("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: u("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
