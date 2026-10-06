// LE BLOG — même adresse que sur Wix (/news).
import type { Metadata } from "next";
import ListeArticles from "@/components/ListeArticles";
import { ARTICLES, chercher } from "@/lib/blog";

const base: Metadata = {
  title: "Actualités et conseils pour acteurs : le blog",
  description:
    "Conseils de jeu, préparation aux castings, cinéma, théâtre : le blog du Jeu de l'Acteur, école de comédiens à Avignon.",
  alternates: { canonical: "/news" },
};

// Les pages de résultats de recherche ne sont pas pour Google
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
  return (await searchParams).q ? { ...base, robots: { index: false, follow: true } } : base;
}

export default async function Blog({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const params = await searchParams;
  const page = Math.max(1, Math.floor(Number(params.page)) || 1);
  const recherche = (params.q ?? "").trim().slice(0, 80);
  return (
    <ListeArticles
      titre="Le blog."
      chapo="Conseils, castings, coulisses."
      base="/news"
      articles={chercher(ARTICLES, recherche)}
      recherche={recherche}
      page={page}
    />
  );
}
