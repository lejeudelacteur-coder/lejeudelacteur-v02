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
// monologue, théâtre → SOLO · scène à deux, impro → DUO · apprendre son texte → RÉPLIQUE · pièce ou scénario entier →
// MON RÔLE · technique de jeu → COACH · casting, CV, cinéma → CASTING · parcours, métiers → CARRIÈRE.
export type ModuleEncart = "solo" | "duo" | "replique" | "role" | "casting" | "carriere" | "coach";

// CHOIX ARTICLE PAR ARTICLE (21/11/2026, David : « les shorts de démo ne doivent pas être mis au hasard, il faut que ce
// soit pertinent et cohérent »). Chaque article du blog a son encart, décidé un par un : il n'y a plus d'alternance
// automatique SOLO/DUO. Principe : le sujet de l'article dit quel module (et quel short) lui parle. « aucun » = pas
// d'encart (vie de l'école : l'encart y brouillerait le message) ; « video » = la grande vidéo de 7 minutes.
// Un NOUVEL article absent de cette liste suit les règles plus bas (mots du titre) ; sans mot clair, il n'a pas d'encart.
export type ChoixEncart = ModuleEncart | "video" | "aucun";
const ENCART_PAR_ARTICLE: Record<string, ChoixEncart> = {
  // LA GRANDE VIDÉO (7 min) : l'IA, IACTEUR en général, devenir acteur
  "pourquoi-iacteur-et-pas-chatgpt-claude-ou-gemini": "video",
  "devenir-acteur-les-étapes-essentielles-pour-une-formation-professionnelle-acteur-réussie": "video",
  "pourquoi-j-ai-créé-iacteur-un-espace-personnel-pour-travailler-se-préparer-et-construire-sa-carri": "video",
  "l-ia-peut-elle-remplacer-l-acteur-non-l-aider-à-mieux-préparer-oui": "video",
  "former-des-acteurs-complets-scène-caméra-casting": "video",
  // AUCUN ENCART : la vie de l'école, les annonces et les articles où il n'aurait aucun sens
  "invitation-projection-de-fin-d-année-du-jeu-de-l-acteur": "aucun",
  "cours-de-théâtre-à-avignon-comment-choisir": "aucun",
  "kandinsky-le-peintre-qui-entendait-les-couleurs": "aucun",
  "forum-des-métiers-de-l-image-à-avignon": "aucun",
  "du-plateau-au-festival-une-pédagogie-ancrée-dans-le-terrain": "aucun",
  "devenir-acteur-les-inscriptions-2026-2027-sont-ouvertes": "aucun",
  "immersion-exclusive-les-loisirs-s-invitent-chez-les-pros-en-janvier": "aucun",
  "photos-pro-pour-le-plaisir-immortalisez-votre-parcours-théâtral-et-cinématographique": "aucun",
  "dates-des-projections-du-film-sacré-coeur": "aucun",
  "les-2-cours-loisrs": "aucun",
  "révélez-votre-potentiel-d-acteur": "aucun",
  "nicolas-laurent-rejoint-le-jeu-de-l-acteur": "aucun",
  "myriam-waelkens-le-jeu-de-l-acteur": "aucun",
  "le-cours-pro-du-lundi-les-élèves-en-parlent": "aucun",
  "la-rentrée-2025-au-jeu-de-l-acteur": "aucun",
  "récit-de-la-projection-de-fin-d-année-du-lundi-9-juin-2025": "aucun",
  "rdv-pour-la-projection-de-fin-d-année": "aucun",
  "la-sophrologie-pour-le-jeu-de-l-acteur": "aucun",
  "dossier-présentation-des-cours": "aucun",
  "le-pacte-vostfr-cours-pro-du-lundi": "aucun",
  "montage-vidéo-de-la-répétition-cours-pro-du-lundi": "aucun",
  "montage-vidéo-de-la-répétition-formation-pro": "aucun",
  "répetition-tournage-formation-pro": "aucun",
  "lelâcher-prise-en-groupeloisir": "aucun",
  "travail-à-l-image-1": "aucun",
  "impro-face-caméra-4": "aucun",
  "travail-à-l-image": "aucun",
  "les-avantages-d-une-formation-d-acteurs-en-petit-groupe": "aucun",
  "sacrée-meilleure-série-dramatique-aux-international-emmy-awards-2024": "aucun",
  "le-shooting-du-jour-1": "aucun",
  "les-élèves-hors-les-cours": "aucun",
  "impro-face-caméra-2": "aucun",
  "pourquoi-choisir-l-œil-du-prince-au-théâtre": "aucun",
  "le-shooting-du-jour": "aucun",
  "une-master-classe-avec-aureck-de-bruyne": "aucun",
  "une-master-classe-avec-pierre-azéma": "aucun",
  "impro-face-caméra": "aucun",
  "nomination-aux-international-emmy-awards-2024": "aucun",
  "master-classe-emmanuelle-rivière": "aucun",
  "le-1er-direct-live-du-jeu-de-l-acteur": "aucun",
  // CASTING : annonces de casting, CV, bande démo, shooting photo, et le cinéma (culture, métiers, réalisateurs)
  "le-cv-d-acteur-comment-le-faire-et-le-faire-bien": "casting",
  "casting-call-dans-iacteur-comment-ça-marche": "casting",
  "casting-court-rôles-figuration-tournage-vaucluse-bouches-du-rhône": "casting",
  "comment-préparer-un-casting": "casting",
  "le-storyboard-l-outil-indispensable-pour-vos-projets-vidéo": "casting",
  "masterclass-casting-avec-laetitia-gaune": "casting",
  "le-droit-d-auteur-ce-qui-vous-appartient-dès-que-vous-créez": "casting",
  "le-jumpscare-faire-peur-c-est-un-métier": "casting",
  "le-premier-film-d-horreur-de-l-histoire-a-130-ans": "casting",
  "pourquoi-les-blockbusters-fonctionnent-au-cinéma": "casting",
  "le-found-footage-quand-la-caméra-devient-un-personnage": "casting",
  "le-lait-dans-orange-mécanique": "casting",
  "le-biopic-au-cinéma-quand-la-vie-devient-fiction": "casting",
  "le-plan-d-ensemble-au-cinéma-cadrer-l-espace-raconter-l-histoire": "casting",
  "tim-burton-johnny-depp-l-histoire-d-une-amitié-cinématographique-légendaire": "casting",
  "casting-long-métrage-02": "casting",
  "georges-méliès-le-magicien-qui-a-inventé-les-effets-spéciaux": "casting",
  "le-money-shot-au-cinéma-l-art-du-plan-qui-vaut-de-l-or": "casting",
  "casting-long-métrage": "casting",
  "le-phénomène-nepo-baby-quand-le-nom-de-famille-ouvre-les-portes": "casting",
  "l-ère-du-numérique-comment-la-technologie-a-révolutionné-le-cinéma": "casting",
  "le-trunk-shot-au-cinéma-pourquoi-ce-plan-iconique-vient-il-du-coffre-d-une-voiture": "casting",
  "la-critique-de-cinéma-de-ses-origines-à-son-impact-réel-sur-le-box-office-et-la-carrière-des-a": "casting",
  "masterclass-casting": "casting",
  "la-cascade-torche-humaine-au-cinéma-l-art-du-feu-au-service-de-l-action": "casting",
  "l-affiche-au-cinéma": "casting",
  "saviez-vous-que-bong-joon-ho": "casting",
  "saviez-vous-que-robert-zemeckis": "casting",
  "saviez_vous-que-les-frères-coen": "casting",
  "casting-rôles-tv": "casting",
  "saviez-vous-que-sidney-lumet": "casting",
  "saviez-vous-que-rob-reiner": "casting",
  "copie-de-casting-role-enfant": "casting",
  "masterclasse-casting": "casting",
  "qu-est-ce-que-le-flash-forward-au-cinéma": "casting",
  "copie-de-qu-est-ce-qu-un-plan-séquence": "casting",
  "saviez-vous-que-kathryn-bigelow": "casting",
  "casting-role-enfant": "casting",
  "saviez-vous-que-sophia-coppola-et-spike-jonze": "casting",
  "qu-est-ce-que-le-métier-de-hmc-dans-l-audiovisuel-1": "casting",
  "la-technologie-révolutionnaire-du-film-king-kong-1": "casting",
  "pourquoi-tourner-une-scène-ou-un-monologue-peut-transformer-votre-candidature-de-comédien-ne": "casting",
  "la-technologie-révolutionnaire-du-film-king-kong": "casting",
  "pourquoi-une-vidéo-de-présentation-professionnelle": "casting",
  "se-préparer-pour-casting-guide-pratique-pour-le-réussir": "casting",
  "comment-bien-se-préparer-pour-un-shooting-photo": "casting",
  "la-musique-au-cinéma-à-travers-le-temps": "casting",
  "les-erreurs-à-éviter-lors-d-un-shooting-photo": "casting",
  "saviez-vous-que-marcel-pagnol": "casting",
  "conseils-et-astuces-pour-une-séance-de-shooting-réussie": "casting",
  "saviez-vous-qu-alexandre-astier": "casting",
  "d-où-vient-la-lanterne-magique": "casting",
  "à-quoi-servent-les-étoiles-d-hollywood-boulevard": "casting",
  "saviez-vous-que-david-fincher": "casting",
  "spécial-book-photos": "casting",
  "copie-de-saviez-vous-que-ridley-scott": "casting",
  "casting-silhouette-à-avignon": "casting",
  "casting-à-avignon-2": "casting",
  "casting-urgent-à-avignon": "casting",
  "casting-à-avignon-1": "casting",
  "saviez-vous-que-tim-burton": "casting",
  "l-art-du-travelling-entre-histoire-et-technique": "casting",
  "copie-de-saviez-vous-que-george-miller": "casting",
  "saviez-vous-que-mel-gibson": "casting",
  "casting-à-avignon": "casting",
  "saviez-vous-que-james-cameron": "casting",
  "qui-est-oscar-la-célèbre-statuette-du-cinéma": "casting",
  "le7èmeart": "casting",
  "le-clap": "casting",
  "l-ingénieur-du-son-l-artisan-invisible-qui-donne-vie-à-vos-émotions": "casting",
  "qu-est-ce-que-le-métier-de-hmc-dans-l-audiovisuel": "casting",
  // SOLO : monologue, et le théâtre (vocabulaire, superstitions, histoire)
  "le-travail-a-l-image-formation-acteur-intensive-avignon": "solo",
  "comment-choisir-un-monologue": "solo",
  "exercices-jeu-dacteur": "solo",
  "the-show-must-go-on-l-histoire-d-une-expression-légendaire": "solo",
  "la-mise-en-abîme-au-théâtre-et-au-cinéma": "solo",
  "quels-sont-les-3-genres-majeurs-au-théâtre": "solo",
  "l-évolution-de-la-musique-au-théâtre-et-au-cinéma": "solo",
  "le-grotesque-au-théâtre-c-est-quoi": "solo",
  "pourquoi-ne-porte-t-on-jamais-de-vert-au-théâtre": "solo",
  "qu-es-ce-qu-une-scène-d-exposition": "solo",
  "à-quoi-servent-les-coulisses-au-théâtre": "solo",
  "le-soliloque-une-fenêtre-sur-l-âme-du-personnage": "solo",
  "macbeth-pièce-maudite": "solo",
  "à-quoi-sert-l-acte-au-théâtre": "solo",
  "le-4ème-mur-illusion-ou-réalité": "solo",
  "pourquoi-le-mot-corde-est-il-tabou-au-théâtre": "solo",
  "quel-est-le-rôle-d-un-régisseur-plateau-au-théâtre": "solo",
  "pourquoi-12-coups-au-théâtre": "solo",
  "qu-est-ce-que-le-paradis-au-théâtre": "solo",
  "pourquoi-dit-on-merde-avant-une-représentation": "solo",
  "pourquoi-il-ne-faut-jamais-siffler-dans-un-théâtre": "solo",
  "pourquoi-les-rideaux-au-théâtre-sont-ils-rouges": "solo",
  "qu-est-ce-que-lumière-en-douche-au-théâtre": "solo",
  "la-catharsis-un-voyage-émotionnel-à-travers-le-théâtre": "solo",
  "d-où-viennent-les-lundis-de-rela-che-au-the-a-tre": "solo",
  "qu-est-ce-que-la-face-et-le-lointain-au-théâtre": "solo",
  "la-comédie-française-une-institution-théâtrale-du-cinéma-français": "solo",
  "le-fusil-de-tchekhov-un-principe-dramaturgique-essentiel": "solo",
  "la-règle-des-trois-unités": "solo",
  "les-feux-de-la-rampe": "solo",
  "côté-cour-et-côté-jardin": "solo",
  "festival-avignon": "solo",
  // DUO : la scène à deux, l'impro, le comique de répétition
  "10-exercices-de-théâtre-pour-débutants-apprendre-à-jouer-en-s-amusant": "duo",
  "impro-face-caméra-3": "duo",
  "le-comique-de-répétition": "duo",
  "impro-face-caméra-1": "duo",
  "pourquoi-le-comique-de-répétition-fait-il-rire-au-cinéma-en-2024": "duo",
  // RÉPLIQUE : apprendre son texte, travail de table, filage, souffleur
  "preparer-un-casting-seul-travail-de-table": "replique",
  "apprendre-son-texte-7-exercices-methode": "replique",
  "apprendre-son-texte-seul-comment-repeter-sans-partenaire": "replique",
  "le-travail-de-table-la-préparation-qui-libère-le-jeu": "replique",
  "que-sont-les-didascalies-au-théâtre": "replique",
  "qu-est-ce-que-le-filage-au-théâtre": "replique",
  "qu-est-ce-qu-une-italienne-et-une-allemande": "replique",
  "qu-est-ce-qu-un-souffleur-au-théâtre": "replique",
  // MON RÔLE : lire un texte entier
  "le-travail-de-table": "role",
  // COACH : la technique de jeu (méthode O.Q.P, écoute, jeu non verbal, passage à l'image)
  "maîtriser-la-méthode-o-q-p-pour-une-interprétation-réaliste": "coach",
  "la-méthode-o-q-p": "coach",
  "lécoute-active-exercice-acteur-avignon": "coach",
  "le-jeu-non-verbal-à-l-image": "coach",
  "adapter-son-jeu-de-théâtre-pour-l-image": "coach",
  // CARRIÈRE : suivre ses castings, le parcours
  "carriere-ce-que-vous-vivez-entre-deux-castings": "carriere",
  "comment-devenir-acteur-quand-on-habite-à-avignon-guide-complet": "carriere",
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

// Les articles qui parlent de l'IA, d'IACTEUR en général ou de se former : l'encart est la GRANDE vidéo de démo (16/11), pas un module
export const SLUGS_VIDEO_DEMO = new Set(Object.entries(ENCART_PAR_ARTICLE).filter(([, c]) => c === "video").map(([slug]) => slug));

// Les articles qui parlent déjà d'IACTEUR n'ont pas besoin de l'encart
export function moduleEncart(a: Article): ModuleEncart | null {
  const choisi = ENCART_PAR_ARTICLE[a.slug];
  if (choisi) return choisi === "video" || choisi === "aucun" ? null : choisi;
  if (/iacteur/i.test(a.titre)) return null;
  const titre = sansAccents(a.titre);
  const resume = sansAccents(`${a.description} ${a.tags.join(" ")}`);
  // les « Saviez-vous que… » (anecdotes de cinéma) : leur résumé parle de carrière ou de casting, pas leur sujet
  if (/^saviez/.test(titre)) return "casting";
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
  // sans mot clair : pas d'encart (21/11 : plus d'alternance au hasard)
  return null;
}

// Un article sans accents ni majuscules, ≤ 40 signes : l'étiquette de campagne du lien (« ecole-<article> » dans les statistiques d'IACTEUR)
export const campagneArticle = (slug: string) =>
  sansAccents(slug).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40).replace(/-+$/, "");

// ── LES GUIDES D'IACTEUR, DEPUIS LE BLOG (30/10/2026, David : « un aller-retour entre iacteur.com et le Jeu de
// l'Acteur ») ── chaque article éditorial sur un sujet des guides (iacteur.com/guides) en est un « satellite » :
// en fin d'article, un lien vers son guide (et le guide, de son côté, liste ces articles). Rattachement choisi à la
// main, article par article (les annonces de casting, les actualités de l'école et la culture ciné/théâtre n'en ont pas).
export type PilierGuide = "texte" | "casting" | "jeu" | "entrainement" | "carriere" | "ia";
export const GUIDES_IACTEUR: Record<PilierGuide, { nom: string; go: string; phrase: string }> = {
  texte: { nom: "Apprendre son texte seul", go: "guide-texte", phrase: "De la première lecture au par cœur." },
  casting: { nom: "Préparer un casting ou une self-tape", go: "guide-casting", phrase: "De la convocation au lendemain." },
  jeu: { nom: "Travailler une scène", go: "guide-scene", phrase: "Objectifs, obstacles, enjeux." },
  entrainement: { nom: "S'entraîner seul", go: "guide-entrainement", phrase: "Progresser entre deux cours ou deux contrats." },
  carriere: { nom: "Gérer sa carrière de comédien", go: "guide-carriere", phrase: "CV, contacts, agent, suivi du parcours." },
  ia: { nom: "IA et comédiens", go: "guide-ia", phrase: "Ce qu'une application apporte, et ce qu'elle ne fera jamais à ta place." },
};
const PILIER_PAR_ARTICLE: Record<string, PilierGuide> = {
  "apprendre-son-texte-7-exercices-methode": "texte",
  "apprendre-son-texte-seul-comment-repeter-sans-partenaire": "texte",
  "comment-choisir-un-monologue": "texte",
  "qu-est-ce-qu-une-italienne-et-une-allemande": "texte",
  "qu-est-ce-que-le-filage-au-théâtre": "texte",
  "qu-est-ce-qu-un-souffleur-au-théâtre": "texte",
  "comment-préparer-un-casting": "casting",
  "preparer-un-casting-seul-travail-de-table": "casting",
  "masterclass-casting": "casting",
  "se-préparer-pour-casting-guide-pratique-pour-le-réussir": "casting",
  "carriere-ce-que-vous-vivez-entre-deux-castings": "casting",
  "pourquoi-tourner-une-scène-ou-un-monologue-peut-transformer-votre-candidature-de-comédien-ne": "casting",
  "le-travail-de-table-la-préparation-qui-libère-le-jeu": "jeu",
  "le-travail-de-table": "jeu",
  "maîtriser-la-méthode-o-q-p-pour-une-interprétation-réaliste": "jeu",
  "le-jeu-non-verbal-à-l-image": "jeu",
  "exercices-jeu-dacteur": "entrainement",
  "10-exercices-de-théâtre-pour-débutants-apprendre-à-jouer-en-s-amusant": "entrainement",
  "le-cv-d-acteur-comment-le-faire-et-le-faire-bien": "carriere",
  "comment-devenir-acteur-quand-on-habite-à-avignon-guide-complet": "carriere",
  "pourquoi-une-vidéo-de-présentation-professionnelle": "carriere",
  "comment-bien-se-préparer-pour-un-shooting-photo": "carriere",
  "les-erreurs-à-éviter-lors-d-un-shooting-photo": "carriere",
  "conseils-et-astuces-pour-une-séance-de-shooting-réussie": "carriere",
  "l-ia-peut-elle-remplacer-l-acteur-non-l-aider-à-mieux-préparer-oui": "ia",
  "pourquoi-iacteur-et-pas-chatgpt-claude-ou-gemini": "ia",
};
export const pilierArticle = (a: Article): PilierGuide | null => PILIER_PAR_ARTICLE[a.slug] ?? null;
