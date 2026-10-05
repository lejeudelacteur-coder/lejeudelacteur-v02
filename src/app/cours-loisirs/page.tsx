// COURS LOISIRS — même adresse que sur Wix (/cours-loisirs). Contenu repris
// de la page Wix, année en cours (2026-2027). Pas de Partenaire de jeu ici.
import type { Metadata } from "next";
import Image from "next/image";
import FormulaireContact from "@/components/FormulaireContact";
import { BoutonRouge, Scene, Titre } from "@/components/Scene";

export const metadata: Metadata = {
  title: "Cours de théâtre et de cinéma à Avignon, tous niveaux",
  description:
    "Cours loisirs de théâtre et de jeu face caméra à Avignon, le soir en semaine : respiration, diction, improvisation, tournage de scènes et projection sur grand écran en fin d'année. Cours d'essai gratuit.",
  alternates: { canonical: "/cours-loisirs" },
};

const GROUPES: { nom: string; genre: string; jour: string; avec: string }[] = [
  { nom: "Groupe I", genre: "Cinéma", jour: "Mardi", avec: "David Rousseau" },
  { nom: "Groupe II", genre: "Cinéma", jour: "Mercredi", avec: "Myriam Waelkens" },
  { nom: "Groupe III", genre: "Théâtre", jour: "Jeudi", avec: "Nicolas Laurent" },
];

// Tarifs décidés par David le 06/10/2026 : 2e cours à 400 €, 3e cours sur
// demande (les groupes sont complets : une place à prix réduit prendrait celle
// d'un élève au tarif plein).
const TARIFS: [string, string][] = [
  ["1 cours par semaine", "520 € / an"],
  ["Un 2e cours", "+ 400 € / an"],
  ["Un 3e cours", "sur demande"],
];

export default function CoursLoisirs() {
  return (
    <main className="flex flex-col overflow-x-clip">
      {/* La projection de fin d'année, montrée en entier (sans texte par-dessus,
          sinon on ne voit ni l'écran ni les fauteuils rouges) */}
      <header className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 pt-12">
        <div>
          <p className="font-accent text-3xl italic sm:text-4xl">Pour le plaisir de jouer.</p>
          <h1 className="mt-2 font-affiche text-[3.6rem] uppercase leading-[0.9] sm:text-8xl">
            Les cours <span className="text-rouge">loisirs.</span>
          </h1>
        </div>
        <figure className="flex flex-col gap-2">
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
            <Image
              src="/accueil/projection.jpg"
              alt="La projection de fin d'année sur grand écran, dans la salle du théâtre"
              fill
              priority
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="text-sm text-secondaire">En fin d&apos;année, vos films projetés sur grand écran.</figcaption>
        </figure>
        <p className="max-w-xl text-lg text-secondaire">
          Théâtre et cinéma à Avignon, tous niveaux, le soir en semaine. Pour s&apos;épanouir, prendre confiance, et
          découvrir la richesse du métier d&apos;acteur, loin de la contrainte professionnelle.
        </p>
        <div>
          <BoutonRouge href="#contact">Mon cours d&apos;essai gratuit</BoutonRouge>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-5 py-20">
        <section className="flex flex-col gap-6">
          <Scene numero="01" nom="Le programme" />
          <Titre rouge="sans pression.">Du vrai jeu,</Titre>
          <p className="max-w-2xl text-lg">
            Le travail intérieur d&apos;abord, essentiel à l&apos;authenticité du jeu, dans un cadre bienveillant. Des
            exercices de respiration et de diction pour affûter ta voix. L&apos;improvisation, socle de la spontanéité,
            pour construire le personnage à travers des actions concrètes.
          </p>
          <p className="max-w-2xl text-lg">
            Le programme alterne l&apos;exigence du plateau de théâtre et les nuances du jeu à l&apos;image, avec le
            tournage de monologues et de scènes. Ludique et concret, ce travail améliore aussi ta prise de parole en
            public et ta façon de t&apos;affirmer.
          </p>
          <p className="font-affiche text-2xl uppercase leading-snug sm:text-3xl">
            En fin d&apos;année : <span className="text-rouge">projection sur grand écran</span> de vos films.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <Scene numero="02" nom="Feuille de service" />
          <Titre rouge="18h30 → 21h30.">Le soir,</Titre>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {GROUPES.map((g) => (
              <li key={g.nom} className="flex flex-col gap-1 rounded-lg border border-secondaire/20 p-5">
                <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">
                  {g.nom} · {g.genre}
                </p>
                <h3 className="font-affiche text-3xl uppercase">{g.jour}</h3>
                <p className="text-secondaire">18h30 – 21h30, avec {g.avec}</p>
              </li>
            ))}
          </ul>
          <p className="text-secondaire">De septembre à juin, hors vacances scolaires.</p>
        </section>

        <section className="flex flex-col gap-6">
          <Scene numero="03" nom="L'investissement" />
          <Titre>Tarifs 2026-2027.</Titre>
          <div className="flex flex-col divide-y divide-secondaire/20 rounded-lg border border-secondaire/20">
            {TARIFS.map(([t, p]) => (
              <div key={t} className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4">
                <span className="text-lg">{t}</span>
                <span className="font-bold">{p}</span>
              </div>
            ))}
          </div>
          <p className="text-secondaire">
            Frais d&apos;inscription inclus. Engagement à l&apos;année ; modalités de paiement sur la fiche de
            pré-inscription.
          </p>
        </section>

        <section id="contact" className="flex scroll-mt-20 flex-col gap-6">
          <Scene numero="04" nom="À toi de jouer" />
          <Titre rouge="c'est gratuit.">Ton cours d&apos;essai :</Titre>
          <p className="max-w-2xl text-lg">
            Laisse-nous tes coordonnées et dis-nous quel groupe t&apos;intéresse : on te rappelle pour fixer ta séance
            d&apos;essai. Ou appelle le{" "}
            <a href="tel:+33623181579" className="font-bold underline">
              06 23 18 15 79
            </a>
            .
          </p>
          <FormulaireContact sujet="loisirs" />
        </section>
      </div>
    </main>
  );
}
