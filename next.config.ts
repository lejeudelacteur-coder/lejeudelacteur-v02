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
      // Catégorie du blog sans aucun article : retour à la liste
      { source: "/news/categories/sacr%C3%A9-coeur", destination: "/news", permanent: true },
    ];
  },
};

export default nextConfig;
