import type { NextConfig } from "next";

// Les adresses de Wix avec un accent (ex. /équipe) sont gardées telles
// quelles pour le référencement : la page vit dans un dossier sans accent
// (Next.js ne gère pas les accents dans les noms de dossiers), et l'adresse
// accentuée y mène sans changer dans la barre du navigateur.
const ADRESSES_ACCENTUEES: [string, string][] = [["/%C3%A9quipe", "/equipe"]];

const nextConfig: NextConfig = {
  async rewrites() {
    return ADRESSES_ACCENTUEES.map(([source, destination]) => ({ source, destination }));
  },
  async redirects() {
    // L'adresse sans accent renvoie vers l'adresse officielle (une seule
    // adresse par page pour Google)
    return ADRESSES_ACCENTUEES.map(([source, destination]) => ({ source: destination, destination: source, permanent: true }));
  },
};

export default nextConfig;
