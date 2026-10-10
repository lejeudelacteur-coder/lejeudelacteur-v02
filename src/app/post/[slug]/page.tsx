// UN ARTICLE — même adresse que sur Wix (/post/<slug>), même titre, même
// description, même date : rien ne change pour Google.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CarteArticle from "@/components/CarteArticle";
import CorpsArticle from "@/components/CorpsArticle";
import { BoutonRouge } from "@/components/Scene";
import BandeauIacteur from "@/components/BandeauIacteur";
import CtaArticle from "@/components/CtaArticle";
import VuesDavid from "@/components/VuesDavid";
import { ARTICLES, articleParSlug, corpsArticle, dateFr, decoder, estArticleActeur, estArticleMetier, articlePourIacteur, articlesLies, nettoyerCorps, LES_PLUS_LUS, LES_PLUS_RECENTS } from "@/lib/blog";

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

// Pour les articles « IACTEUR d'abord » : on coupe le texte vers le premier tiers, à la fin d'un
// paragraphe qui n'est ni dans une liste ni dans une citation, et le bandeau s'y glisse.
function couperVersLeTiers(html: string, part = 0.3): [string, string] {
  const debut = Math.floor(html.length * part);
  const fin = /<\/p>/g;
  fin.lastIndex = debut;
  for (let m = fin.exec(html); m; m = fin.exec(html)) {
    const avant = html.slice(0, m.index + 4);
    const ouvre = (balise: string) => (avant.match(new RegExp(`<${balise}[ >]`, "g")) ?? []).length;
    const ferme = (balise: string) => (avant.match(new RegExp(`</${balise}>`, "g")) ?? []).length;
    if (ouvre("li") === ferme("li") && ouvre("blockquote") === ferme("blockquote") && ouvre("ul") === ferme("ul") && ouvre("ol") === ferme("ol")) {
      return [avant, html.slice(avant.length)];
    }
  }
  return [html, ""];
}

export default async function Article({ params }: PageProps<"/post/[slug]">) {
  const a = articleParSlug(decoder((await params).slug));
  if (!a) notFound();
  const { html, avaitClap } = nettoyerCorps(await corpsArticle(a));
  const iacteurDabord = articlePourIacteur(a);
  // CV PRO (10/10, David) : bandeau « Ton CV d'acteur Pro » sur les articles casting / métier,
  // les plus lus (ceux qui amènent du monde) et les 12 plus récents ; ailleurs, le bandeau habituel
  const metier = estArticleMetier(a) || articlePourIacteur(a) || LES_PLUS_RECENTS.some((x) => x.slug === a.slug);
  const [debutHtml, suiteHtml] = iacteurDabord ? couperVersLeTiers(html) : [html, ""];
  // MAILLAGE (10/10) : les articles du même SUJET ; le plus proche est proposé dans le texte
  // (« À lire aussi », vers les deux tiers d'un article assez long), les 3 suivants en fin d'article
  const lies = articlesLies(a, 4);
  const dansLeTexte = html.length > 3500 ? lies[0] : undefined;
  const voisins = (dansLeTexte ? lies.slice(1) : lies).slice(0, 3);
  // Dans un article « IACTEUR d'abord », le bandeau est déjà au premier tiers : le lien va dans la suite
  const [avantLien, apresLien] = dansLeTexte
    ? iacteurDabord
      ? couperVersLeTiers(suiteHtml, 0.5)
      : couperVersLeTiers(html, 0.66)
    : ["", ""];
  const aLire = dansLeTexte && apresLien ? (
    <aside className="border-l-4 border-rouge py-1 pl-4">
      <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">À lire aussi</p>
      <Link href={`/post/${encodeURIComponent(dansLeTexte.slug)}`} className="font-affiche text-xl uppercase leading-tight underline hover:text-rouge">
        {dansLeTexte.titre}
      </Link>
    </aside>
  ) : null;
  // Liens vers les plus lus et les plus récents (jamais l'article lui-même ni ceux déjà proposés) ;
  // la sélection tourne d'un article à l'autre pour que tous reçoivent des liens
  const dejaVus = new Set([a.slug, ...voisins.map((v) => v.slug)]);
  const rang = Math.max(0, ARTICLES.findIndex((x) => x.slug === a.slug));
  const tourner = <T,>(liste: T[], n: number) => (liste.length ? Array.from({ length: Math.min(n, liste.length) }, (_, i) => liste[(rang + i) % liste.length]) : []);
  const plusLus = tourner(LES_PLUS_LUS.filter((x) => !dejaVus.has(x.slug)), 4);
  const plusRecents = tourner(LES_PLUS_RECENTS.filter((x) => !dejaVus.has(x.slug) && !plusLus.some((y) => y.slug === x.slug)), 4);
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
          {a.lecture && ` · ${a.lecture}`} <VuesDavid slug={a.slug} className="text-rouge" />
        </p>
      </header>

      {a.couverture && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-surface">
          <Image src={`/blog/${a.couverture}`} alt={a.titre} fill priority sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
        </div>
      )}

      {iacteurDabord ? (
        <>
          <CorpsArticle html={debutHtml} titre={a.titre} />
          <BandeauIacteur variante={metier ? "cv" : "public"} />
          {aLire ? (
            <>
              <CorpsArticle html={avantLien} titre={a.titre} />
              {aLire}
              <CorpsArticle html={apresLien} titre={a.titre} />
            </>
          ) : (
            suiteHtml && <CorpsArticle html={suiteHtml} titre={a.titre} />
          )}
        </>
      ) : aLire ? (
        <>
          <CorpsArticle html={avantLien} titre={a.titre} />
          {aLire}
          <CorpsArticle html={apresLien} titre={a.titre} />
        </>
      ) : (
        <CorpsArticle html={html} titre={a.titre} />
      )}

      {a.tags.length > 0 && <p className="text-sm text-secondaire">{a.tags.map((t) => `#${t.replace(/\s+/g, "")}`).join("  ")}</p>}

      {!iacteurDabord && (
      <CtaArticle
        acteur={estArticleActeur(a) || avaitClap}
        ecole={
          <section className="flex flex-col gap-3 rounded-lg border-2 border-rouge p-6">
            <p className="font-affiche text-3xl uppercase leading-none">Envie de jouer ?</p>
            <p className="text-lg">Viens essayer un cours à Avignon, théâtre et cinéma : le premier cours d&apos;essai est gratuit.</p>
            <div>
              <BoutonRouge href="/cours-loisirs#contact">Mon cours d&apos;essai gratuit</BoutonRouge>
            </div>
          </section>
        }
        iacteur={<BandeauIacteur variante={metier ? "cv" : "public"} />}
      />
      )}

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
      <div className="grid gap-8 border-t border-secondaire/20 pt-8 sm:grid-cols-2">
        {[
          ["Les plus lus", plusLus],
          ["Les plus récents", plusRecents],
        ].map(([titre, liste]) => (
          <nav key={titre as string} aria-label={titre as string} className="flex flex-col gap-3">
            <h2 className="font-affiche text-2xl uppercase">{titre as string}</h2>
            <ul className="flex flex-col gap-2">
              {(liste as typeof plusLus).map((x) => (
                <li key={x.slug}>
                  <Link href={`/post/${encodeURIComponent(x.slug)}`} className="underline hover:text-rouge">
                    {x.titre}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </main>
  );
}
