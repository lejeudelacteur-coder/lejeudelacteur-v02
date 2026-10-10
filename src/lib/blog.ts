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

// NETTOYAGE À L'AFFICHAGE (David, 10/10/2026) : les textes importés de Wix ne sont
// pas modifiés ; on retire seulement ce qui est mort.
// 1. LE GROS CLAP ROUGE : l'image de fin d'article qui renvoyait vers l'ancienne
//    lettre Substack (74 articles) ; l'article affiche à la place le bandeau IACTEUR.
// 2. SUBSTACK, abandonné : l'encadré « Abonnez-vous… » et son bouton « S'abonner »
//    (≈ 66 articles, une variante « Click Me »), et « | Substack » au bout de la
//    ligne des réseaux sociaux.
const CLAP = /<figure>(?:(?!<\/figure>)[\s\S])*?2b942a_47e3a774bc3049abb75856bb40e472f2(?:(?!<\/figure>)[\s\S])*?<\/figure>/g;
const BOUTON_SUBSTACK =
  /(?:<blockquote>\s*)?(?:<p[^>]*>(?:(?!<\/p>)[\s\S])*?abonn(?:(?!<\/p>)[\s\S])*?<\/p>\s*)?(?:<\/blockquote>\s*)?<p class="bouton"><a [^>]*substack[^>]*>(?:(?!<\/p>)[\s\S])*?<\/p>/gi;
const LIEN_SUBSTACK = /\s*\|?\s*<a [^>]*substack[^>]*>(?:(?!<\/a>)[\s\S])*?<\/a>/gi;

export function nettoyerCorps(html: string) {
  const sansClap = html.replace(CLAP, "");
  return {
    html: sansClap.replace(BOUTON_SUBSTACK, "").replace(LIEN_SUBSTACK, ""),
    avaitClap: sansClap.length !== html.length,
  };
}

// MAILLAGE (David, 10/10/2026) : pour chaque article, ceux qui parlent VRAIMENT du même
// sujet (et non plus « la même catégorie » : Brèves, Actualités… ne disent rien du sujet).
// On compare les mots du titre (comptés 3 fois), des mots-clés (2 fois), du résumé et du
// texte, pondérés par leur rareté (TF-IDF) ; recalculé à chaque mise en ligne.
const MOTS_VIDES = new Set(
  "pour dans avec plus tout tous toute toutes mais comme cette cest elle elles nous vous leur leurs sont etre avoir fait faire bien aussi entre sans sous chez donc alors encore tres meme quand dont ainsi apres avant depuis peut peuvent votre notre leurs quoi quel quelle quels quelles celui celle ceux cela ceci chaque autre autres moins jamais toujours souvent".split(" ")
);
let vecteurs: Map<string, Map<string, number>> | null = null;

function mots(t: string) {
  return sansAccents(t).split(/[^a-z0-9]+/).filter((m) => m.length >= 4 && !MOTS_VIDES.has(m));
}

function calculerVecteurs() {
  const textes = texte as Record<string, string>;
  const brut = new Map<string, Map<string, number>>();
  const df = new Map<string, number>();
  for (const a of ARTICLES) {
    const tf = new Map<string, number>();
    const ajouter = (t: string, poids: number) => {
      for (const m of mots(t)) tf.set(m, (tf.get(m) ?? 0) + poids);
    };
    ajouter(a.titre, 3);
    ajouter(a.tags.join(" "), 2);
    ajouter(a.description, 1);
    ajouter(textes[a.slug] ?? "", 1);
    for (const m of tf.keys()) df.set(m, (df.get(m) ?? 0) + 1);
    brut.set(a.slug, tf);
  }
  const n = ARTICLES.length;
  const res = new Map<string, Map<string, number>>();
  for (const [slug, tf] of brut) {
    const v = new Map<string, number>();
    let norme = 0;
    for (const [m, f] of tf) {
      const poids = (1 + Math.log(f)) * Math.log(n / (df.get(m) ?? 1));
      if (poids > 0) {
        v.set(m, poids);
        norme += poids * poids;
      }
    }
    norme = Math.sqrt(norme) || 1;
    for (const [m, p] of v) v.set(m, p / norme);
    res.set(slug, v);
  }
  return res;
}

export function articlesLies(a: Article, combien: number): Article[] {
  vecteurs ??= calculerVecteurs();
  const va = vecteurs.get(a.slug);
  if (!va) return [];
  const titre = sansAccents(a.titre).trim();
  return ARTICLES.filter((x) => x.slug !== a.slug && sansAccents(x.titre).trim() !== titre)
    .map((x) => {
      const vx = vecteurs!.get(x.slug)!;
      let score = 0;
      for (const [m, p] of va) score += p * (vx.get(m) ?? 0);
      return { x, score };
    })
    .filter((r) => r.score > 0.04)
    .sort((p, q) => q.score - p.score)
    // Jamais deux articles au même titre (ex. plusieurs « LE SHOOTING DU JOUR »)
    .filter((r, i, liste) => liste.findIndex((y) => sansAccents(y.x.titre).trim() === sansAccents(r.x.titre).trim()) === i)
    .slice(0, combien)
    .map((r) => r.x);
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

// Les articles qui parlent du TRAVAIL d'acteur (exercices, monologues, castings,
// préparation, jeu face caméra, bande démo, IACTEUR…) : on y ajoute le bandeau
// IACTEUR pour tout le monde (07/10). Les articles d'histoire du cinéma ou de
// vocabulaire du théâtre n'en ont pas.
const TRAVAIL_ACTEUR =
  /monologue|exercice|jeu d.acteur|jeu face|jeu non verbal|improvisation|impro face|casting|bande d[ée]mo|travail [àa] l.image|travail de table|filage|italienne|didascalies|soliloque|se pr[ée]parer|shooting photo|iacteur|rendre son jeu|adapter son jeu|l.[ée]coute|pr[ée]sentation professionnelle|o\.q\.p|remplacer l.acteur/i;

// LES ARTICLES QUI AMÈNENT DU MONDE (08/10/2026) : les plus lus, venus de loin. Pas de cours
// à Avignon pour eux ; IACTEUR en haut de l'article, à la place. À réviser avec les statistiques.
const ARTICLES_IACTEUR = new Set([
  "qu-est-ce-qu-une-italienne-et-une-allemande",
  "10-exercices-de-théâtre-pour-débutants-apprendre-à-jouer-en-s-amusant",
  "le-plan-d-ensemble-au-cinéma-cadrer-l-espace-raconter-l-histoire",
  "le7èmeart",
  "exercices-jeu-dacteur",
  "qu-es-ce-qu-une-scène-d-exposition",
  "la-règle-des-trois-unités",
  "qu-est-ce-que-le-métier-de-hmc-dans-l-audiovisuel",
  "le-fusil-de-tchekhov-un-principe-dramaturgique-essentiel",
  "la-catharsis-un-voyage-émotionnel-à-travers-le-théâtre",
  "le-grotesque-au-théâtre-c-est-quoi",
  "le-comique-de-répétition",
]);
// Les plus lus, dans l'ordre du classement (08/10/2026), et les plus récents : proposés
// en fin d'article pour relier les articles entre eux.
export const LES_PLUS_LUS = ARTICLES.length ? [...ARTICLES_IACTEUR].map((s) => ARTICLES.find((a) => a.slug === s)).filter((a): a is Article => !!a) : [];
export const LES_PLUS_RECENTS = ARTICLES.slice(0, 12);
export const articlePourIacteur = (a: Article) => ARTICLES_IACTEUR.has(a.slug);

// CV PRO (10/10/2026) : les articles sur le casting et le monde du travail, où le
// bandeau IACTEUR devient « Ton CV d'acteur Pro, gratuit » (titre et mots-clés).
const METIER =
  /casting|audition|bande d[ée]mo|self.?tape|\bagents?\b|\bcv\b|\bbook\b|shooting photo|figuration|silhouette|pr[ée]sentation professionnelle|intermitten/i;
// L'article « Le CV d'acteur » (10/10/2026) : proposé DANS LE TEXTE des articles casting / métier
export const SLUG_ARTICLE_CV = "le-cv-d-acteur-comment-le-faire-et-le-faire-bien";

export function estArticleMetier(a: Article) {
  // Le TITRE seul : les mots-clés des articles sont trop larges (« métier », « carrière »…)
  return METIER.test(a.titre) && !/^LE SHOOTING DU JOUR$/i.test(a.titre.trim()) && !/iacteur/i.test(a.titre);
}

export function estArticleActeur(a: Article) {
  return TRAVAIL_ACTEUR.test(a.titre) && !/^LE SHOOTING DU JOUR$/i.test(a.titre.trim());
}

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
