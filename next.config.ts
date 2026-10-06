import type { NextConfig } from "next";

// Les adresses de Wix avec un accent (ex. /équipe) sont gardées telles
// quelles pour le référencement : la page vit dans un dossier sans accent
// (Next.js ne gère pas les accents dans les noms de dossiers), et l'adresse
// accentuée y mène sans changer dans la barre du navigateur.
const ADRESSES_ACCENTUEES: [string, string][] = [
  ["/%C3%A9quipe", "/equipe"],
  ["/book-vid%C3%A9o", "/book-video"],
  ["/th%C3%A9%C3%A2tredeloriflamme", "/theatre"],
];

const nextConfig: NextConfig = {
  async rewrites() {
    return ADRESSES_ACCENTUEES.map(([source, destination]) => ({ source, destination }));
  },
  async redirects() {
    return [
      // L'adresse sans accent renvoie vers l'adresse officielle (une seule
      // adresse par page pour Google)
      ...ADRESSES_ACCENTUEES.map(([source, destination]) => ({ source: destination, destination: source, permanent: true })),
      // Anciennes pages Wix regroupées
      { source: "/stages", destination: "/stages-casting", permanent: true },
      { source: "/formations", destination: "/", permanent: true },
      // Les anciennes pages de l'app IACTEUR sur Wix : l'app a déménagé sur iacteur.com
      ...[
        "loge", "solo", "duo", "coach", "repet", "mes-textes", "mes-evenements", "mes-coachings",
        "mes-annonces", "mon-pass", "mon-interview", "ma-regie", "annonce",
      ].map((p) => ({ source: `/${p}`, destination: `https://iacteur.com/${p}`, permanent: true })),
      { source: "/iacteur", destination: "https://iacteur.com", permanent: true },
      { source: "/creer", destination: "https://iacteur.com/loge", permanent: true },
      { source: "/ma-carriere", destination: "https://iacteur.com/carriere", permanent: true },
      { source: "/casting", destination: "https://iacteur.com/casting-call", permanent: true },
      // Anciennes pages du site Wix
      { source: "/copie-de-rgpd", destination: "/rgpd", permanent: true },
      { source: "/actualit%C3%A9", destination: "/news", permanent: true },
      { source: "/saison-2019-2020", destination: "/news", permanent: true },
      { source: "/saison-2020-2021", destination: "/news", permanent: true },
      { source: "/saison-2021-2022", destination: "/news", permanent: true },
      { source: "/saison-2022-2023", destination: "/news", permanent: true },
      { source: "/cursus-pro-saison-2023-2024", destination: "/cours-pros", permanent: true },
      { source: "/loisirs-saison-2023-2024", destination: "/cours-loisirs", permanent: true },
      { source: "/faq", destination: "/", permanent: true },
      { source: "/en-ligne", destination: "/", permanent: true },
      { source: "/ancienne-page", destination: "/", permanent: true },
      { source: "/copie-de-app", destination: "/", permanent: true },
      { source: "/essai-boite-scrolle", destination: "/", permanent: true },
      // Catégorie du blog sans aucun article : retour à la liste
      { source: "/news/categories/sacr%C3%A9-coeur", destination: "/news", permanent: true },
    ];
  },
};

export default nextConfig;
