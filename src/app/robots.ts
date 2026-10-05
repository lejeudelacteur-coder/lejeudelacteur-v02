// APERÇU : tout est fermé aux moteurs de recherche tant que le domaine
// lejeudelacteur.com est sur Wix. À OUVRIR LE JOUR DE LA BASCULE (décembre
// 2026) : allow "/" + sitemap.
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] };
}
