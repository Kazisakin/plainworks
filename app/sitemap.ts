import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/preplabel", "/about", "/contact", "/privacy", "/terms"].map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
