// LES DERNIERS ARTICLES DU BLOG en bas de l'accueil, avant le pied de page (David, 21/10/2026 :
// « des pastilles des derniers articles du blog, comme il y avait avant sur Wix »).
// « bande » (choisie par David) : 6 petites cartes qui défilent au doigt sur téléphone ; « grille » : 3 cartes.
import Image from "next/image";
import Link from "next/link";
import CarteArticle from "@/components/CarteArticle";
import { Scene, Titre } from "@/components/Scene";
import { ARTICLES, dateFr } from "@/lib/blog";

export default function DerniersArticles({ mode, numero }: { mode: "grille" | "bande"; numero: string }) {
  const articles = ARTICLES.slice(0, mode === "grille" ? 3 : 6);
  return (
    <section className="flex flex-col gap-6">
      <Scene numero={numero} nom="Le blog" />
      <Titre rouge="du plateau.">Les dernières nouvelles</Titre>
      {mode === "grille" ? (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <CarteArticle key={a.slug} a={a} />
          ))}
        </ul>
      ) : (
        <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
          {articles.map((a) => (
            <li key={a.slug} className="w-[70%] shrink-0 snap-start sm:w-auto">
              <Link href={`/post/${encodeURIComponent(a.slug)}`} className="group flex h-full flex-col overflow-hidden rounded-lg border border-secondaire/20">
                <div className="relative aspect-[16/9] bg-surface">
                  {a.miniature && <Image src={`/blog/${a.miniature}`} alt="" fill sizes="(min-width: 640px) 330px, 70vw" className="object-cover" />}
                </div>
                <div className="flex flex-1 flex-col gap-1 p-3">
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.15em] text-rouge">{dateFr(a.date)}</p>
                  <h3 className="line-clamp-3 font-affiche text-lg uppercase leading-tight group-hover:text-rouge">{a.titre}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link href="/news" className="self-start font-bold underline underline-offset-4 hover:text-rouge">
        Tous les articles du blog →
      </Link>
    </section>
  );
}
