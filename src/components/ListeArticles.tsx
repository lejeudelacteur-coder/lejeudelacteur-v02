// La liste paginée du blog (page /news et pages des catégories).
import Link from "next/link";
import CarteArticle from "@/components/CarteArticle";
import { BoutonRouge, Titre } from "@/components/Scene";
import { ARTICLES, PAR_PAGE, categories, type Article } from "@/lib/blog";

export default function ListeArticles({
  titre,
  chapo,
  base,
  articles,
  page,
  actuelle,
}: {
  titre: string;
  chapo: string;
  base: string; // adresse de la liste, sans ?page
  articles: Article[];
  page: number;
  actuelle?: string; // slug de la catégorie affichée
}) {
  const pages = Math.max(1, Math.ceil(articles.length / PAR_PAGE));
  const affiches = articles.slice((page - 1) * PAR_PAGE, page * PAR_PAGE);
  const lien = (n: number) => (n <= 1 ? base : `${base}?page=${n}`);
  const pastille = (actif: boolean) =>
    `rounded-full border px-3 py-1 text-sm ${actif ? "border-rouge bg-rouge text-white" : "border-secondaire/40 text-secondaire"}`;
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-16">
      <header className="flex flex-col gap-4">
        <p className="font-accent text-3xl italic sm:text-4xl">{chapo}</p>
        <h1 className="font-affiche text-[3.2rem] uppercase leading-[0.95] sm:text-7xl">{titre}</h1>
        <nav aria-label="Catégories" className="flex flex-wrap gap-2">
          <Link href="/news" className={pastille(!actuelle)}>
            Tous ({ARTICLES.length})
          </Link>
          {categories().map((c) => (
            <Link key={c.slug} href={`/news/categories/${encodeURIComponent(c.slug)}`} className={pastille(actuelle === c.slug)}>
              {c.nom} ({c.nombre})
            </Link>
          ))}
        </nav>
      </header>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {affiches.map((a) => (
          <CarteArticle key={a.slug} a={a} />
        ))}
      </ul>

      {pages > 1 && (
        <nav aria-label="Pages" className="flex items-center justify-between gap-4 font-affiche text-lg uppercase">
          {page > 1 ? <Link href={lien(page - 1)}>← Plus récents</Link> : <span />}
          <span className="font-sans text-sm normal-case text-secondaire">
            Page {page} sur {pages}
          </span>
          {page < pages ? <Link href={lien(page + 1)}>Plus anciens →</Link> : <span />}
        </nav>
      )}

      <section className="mt-6 flex flex-col gap-3 rounded-lg border-2 border-rouge p-6 sm:p-8">
        <Titre rouge="d'acteur ?">Envie de jouer ta vie</Titre>
        <p className="max-w-2xl text-lg">Viens essayer un cours à Avignon : le premier cours d&apos;essai est gratuit.</p>
        <div>
          <BoutonRouge href="/cours-loisirs#contact">Mon cours d&apos;essai gratuit</BoutonRouge>
        </div>
      </section>
    </main>
  );
}
