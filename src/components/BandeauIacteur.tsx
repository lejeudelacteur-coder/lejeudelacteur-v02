// LE BANDEAU IACTEUR (07/10/2026) : le téléphone avec la fiche casting, « Les
// castings viennent à toi ». Un seul composant, plusieurs textes selon l'endroit
// (articles du blog, accueil, pages des élèves).
import type { ReactNode } from "react";
import Image from "next/image";
import { BoutonRouge } from "@/components/Scene";

const TEXTES = {
  // Pour tous les visiteurs (blog, accueil, liste du blog)
  public: {
    eyebrow: "IACTEUR · l'espace personnel de l'acteur",
    titre: "Les castings viennent à toi.",
    texte: "Crée ta fiche casting, gratuitement : IACTEUR te propose les rôles qui te correspondent. Tes textes, ton coaching et le suivi de ta carrière sont dedans.",
    bouton: "Entrer dans IACTEUR",
  },
  // Pour les élèves de l'école (Pro du lundi, stages)
  eleves: {
    eyebrow: "Offert à nos élèves",
    titre: "IACTEUR est offert à tous nos élèves.",
    texte: "Des textes à travailler, du coaching, le suivi de ta carrière et les castings qui te correspondent : l'espace personnel de l'acteur, gratuit pour les élèves de l'école.",
    bouton: "Découvrir IACTEUR",
  },
} as const;

export default function BandeauIacteur({
  variante = "public",
  href = "https://iacteur.com",
}: {
  variante?: keyof typeof TEXTES;
  href?: string;
}): ReactNode {
  const t = TEXTES[variante];
  return (
    <section className="relative overflow-hidden rounded-lg border-2 border-rouge bg-surface">
      <div className="flex flex-col gap-3 p-6 pr-6 sm:w-3/5">
        <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">{t.eyebrow}</p>
        <p className="font-affiche text-3xl uppercase leading-none">{t.titre}</p>
        <p className="text-lg">{t.texte}</p>
        <p className="font-accent text-lg italic">Conçu par des comédiens, pour des comédiens.</p>
        <div className="relative z-10">
          <BoutonRouge href={href}>{t.bouton}</BoutonRouge>
        </div>
      </div>
      {/* Le téléphone dépasse du cadre par le bas : on n'en voit que le haut */}
      <div className="relative mx-auto -mt-4 mb-0 h-72 w-64 overflow-hidden sm:absolute sm:bottom-0 sm:right-4 sm:m-0 sm:h-[105%] sm:w-64">
        <Image
          src="/iacteur/telephone-fiche.png"
          alt="La fiche casting d'IACTEUR sur un iPhone"
          fill
          sizes="256px"
          className="object-cover object-top"
        />
      </div>
    </section>
  );
}
