// LE LIEN VERS LE GUIDE (30/10/2026) : en fin d'article, le guide d'iacteur.com dont l'article est un satellite. Passe par
// iacteur.com/go/ecole/<guide> : la provenance « ecole-<article> » apparaît dans ADMIN > VISITES d'IACTEUR.
import { campagneArticle, GUIDES_IACTEUR, type PilierGuide } from "@/lib/blog";

export default function LienGuide({ pilier, slug }: { pilier: PilierGuide; slug: string }) {
  const g = GUIDES_IACTEUR[pilier];
  const lien = `https://iacteur.com/go/ecole/${g.go}?m=blog&c=${campagneArticle(slug)}`;
  return (
    <aside className="border-l-4 border-rouge py-1 pl-4" aria-label="Guide IACTEUR">
      <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">Cet article fait partie d&apos;un guide</p>
      <a href={lien} target="_blank" rel="noopener" className="font-affiche text-xl uppercase leading-tight underline hover:text-rouge">
        {g.nom}
      </a>
      <p className="text-secondaire">{g.phrase} Le guide complet, sur IACTEUR.</p>
    </aside>
  );
}
