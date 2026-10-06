// Une carte d'article dans les listes du blog.
import Image from "next/image";
import Link from "next/link";
import { dateFr, type Article } from "@/lib/blog";

export default function CarteArticle({ a }: { a: Article }) {
  return (
    <li>
      <Link href={`/post/${encodeURIComponent(a.slug)}`} className="group flex h-full flex-col overflow-hidden rounded-lg border border-secondaire/20">
        <div className="relative aspect-[16/9] bg-surface">
          {a.miniature && (
            <Image src={`/blog/${a.miniature}`} alt="" fill sizes="(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="font-mono text-[11px] font-black uppercase tracking-[0.15em] text-rouge">
            {a.categories[0]?.nom ?? "Blog"} · {dateFr(a.date)}
          </p>
          <h3 className="font-affiche text-2xl uppercase leading-tight group-hover:text-rouge">{a.titre}</h3>
          <p className="line-clamp-3 text-sm text-secondaire">{a.description}</p>
        </div>
      </Link>
    </li>
  );
}
