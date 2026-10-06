// Une catégorie du blog — mêmes adresses que sur Wix (/news/categories/<slug>).
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ListeArticles from "@/components/ListeArticles";
import { ARTICLES, categories, chercher, decoder } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories().map((c) => ({ slug: c.slug }));
}

function trouver(slug: string) {
  return categories().find((c) => c.slug === decoder(slug));
}

export async function generateMetadata({ params, searchParams }: PageProps<"/news/categories/[slug]">): Promise<Metadata> {
  const c = trouver((await params).slug);
  if (!c) return {};
  const enRecherche = Boolean((await searchParams).q);
  return {
    ...(enRecherche ? { robots: { index: false, follow: true } } : {}),
    title: `${c.nom} : le blog du Jeu de l'Acteur`,
    description: `Les articles « ${c.nom} » du blog du Jeu de l'Acteur, école de comédiens à Avignon.`,
    alternates: { canonical: `/news/categories/${c.slug}` },
  };
}

export default async function Categorie({ params, searchParams }: PageProps<"/news/categories/[slug]">) {
  const c = trouver((await params).slug);
  if (!c) notFound();
  const parametres = await searchParams;
  const page = Math.max(1, Math.floor(Number(parametres.page)) || 1);
  const recherche = (Array.isArray(parametres.q) ? parametres.q[0] : (parametres.q ?? "")).trim().slice(0, 80);
  return (
    <ListeArticles
      titre={`${c.nom}.`}
      chapo="Le blog"
      base={`/news/categories/${encodeURIComponent(c.slug)}`}
      articles={chercher(ARTICLES.filter((a) => a.categories.some((x) => x.slug === c.slug)), recherche)}
      recherche={recherche}
      page={page}
      actuelle={c.slug}
    />
  );
}
