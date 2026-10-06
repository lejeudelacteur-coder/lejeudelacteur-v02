// STAGE CASTING — même adresse que sur Wix (/stages-casting). La page Wix
// /stages (une simple liste) mène ici (voir next.config.ts).
import type { Metadata } from "next";
import Image from "next/image";
import FormulaireContact from "@/components/FormulaireContact";
import { Scene, Titre } from "@/components/Scene";

export const metadata: Metadata = {
  title: "Stage casting à Avignon : 5 jours pour réussir tes castings",
  description:
    "Stage casting intensif de 5 jours à Avignon, pour comédiens professionnels ou en voie de professionnalisation : s'entraîner au casting, répondre aux demandes d'un réalisateur, travailler avec un agent.",
  alternates: { canonical: "/stages-casting" },
};

const OBJECTIFS = [
  "T'entraîner et améliorer ta performance lors d'un casting",
  "Apprendre à écouter les demandes d'un réalisateur et à y répondre avec fluidité",
  "Comprendre les rouages pour trouver un agent, et travailler avec lui",
];

export default function StagesCasting() {
  return (
    <main className="flex flex-col overflow-x-clip">
      <header className="relative flex min-h-[55svh] flex-col justify-end overflow-hidden">
        <Image
          src="/intensif/casting.jpg"
          alt="Séance de casting sur le plateau"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-12">
          <p className="font-accent text-3xl italic sm:text-4xl">Moteur. Annonce. Action.</p>
          <h1 className="mt-2 font-affiche text-[3.6rem] uppercase leading-[0.9] sm:text-8xl">
            Le stage <span className="text-rouge">casting.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-secondaire">
            5 jours intensifs, tout au long de l&apos;année, pour les comédiens professionnels ou en voie de
            professionnalisation.
          </p>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-5 py-20">
        <section className="flex flex-col gap-6">
          <Scene numero="01" nom="Le stage" />
          <Titre rouge="dans les conditions du réel.">Cinq jours de casting,</Titre>
          <ul className="flex flex-col gap-3">
            {OBJECTIFS.map((o) => (
              <li key={o} className="flex gap-3 text-lg">
                <span className="text-rouge">✓</span>
                {o}
              </li>
            ))}
          </ul>
          <a
            href="/documents/stage-casting.pdf"
            target="_blank"
            className="self-start rounded-md border border-foreground/40 px-5 py-3 font-affiche text-lg uppercase tracking-wide"
          >
            Télécharger le dossier de présentation (PDF)
          </a>
        </section>

        <section className="flex flex-col gap-4 rounded-lg border-2 border-rouge p-6">
          <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">Prochaine session</p>
          <p className="font-affiche text-4xl uppercase leading-none">Début 2027</p>
          <p className="text-lg">Les dates arrivent bientôt. Laisse-nous tes coordonnées pour être prévenu·e en premier.</p>
        </section>

        <section id="contact" className="flex scroll-mt-20 flex-col gap-6">
          <Scene numero="02" nom="À toi de jouer" />
          <Titre rouge="de la prochaine session.">Être prévenu·e</Titre>
          <FormulaireContact sujet="stage" />
        </section>
      </div>
    </main>
  );
}
