// LE BLOG — même adresse que sur Wix (/news).
import type { Metadata } from "next";
import ListeArticles from "@/components/ListeArticles";
import { ARTICLES } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Actualités et conseils pour acteurs : le blog",
  description:
    "Conseils de jeu, préparation aux castings, cinéma, théâtre : le blog du Jeu de l'Acteur, école de comédiens à Avignon.",
  alternates: { canonical: "/news" },
};

export default async function Blog({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const page = Math.max(1, Math.floor(Number((await searchParams).page)) || 1);
  return (
    <ListeArticles
      titre="Le blog."
      chapo="Conseils, castings, coulisses."
      base="/news"
      articles={ARTICLES}
      page={page}
    />
  );
}
