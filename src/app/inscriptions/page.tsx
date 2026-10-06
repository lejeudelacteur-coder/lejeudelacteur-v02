// INSCRIPTIONS — même adresse que sur Wix (/inscriptions) : un aiguillage
// vers la bonne formation, et un formulaire.
import type { Metadata } from "next";
import Link from "next/link";
import FormulaireContact from "@/components/FormulaireContact";
import { Scene, Titre } from "@/components/Scene";

export const metadata: Metadata = {
  title: "Inscriptions : école d'art dramatique à Avignon",
  description:
    "S'inscrire au Jeu de l'Acteur, école de théâtre et de cinéma à Avignon : formation intensive, Pro du lundi, cours loisirs (premier cours d'essai gratuit), stages.",
  alternates: { canonical: "/inscriptions" },
};

const CHOIX: { href: string; nom: string; texte: string }[] = [
  { href: "/cours-intensif#candidature", nom: "Cours intensif", texte: "Devenir acteur en 10 mois : candidature en 6 questions, puis entretien." },
  { href: "/cours-pros#contact", nom: "Pro du lundi", texte: "Le lundi soir, face caméra : on t'invite à venir essayer." },
  { href: "/cours-loisirs#contact", nom: "Cours loisirs", texte: "Le premier cours d'essai est gratuit. L'inscription est obligatoire pour y participer." },
  { href: "/stages-casting", nom: "Stage casting", texte: "Cinq jours pour préparer les castings." },
];

export default function Inscriptions() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-5 py-16">
      <header className="flex flex-col gap-4">
        <p className="font-accent text-3xl italic sm:text-4xl">École d&apos;art dramatique à Avignon.</p>
        <h1 className="font-affiche text-[3.2rem] uppercase leading-[0.95] sm:text-7xl">
          Les <span className="text-rouge">inscriptions.</span>
        </h1>
        <p className="max-w-2xl text-lg text-secondaire">
          Théâtre et cinéma. Dès réception de ta demande, nous te contactons dans les meilleurs délais.
        </p>
      </header>

      <section className="flex flex-col gap-6">
        <Scene numero="01" nom="Quelle formation ?" />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CHOIX.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="group flex h-full flex-col gap-2 rounded-lg border border-secondaire/20 p-5">
                <h2 className="font-affiche text-3xl uppercase group-hover:text-rouge">{c.nom}</h2>
                <p className="text-secondaire">{c.texte}</p>
                <span className="mt-auto font-affiche text-lg uppercase text-rouge">S&apos;inscrire →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className="flex scroll-mt-20 flex-col gap-6">
        <Scene numero="02" nom="Contacte-nous" />
        <Titre rouge="on te rappelle.">Une question ?</Titre>
        <p className="max-w-2xl text-lg">
          Tu peux aussi appeler le{" "}
          <a href="tel:+33623181579" className="font-bold underline">
            06 23 18 15 79
          </a>{" "}
          ou écrire à{" "}
          <a href="mailto:contact@lejeudelacteur.com" className="font-bold underline">
            contact@lejeudelacteur.com
          </a>
          .
        </p>
        <FormulaireContact />
      </section>
    </main>
  );
}
