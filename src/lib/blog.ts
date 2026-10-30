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

// Articles MIS DE CÔTÉ (David) : absents du blog, des listes, de la recherche et du plan du site ; leur
// adresse renvoie « page introuvable ». Les remettre en ligne = les retirer de cette liste.
// - « La sophrologie pour le jeu de l'acteur » (23/10/2026) : avec Isabelle Delaetre, à remettre plus tard.
export const ARTICLES_MIS_DE_COTE = new Set(["la-sophrologie-pour-le-jeu-de-l-acteur"]);

// Du plus récent au plus ancien
export const ARTICLES = (index as Article[])
  .filter((a) => !ARTICLES_MIS_DE_COTE.has(a.slug))
  .toSorted((a, b) => b.date.localeCompare(a.date));

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

// DANS LES ARCHIVES (19/10/2026) : la Search Console montre ~40 articles que Google n'a jamais
// visités, faute de liens (ils ne sont jamais dans les « À lire aussi »). Chaque article propose donc
// en plus l'article proche le moins relié : chacun finit par recevoir des liens.
let entrants: Map<string, number> | null = null;
export function articleDesArchives(a: Article, deja: string[]): Article | undefined {
  if (!entrants) {
    const m = new Map<string, number>();
    for (const x of ARTICLES) for (const y of articlesLies(x, 4)) m.set(y.slug, (m.get(y.slug) ?? 0) + 1);
    entrants = m;
  }
  const n = entrants;
  // Parmi les 12 articles les plus proches : le moins relié (2 liens au plus), le plus proche à égalité
  const proches = articlesLies(a, 12).filter((x) => !deja.includes(x.slug) && (n.get(x.slug) ?? 0) <= 2);
  return proches.reduce<Article | undefined>((m, x) => (!m || (n.get(x.slug) ?? 0) < (n.get(m.slug) ?? 0) ? x : m), undefined);
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

// RÉPLIQUE (12/10/2026) : les articles sur la préparation, l'audition, le monologue,
// l'italienne : le bandeau IACTEUR y devient « Ton texte, par cœur » (titre seul, comme METIER).
const REPLIQUE =
  /monologue|italienne|r[ée]plique|par c(œ|oe)ur|m[ée]moris|apprendre (son|ses|un|le|les) texte|retenir (son|un) texte|pr[ée]parer avant|r[ée]ussir un casting|pourquoi 90|audition|self.?tape|travail de table|filage|soliloque/i;

// MINI-COACH (17/10/2026) : les articles sur le casting et sa préparation (et les annonces de casting) :
// le bandeau devient « Ton casting approche ? Colle ton texte. » ; il passe avant RÉPLIQUE et le CV Pro.
const MINI_COACH = /r[ée]ussir un casting|audition|self.?tape|pr[ée]parer avant|pourquoi 90|casting/i;

// Les articles sur CARRIÈRE (18/10) parlent déjà d'IACTEUR : pas de bandeau mini-coach malgré « casting » dans le titre
export function estArticleMiniCoach(a: Article) {
  return MINI_COACH.test(a.titre) && !/iacteur/i.test(a.titre) && !a.tags.includes("CARRIÈRE");
}

export function estArticleReplique(a: Article) {
  return REPLIQUE.test(a.titre) && !/iacteur/i.test(a.titre);
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

// ── ENCARTS IACTEUR DANS LE TEXTE (30/10/2026, David : « un petit encart après le premier paragraphe, vers
// le module qui correspond au sujet de l'article ») ──
// monologue → SOLO · scène à deux → DUO · texte, technique de jeu → RÉPLIQUE · pièce ou scénario entier →
// MON RÔLE · casting, audition, CV, agent → CASTING CALL · métier, quotidien, doutes → CARRIÈRE. Un article
// de culture (brèves, théâtre, cinéma) reçoit SOLO ou DUO, en alternance (le même article garde toujours le sien).
export type ModuleEncart = "solo" | "duo" | "replique" | "role" | "casting" | "carriere";

// Les articles les plus lus, choisis à la main (classement 30 jours, 30/10) ; les autres suivent les règles
const MODULE_PAR_ARTICLE: Record<string, ModuleEncart> = {
  "qu-est-ce-qu-une-italienne-et-une-allemande": "replique",
  "apprendre-son-texte-seul-comment-repeter-sans-partenaire": "replique",
  "10-exercices-de-théâtre-pour-débutants-apprendre-à-jouer-en-s-amusant": "duo",
  "exercices-jeu-dacteur": "solo",
  "la-règle-des-trois-unités": "duo",
  "le-fusil-de-tchekhov-un-principe-dramaturgique-essentiel": "solo",
  "pourquoi-dit-on-merde-avant-une-représentation": "solo",
  "qu-est-ce-qu-un-souffleur-au-théâtre": "replique",
  "qu-est-ce-que-le-filage-au-théâtre": "replique",
  "le-cv-d-acteur-comment-le-faire-et-le-faire-bien": "casting",
  "se-préparer-pour-casting-guide-pratique-pour-le-réussir": "casting",
  "casting-court-rôles-figuration-tournage-vaucluse-bouches-du-rhône": "casting",
  "qu-est-ce-que-le-métier-de-hmc-dans-l-audiovisuel": "carriere",
};
const R_SOLO = /monologue|soliloque|one.?man|seul en sc[eè]ne/;
const R_ROLE = /sc[ée]nario|pi[eè]ce enti[eè]re|analyse de r[oô]le|extraire|d[ée]couper/;
const R_DUO = /sc[eè]ne a deux|duo|dialogue|partenaire|improvis|deux personnages|en bin[oô]me/;
const R_TEXTE_FORT = /italienne|allemande|replique|par c(oe|œ)ur|memoris|apprendre (son|ses|un|le|les) texte|retenir|souffleur|filage|travail de table|lecture a la table/;
const R_TEXTE = new RegExp(`${R_TEXTE_FORT.source}|texte`);
// le résumé et les mots-clés sont plus larges que le titre : on n'y cherche que les mots sans ambiguïté
const R_CASTING_FORT = /casting|audition|self.?tape/;
const R_CASTING = new RegExp(`${R_CASTING_FORT.source}|bande demo|\\bagents?\\b|\\bcv\\b|\\bbook\\b|figuration|silhouette|intermitten|candidature`);
const R_CARRIERE_FORT = /quotidien|doute|vivre de|stress|reconversion/;
const R_CARRIERE = new RegExp(`${R_CARRIERE_FORT.source}|carri[eè]re|m[eé]tier|trac\\b|confiance|peur|motivation|perseve|routine|debut dans`);
// (« Le Jeu de l'Acteur » est le nom de l'école : il ne dit rien du sujet de l'article)
const R_JEU = /jeu d.acteur|jeu non verbal|exercice|interpret|ecoute/;

// Les articles qui parlent déjà d'IACTEUR n'ont pas besoin de l'encart
export function moduleEncart(a: Article): ModuleEncart | null {
  const impose = MODULE_PAR_ARTICLE[a.slug];
  if (impose) return impose;
  if (/iacteur/i.test(a.titre)) return null;
  const titre = sansAccents(a.titre);
  const resume = sansAccents(`${a.description} ${a.tags.join(" ")}`);
  const parDefaut = (): ModuleEncart => {
    let h = 0;
    for (const c of a.slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return h % 2 === 0 ? "solo" : "duo";
  };
  // les « Saviez-vous que… » (anecdotes de cinéma) : leur résumé parle de carrière ou de casting, pas leur sujet
  if (/^saviez/.test(titre)) return parDefaut();
  // le titre d'abord (le plus parlant), puis le résumé et les mots-clés avec les mots précis seulement
  const passes: [string, RegExp, RegExp, RegExp, boolean][] = [
    [titre, R_TEXTE, R_CASTING, R_CARRIERE, true],
    [`${titre} ${resume}`, R_TEXTE_FORT, R_CASTING_FORT, R_CARRIERE_FORT, false],
  ];
  for (const [t, texte, casting, carriere, jeu] of passes) {
    if (R_SOLO.test(t)) return "solo";
    if (R_ROLE.test(t)) return "role";
    if (R_DUO.test(t)) return "duo";
    if (texte.test(t)) return "replique";
    if (casting.test(t)) return "casting";
    if (carriere.test(t)) return "carriere";
    if (jeu && R_JEU.test(t)) return "replique";
  }
  // culture générale (théâtre, cinéma, brèves) : SOLO ou DUO, selon une empreinte stable de l'adresse
  return parDefaut();
}

// Un article sans accents ni majuscules, ≤ 40 signes : l'étiquette de campagne du lien (« ecole-<article> » dans les statistiques d'IACTEUR)
export const campagneArticle = (slug: string) =>
  sansAccents(slug).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40).replace(/-+$/, "");
