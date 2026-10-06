// UN ARTICLE — même adresse que sur Wix (/post/<slug>), même titre, même
// description, même date : rien ne change pour Google.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CarteArticle from "@/components/CarteArticle";
import CorpsArticle from "@/components/CorpsArticle";
import { BoutonRouge } from "@/components/Scene";
import { ARTICLES, articleParSlug, corpsArticle, dateFr, decoder } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/post/[slug]">): Promise<Metadata> {
  const a = articleParSlug(decoder((await params).slug));
  if (!a) return {};
  return {
    title: { absolute: a.titre },
    description: a.description,
    alternates: { canonical: `/post/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.titre,
      description: a.description,
      publishedTime: a.date,
      modifiedTime: a.modifie,
      authors: ["David Rousseau"],
      images: a.couverture ? [`/blog/${a.couverture}`] : undefined,
    },
  };
}

export default async function Article({ params }: PageProps<"/post/[slug]">) {
  const a = articleParSlug(decoder((await params).slug));
  if (!a) notFound();
  const html = await corpsArticle(a);
  const voisins = ARTICLES.filter((x) => x.slug !== a.slug && x.categories.some((c) => a.categories.some((d) => d.slug === c.slug))).slice(0, 3);
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.titre,
    description: a.description,
    datePublished: a.date,
    dateModified: a.modifie || a.date,
    author: { "@type": "Person", name: "David Rousseau" },
    publisher: { "@type": "Organization", name: "Le Jeu de l'Acteur", url: "https://www.lejeudelacteur.com" },
    image: a.couverture ? `https://www.lejeudelacteur.com/blog/${a.couverture}` : undefined,
    mainEntityOfPage: `https://www.lejeudelacteur.com/post/${a.slug}`,
  };
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className="flex flex-col gap-4">
        <nav className="font-mono text-[11px] font-black uppercase tracking-[0.15em] text-secondaire">
          <Link href="/news" className="underline">
            Le blog
          </Link>
          {a.categories[0] && (
            <>
              {" · "}
              <Link href={`/news/categories/${encodeURIComponent(a.categories[0].slug)}`} className="text-rouge underline">
                {a.categories[0].nom}
              </Link>
            </>
          )}
        </nav>
        <h1 className="font-affiche text-[2.6rem] uppercase leading-[0.98] sm:text-6xl">{a.titre}</h1>
        <p className="text-sm text-secondaire">
          David Rousseau · {dateFr(a.date)}
          {a.lecture && ` · ${a.lecture}`}
        </p>
      </header>

      {a.couverture && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-surface">
          <Image src={`/blog/${a.couverture}`} alt={a.titre} fill priority sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
        </div>
      )}

      <CorpsArticle html={html} titre={a.titre} />

      {a.tags.length > 0 && <p className="text-sm text-secondaire">{a.tags.map((t) => `#${t.replace(/\s+/g, "")}`).join("  ")}</p>}

      <section className="flex flex-col gap-3 rounded-lg border-2 border-rouge p-6">
        <p className="font-affiche text-3xl uppercase leading-none">Envie de jouer ?</p>
        <p className="text-lg">Viens essayer un cours à Avignon, théâtre et cinéma : le premier cours d&apos;essai est gratuit.</p>
        <div>
          <BoutonRouge href="/cours-loisirs#contact">Mon cours d&apos;essai gratuit</BoutonRouge>
        </div>
      </section>

      {voisins.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="font-affiche text-3xl uppercase">À lire aussi</h2>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {voisins.map((v) => (
              <CarteArticle key={v.slug} a={v} />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
