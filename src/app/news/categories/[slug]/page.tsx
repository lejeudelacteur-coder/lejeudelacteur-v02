// Une catégorie du blog — mêmes adresses que sur Wix (/news/categories/<slug>).
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ListeArticles from "@/components/ListeArticles";
import { ARTICLES, categories, decoder } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories().map((c) => ({ slug: c.slug }));
}

function trouver(slug: string) {
  return categories().find((c) => c.slug === decoder(slug));
}

export async function generateMetadata({ params }: PageProps<"/news/categories/[slug]">): Promise<Metadata> {
  const c = trouver((await params).slug);
  if (!c) return {};
  return {
    title: `${c.nom} : le blog du Jeu de l'Acteur`,
    description: `Les articles « ${c.nom} » du blog du Jeu de l'Acteur, école de comédiens à Avignon.`,
    alternates: { canonical: `/news/categories/${c.slug}` },
  };
}

export default async function Categorie({ params, searchParams }: PageProps<"/news/categories/[slug]">) {
  const c = trouver((await params).slug);
  if (!c) notFound();
  const page = Math.max(1, Math.floor(Number((await searchParams).page)) || 1);
  return (
    <ListeArticles
      titre={`${c.nom}.`}
      chapo="Le blog"
      base={`/news/categories/${encodeURIComponent(c.slug)}`}
      articles={ARTICLES.filter((a) => a.categories.some((x) => x.slug === c.slug))}
      page={page}
      actuelle={c.slug}
    />
  );
}
