// PRO DU LUNDI — même adresse que sur Wix (/cours-pros). Contenu repris de
// la page Wix (année en cours). Partenaire de jeu : 10 % (David, 06/10).
import BandeauIacteur from "@/components/BandeauIacteur";
import type { Metadata } from "next";
import Image from "next/image";
import FormulaireContact from "@/components/FormulaireContact";
import { BoutonRouge, Scene, Titre } from "@/components/Scene";

export const metadata: Metadata = {
  title: "Cours pro du lundi : théâtre & caméra à Avignon",
  description:
    "Le Pro du lundi : 4 h de jeu face caméra chaque lundi soir à Avignon, pour comédiens professionnels ou en devenir. Textes, improvisations, tournages, masterclass casting, bande démo. 4 à 8 participants.",
  alternates: { canonical: "/cours-pros" },
};

const FORMULES: { nom: string; etoiles: string; contenu: string }[] = [
  {
    nom: "À l'année",
    etoiles: "★★★",
    contenu: "Travail de textes, improvisations face caméra, tournage, 3 masterclass casting, et ta bande démo.",
  },
  {
    nom: "À la carte",
    etoiles: "★★",
    contenu: "Travail de textes, improvisations face caméra, préparation casting si besoin, et restitution de tes images.",
  },
  {
    nom: "Au cours",
    etoiles: "★",
    contenu: "Travail de textes, improvisations face caméra, préparation casting si besoin.",
  },
];

const TARIFS: [string, string][] = [
  ["Inscription à l'année", "1 170 € + 90 € de frais d'inscription"],
  ["Cours à l'unité", "50 €"],
  ["Carte de 5 cours", "200 € (hors masterclass)"],
  ["Carte de 10 cours", "380 € (hors masterclass)"],
  ["Masterclass", "50 €"],
];

export default function CoursPros() {
  return (
    <main className="flex flex-col overflow-x-clip">
      <header className="relative flex min-h-[60svh] flex-col justify-end overflow-hidden">
        <Image
          src="/intensif/tournage-large.jpg"
          alt="Une comédienne en plan serré, pendant un tournage"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_20%] opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-12">
          <p className="font-accent text-3xl italic sm:text-4xl">Le lundi soir, on tourne.</p>
          <h1 className="mt-2 font-affiche text-[3.6rem] uppercase leading-[0.9] sm:text-8xl">
            Le Pro <span className="text-rouge">du lundi.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-secondaire">
            Formation professionnelle théâtre &amp; cinéma à Avignon : 4 h par semaine pour les comédiens pros, ou qui
            veulent le devenir, tournés vers l&apos;audiovisuel (cinéma, télé, pub…).
          </p>
          <div className="mt-7">
            <BoutonRouge href="#contact">Venir essayer</BoutonRouge>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-5 py-20">
        <section className="flex flex-col gap-6">
          <Scene numero="01" nom="Le principe" />
          <Titre rouge="et une caméra.">Un plateau, quatre heures,</Titre>
          <p className="max-w-2xl text-lg">
            Chaque lundi, de 18 h 30 à 22 h 30 (hors vacances scolaires), on travaille des textes et des improvisations
            face caméra, on tourne, on regarde. Et si tu as un casting ou une audition à venir, on le prépare ensemble.
          </p>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-secondaire/20 sm:grid-cols-3">
            {(
              [
                ["4 h", "par semaine"],
                ["18h30", "à 22h30, le lundi"],
                ["4 à 8", "participants"],
              ] as const
            ).map(([n, t]) => (
              <div key={t} className="flex flex-col gap-1 bg-background p-4 last:col-span-2 sm:last:col-span-1">
                <dt className="font-affiche text-5xl text-rouge">{n}</dt>
                <dd className="text-sm uppercase tracking-wide text-secondaire">{t}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="flex flex-col gap-6">
          <Scene numero="02" nom="Les formules" />
          <Titre rouge="ton rythme.">À ta mesure, à</Titre>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {FORMULES.map((f) => (
              <li key={f.nom} className="flex flex-col gap-2 rounded-lg border border-secondaire/20 p-5">
                <span className="text-rouge">{f.etoiles}</span>
                <h3 className="font-affiche text-3xl uppercase">{f.nom}</h3>
                <p className="text-secondaire">{f.contenu}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <Scene numero="03" nom="L'investissement" />
          <Titre>Les tarifs.</Titre>
          <div className="flex flex-col divide-y divide-secondaire/20 rounded-lg border border-secondaire/20">
            {TARIFS.map(([t, p]) => (
              <div key={t} className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4">
                <span className="text-lg">{t}</span>
                <span className="font-bold text-foreground">{p}</span>
              </div>
            ))}
          </div>
          <p className="text-secondaire">
            À l&apos;année : paiement possible par trimestre ou au mois. En option : book photo comédien à 300 €, et toute
            demande spécifique sur devis.
          </p>
          <div className="flex flex-col gap-2 rounded-lg border-2 border-rouge p-6">
            <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">Partenaire de jeu</p>
            <p className="font-affiche text-3xl uppercase">Partage la scène, divise les frais.</p>
            <p>
              Inscrit à l&apos;année ou avec une carte de 5 ou 10 cours : 10 % de réduction immédiate pour toi et pour le
              nouveau partenaire de jeu que tu amènes.
            </p>
          </div>
        </section>

        {/* IACTEUR est offert aux élèves (David, 07/10) */}
        <BandeauIacteur variante="eleves" />

        <section id="contact" className="flex scroll-mt-20 flex-col gap-6">
          <Scene numero="04" nom="À toi de jouer" />
          <Titre rouge="un lundi.">Viens essayer</Titre>
          <p className="max-w-2xl text-lg">
            Laisse-nous tes coordonnées : on te rappelle pour organiser ton premier cours. Tu peux aussi appeler le{" "}
            <a href="tel:+33623181579" className="font-bold underline">
              06 23 18 15 79
            </a>
            .
          </p>
          <FormulaireContact sujet="pro" />
        </section>
      </div>
    </main>
  );
}
