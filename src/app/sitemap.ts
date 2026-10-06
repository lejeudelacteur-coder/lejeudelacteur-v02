// PLAN DU SITE pour Google (07/10/2026) : les pages, les 163 articles et les
// catégories du blog, aux adresses de Wix. Il ne sert à rien tant que le site
// est fermé aux moteurs (robots.ts) : à déclarer dans la Search Console LE
// JOUR DE LA BASCULE.
import type { MetadataRoute } from "next";
import { ARTICLES, categories } from "@/lib/blog";

const SITE = "https://www.lejeudelacteur.com";
const PAGES = [
  "/",
  "/cours-intensif",
  "/cours-pros",
  "/cours-loisirs",
  "/stages-casting",
  "/book-vid%C3%A9o",
  "/%C3%A9quipe",
  "/th%C3%A9%C3%A2tredeloriflamme",
  "/partenaire-de-jeu",
  "/inscriptions",
  "/david-rousseau-realisateur",
  "/rgpd",
  "/news",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((p) => ({ url: `${SITE}${p}` })),
    ...categories().map((c) => ({ url: `${SITE}/news/categories/${encodeURIComponent(c.slug)}` })),
    ...ARTICLES.map((a) => ({ url: `${SITE}/post/${encodeURIComponent(a.slug)}`, lastModified: a.modifie || a.date })),
  ];
}
