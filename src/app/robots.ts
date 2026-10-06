// ROBOTS du vrai site (lejeudelacteur.com). L'aperçu en .vercel.app reste
// fermé : voir next.config.ts (en-tête noindex + robots-apercu).
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/ne-pas-me-compter"] }],
    sitemap: "https://www.lejeudelacteur.com/sitemap.xml",
  };
}
