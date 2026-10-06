// LE BLOG (07/10/2026) : les 163 articles repris de Wix, mêmes adresses
// (/post/<slug>) et mêmes catégories (/news/categories/<slug>) pour garder
// le référencement. Les textes sont des fichiers du projet
// (src/content/blog), les images sont dans public/blog : rien ne dépend de Wix.
import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import index from "@/content/blog/index.json";
import texte from "@/content/blog/texte.json";

export type Article = {
  slug: string;
  fichier: string;
  titre: string;
  date: string; // AAAA-MM-JJ
  modifie: string;
  description: string;
  couverture: string | null; // fichier dans public/blog
  miniature: string | null;
  largeur: number;
  hauteur: number;
  categories: { slug: string; nom: string }[];
  tags: string[];
  lecture: string;
};

// Du plus récent au plus ancien
export const ARTICLES = (index as Article[]).toSorted((a, b) => b.date.localeCompare(a.date));

export function articleParSlug(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export async function corpsArticle(a: Article) {
  return readFile(path.join(process.cwd(), "src/content/blog/corps", `${a.fichier}.html`), "utf8");
}

export function categories() {
  const m = new Map<string, { slug: string; nom: string; nombre: number }>();
  for (const a of ARTICLES) {
    for (const c of a.categories) {
      const x = m.get(c.slug) ?? { ...c, nombre: 0 };
      x.nombre++;
      m.set(c.slug, x);
    }
  }
  return [...m.values()].sort((a, b) => b.nombre - a.nombre);
}

export const PAR_PAGE = 12;

const sansAccents = (t: string) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// RECHERCHE (07/10) : tous les mots doivent se retrouver dans l'article (titre,
// description, mots-clés, catégories ou texte), sans tenir compte des accents ni
// des majuscules. Les articles dont le TITRE contient les mots passent devant.
export function chercher(articles: Article[], recherche: string) {
  const mots = sansAccents(recherche).split(/[^a-z0-9]+/).filter((m) => m.length > 1);
  if (mots.length === 0) return articles;
  const textes = texte as Record<string, string>;
  return articles
    .map((a) => {
      const titre = sansAccents(a.titre);
      const resume = sansAccents(`${a.description} ${a.tags.join(" ")} ${a.categories.map((c) => c.nom).join(" ")}`);
      const corps = textes[a.slug] ?? "";
      if (!mots.every((m) => titre.includes(m) || resume.includes(m) || corps.includes(m))) return null;
      return { a, score: mots.filter((m) => titre.includes(m)).length * 3 + mots.filter((m) => resume.includes(m)).length };
    })
    .filter((x): x is { a: Article; score: number } => x !== null)
    .sort((x, y) => y.score - x.score || y.a.date.localeCompare(x.a.date))
    .map((x) => x.a);
}

export function dateFr(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" });
}

// Un morceau d'adresse venu du navigateur (accents encodés) → texte
export function decoder(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}
