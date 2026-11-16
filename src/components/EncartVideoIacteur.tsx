// L'ENCART « GRANDE VIDÉO » (16/11/2026, David) : la démo complète d'IACTEUR (7 minutes, YouTube) dans les articles qui
// parlent de l'IA ou d'IACTEUR en général, sans viser un module en particulier (pour un module précis : EncartIacteur).
// La vidéo ne se charge qu'au toucher (VideoYoutube). Le lien passe par iacteur.com/go/ecole : la provenance
// « ecole-<article> » apparaît dans ADMIN > VISITES d'IACTEUR.
import VideoYoutube from "@/components/VideoYoutube";
import { BoutonRouge } from "@/components/Scene";
import { campagneArticle } from "@/lib/blog";

export const VIDEO_DEMO_IACTEUR = "_h43WcFmvw4";

export default function EncartVideoIacteur({ slug }: { slug: string }) {
  const lien = `https://iacteur.com/go/ecole?m=blog&c=${campagneArticle(slug)}`;
  return (
    <aside className="flex flex-col gap-3 rounded-lg border-2 border-rouge bg-surface p-5" aria-label="IACTEUR en vidéo">
      <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">IACTEUR · la démo en vidéo</p>
      <p className="font-affiche text-2xl uppercase leading-none">L&apos;appli de l&apos;acteur, en 7 minutes.</p>
      <VideoYoutube id={VIDEO_DEMO_IACTEUR} titre="L'appli de l'acteur : textes, coaching, répliques, casting, carrière | IACTEUR" />
      <p className="text-base">Des textes à jouer, du coaching, une voix qui te donne la réplique, le suivi de ta carrière : tous les modules, en vrai, sur un téléphone.</p>
      <div className="pt-1">
        <BoutonRouge href={lien}>Entrer dans IACTEUR</BoutonRouge>
      </div>
    </aside>
  );
}
