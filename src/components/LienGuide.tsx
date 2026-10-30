// LE LIEN VERS LE GUIDE (30/10/2026) : en fin d'article, le guide d'iacteur.com dont l'article est un satellite. Gros (David :
// « il faut que ce soit plus gros »). Passe par iacteur.com/go/ecole/<guide> : la provenance « ecole-<article> » apparaît
// dans ADMIN > VISITES d'IACTEUR.
import { BoutonRouge } from "@/components/Scene";
import { campagneArticle, GUIDES_IACTEUR, type PilierGuide } from "@/lib/blog";

export default function LienGuide({ pilier, slug }: { pilier: PilierGuide; slug: string }) {
  const g = GUIDES_IACTEUR[pilier];
  const lien = `https://iacteur.com/go/ecole/${g.go}?m=blog&c=${campagneArticle(slug)}`;
  return (
    <aside className="flex flex-col gap-3 rounded-lg border-2 border-rouge bg-surface p-6" aria-label="Guide IACTEUR">
      <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">Cet article fait partie d&apos;un guide</p>
      <p className="font-affiche text-3xl uppercase leading-none sm:text-4xl">{g.nom}</p>
      <p className="text-lg">{g.phrase}</p>
      <div className="pt-1">
        <BoutonRouge href={lien}>Lire le guide</BoutonRouge>
      </div>
    </aside>
  );
}
