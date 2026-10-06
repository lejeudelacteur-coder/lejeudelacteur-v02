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
  recherche = "",
}: {
  titre: string;
  chapo: string;
  base: string; // adresse de la liste, sans ?page
  articles: Article[];
  page: number;
  actuelle?: string; // slug de la catégorie affichée
  recherche?: string;
}) {
  const pages = Math.max(1, Math.ceil(articles.length / PAR_PAGE));
  const affiches = articles.slice((page - 1) * PAR_PAGE, page * PAR_PAGE);
  const q = recherche ? `q=${encodeURIComponent(recherche)}` : "";
  const lien = (n: number) => {
    const parametres = [q, n > 1 ? `page=${n}` : ""].filter(Boolean).join("&");
    return parametres ? `${base}?${parametres}` : base;
  };
  const pastille = (actif: boolean) =>
    `rounded-full border px-3 py-1 text-sm ${actif ? "border-rouge bg-rouge text-white" : "border-secondaire/40 text-secondaire"}`;
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-16">
      <header className="flex flex-col gap-4">
        <p className="font-accent text-3xl italic sm:text-4xl">{chapo}</p>
        <h1 className="font-affiche text-[3.2rem] uppercase leading-[0.95] sm:text-7xl">{titre}</h1>
        {/* Recherche (David, 07/10) : un simple formulaire, sans JavaScript */}
        <form action={base} role="search" className="flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={recherche}
            placeholder="Rechercher un article (monologue, casting, caméra…)"
            aria-label="Rechercher un article"
            className="min-w-0 flex-1 rounded-md border border-secondaire/30 bg-black/40 px-4 py-3 text-base text-foreground placeholder:text-secondaire/60 focus:border-rouge focus:outline-none"
          />
          <button className="rounded-md bg-rouge px-5 py-3 font-affiche text-lg uppercase tracking-wide text-white">Chercher</button>
        </form>
        {recherche && (
          <p className="text-secondaire">
            {articles.length === 0
              ? `Aucun article pour « ${recherche} ».`
              : `${articles.length} article${articles.length > 1 ? "s" : ""} pour « ${recherche} ».`}{" "}
            <Link href={base} className="underline">
              Effacer la recherche
            </Link>
          </p>
        )}
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
