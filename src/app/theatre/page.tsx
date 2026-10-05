// LE THÉÂTRE DE L'ORIFLAMME — même adresse que sur Wix
// (/théâtredeloriflamme, voir next.config.ts). Photos : dossier
// LE JEU 2026 / 08 EQUIPE / L'ORIFLAMME.
import type { Metadata } from "next";
import Image from "next/image";
import { BoutonRouge, Scene, Titre } from "@/components/Scene";

export const metadata: Metadata = {
  title: "Le théâtre de l'Oriflamme, à Avignon",
  description:
    "L'école Le Jeu de l'Acteur est installée au théâtre de l'Oriflamme, 5 rue Portail Matheron, en plein cœur d'Avignon : une salle, un plateau, et un hall pour se retrouver.",
  alternates: { canonical: "/th%C3%A9%C3%A2tredeloriflamme" },
};

const PHOTOS: [string, string][] = [
  ["salle", "La salle du théâtre de l'Oriflamme"],
  ["hall", "Le hall du théâtre"],
  ["plateau-1", "Travail de scène sur le plateau"],
  ["plateau-2", "Rires pendant une répétition"],
];

export default function Theatre() {
  return (
    <main className="flex flex-col overflow-x-clip">
      <header className="relative flex min-h-[60svh] flex-col justify-end overflow-hidden">
        <Image
          src="/theatre/facade.jpg"
          alt="La façade du théâtre de l'Oriflamme, rue Portail Matheron à Avignon"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-12">
          <p className="font-accent text-3xl italic sm:text-4xl">Notre plateau.</p>
          <h1 className="mt-2 font-affiche text-[3.4rem] uppercase leading-[0.9] sm:text-8xl">
            Le théâtre de <span className="text-rouge">l&apos;Oriflamme.</span>
          </h1>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-20 px-5 py-20">
        <section className="flex flex-col gap-6">
          <Scene numero="01" nom="Le lieu" />
          <Titre rouge="d'Avignon.">En plein cœur</Titre>
          <p className="max-w-2xl text-lg">
            L&apos;école d&apos;art dramatique Le Jeu de l&apos;Acteur est installée au théâtre de l&apos;Oriflamme, 5 rue
            Portail Matheron, à Avignon. Une salle, un plateau pour jouer et tourner, et un hall pour se retrouver.
          </p>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PHOTOS.map(([f, alt]) => (
              <li key={f} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image src={`/theatre/${f}.jpg`} alt={alt} fill sizes="(min-width: 640px) 480px, 100vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <Scene numero="02" nom="Venir" />
          <p className="text-lg">5 rue Portail Matheron, 84000 Avignon</p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Th%C3%A9%C3%A2tre+de+l%27Oriflamme+5+rue+Portail+Matheron+Avignon"
            target="_blank"
            rel="noreferrer"
            className="self-start text-rouge underline"
          >
            Ouvrir dans Google Maps →
          </a>
          <div className="mt-4">
            <BoutonRouge href="/#contact">Venir faire un cours d&apos;essai</BoutonRouge>
          </div>
        </section>
      </div>
    </main>
  );
}
