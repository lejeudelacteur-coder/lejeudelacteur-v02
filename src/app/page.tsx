// ACCUEIL du site de l'école. Contenus repris de l'accueil Wix (accroche,
// trois formations avec un avis d'élève chacune, IACTEUR, Partenaire de jeu,
// contact) et de la page « Formations » (la méthode).
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FormulaireContact from "@/components/FormulaireContact";
import { BoutonRouge, Scene, Titre } from "@/components/Scene";

export const metadata: Metadata = {
  title: { absolute: "Le Jeu de l'Acteur : école de théâtre et de cinéma à Avignon" },
  description:
    "École de théâtre et de cinéma à Avignon : formation intensive pour devenir acteur, cours pro du lundi, cours loisirs. Jeu face caméra, tournages, castings. Cours d'essai gratuit.",
  alternates: { canonical: "/" },
  openGraph: { images: ["/accueil/logo-ecole.jpg"] },
};

const FORMATIONS: {
  href: string;
  nom: string;
  accroche: string;
  texte: string;
  avis: string;
  auteur: string;
  image: string;
}[] = [
  {
    href: "/cours-intensif",
    nom: "Cours intensif",
    accroche: "Fais de ta passion ton futur métier.",
    texte: "10 mois, 12 h par semaine, tournages, préparation aux castings, bande démo et book inclus.",
    avis: "Lieu incontournable à Avignon avec de vrais professionnels !",
    auteur: "Anthony Canneddu",
    image: "/intensif/tournage.jpg",
  },
  {
    href: "/cours-pros",
    nom: "Pro du lundi",
    accroche: "Affine ta technique, booste ta carrière.",
    texte: "4 h de jeu face caméra chaque lundi soir, pour les comédiens pros ou qui veulent le devenir.",
    avis: "On explore, on travaille et on apprend face caméra comme sur scène.",
    auteur: "Caroline Beghain",
    image: "/intensif/face-camera.jpg",
  },
  {
    href: "/cours-loisirs",
    nom: "Cours loisirs",
    accroche: "Libère ta créativité, gagne en confiance.",
    texte: "Théâtre et cinéma, tous niveaux, le soir en semaine. Cours d'essai gratuit.",
    avis: "Même en loisirs, David pousse à l'excellence.",
    auteur: "Jean-Claude Ouvray",
    image: "/accueil/eleve-en-jeu.jpg",
  },
];

export default function Accueil() {
  return (
    <main className="flex flex-col overflow-x-clip">
      {/* ── Affiche ── */}
      <header className="relative flex min-h-[85svh] flex-col justify-end overflow-hidden">
        <Image
          src="/accueil/jason.jpg"
          alt="Un comédien derrière le clap, juste avant une prise"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center] opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/10" />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-14">
          <p className="inline-block bg-rouge px-2 py-1 font-mono text-xs font-black uppercase tracking-[0.2em] text-white">
            Théâtre &amp; cinéma · Avignon
          </p>
          <h1 className="mt-3 font-affiche text-[3.8rem] uppercase leading-[0.9] sm:text-8xl">
            Le Jeu de <span className="text-rouge">l&apos;Acteur.</span>
          </h1>
          <p className="mt-4 font-accent text-2xl italic sm:text-3xl">
            La formation où la scène et la caméra ne font qu&apos;un.
          </p>
          <p className="mt-4 max-w-xl text-lg text-secondaire">
            Du théâtre classique aux techniques de cinéma (castings, cascades, tournages), une approche complète et
            moderne du métier d&apos;acteur.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <BoutonRouge href="#contact">Faire un cours d&apos;essai</BoutonRouge>
            <Link
              href="/cours-intensif"
              className="inline-block rounded-md border border-foreground/40 px-6 py-4 text-center font-affiche text-xl uppercase tracking-wide"
            >
              Devenir acteur en 10 mois
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-5 py-20">
        {/* ── Les formations ── */}
        <section className="flex flex-col gap-6">
          <Scene numero="01" nom="Les formations" />
          <Titre rouge="ton rôle.">Trois façons de jouer,</Titre>
          <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {FORMATIONS.map((f) => (
              <li key={f.href}>
                <Link href={f.href} className="group flex h-full flex-col overflow-hidden rounded-lg border border-secondaire/20">
                  <div className="relative aspect-[16/9]">
                    <Image src={f.image} alt={f.nom} fill sizes="(min-width: 1024px) 330px, 100vw" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="font-affiche text-3xl uppercase group-hover:text-rouge">{f.nom}</h3>
                    <p className="font-accent text-xl italic">{f.accroche}</p>
                    <p className="text-secondaire">{f.texte}</p>
                    <blockquote className="mt-auto border-l-2 border-rouge pl-3 text-sm">
                      <span className="text-rouge">★★★★★</span> « {f.avis} »
                      <footer className="mt-1 text-secondaire">{f.auteur}</footer>
                    </blockquote>
                    <span className="font-affiche text-lg uppercase text-rouge">Découvrir →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="https://www.google.com/maps/place/?q=place_id:ChIJH8xpoIjttRIRDqnqqdFrtP4"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 self-start"
          >
            <span className="font-affiche text-6xl text-rouge">4,9</span>
            <span className="flex flex-col">
              <span className="text-xl text-rouge">★★★★★</span>
              <span className="text-sm text-secondaire underline">Sur 41 avis Google · lire tous les avis</span>
            </span>
          </a>
        </section>

        {/* ── La méthode (page « Formations » de Wix) ── */}
        <section className="flex flex-col gap-6">
          <Scene numero="02" nom="La méthode" />
          <Titre rouge="ta singularité.">Exploiter pleinement</Titre>
          <p className="max-w-2xl text-lg">
            Notre enseignement t&apos;initie aux techniques propres au jeu de l&apos;acteur, au théâtre comme au cinéma,
            pour t&apos;affranchir des contraintes du plateau. L&apos;image, la scène, le travail corporel et celui des
            émotions sont abordés à travers les méthodes de Stanislavski et de l&apos;Actors Studio.
          </p>
          <p className="max-w-2xl text-lg">
            Scènes, monologues, improvisations, séances photo. Et régulièrement, un retour image en temps réel : en
            regardant jouer un camarade, tu prends conscience de ce qui sépare le jeu pour la scène du jeu pour
            l&apos;image.
          </p>
        </section>

        {/* ── Partenaire de jeu ── */}
        <section className="flex flex-col gap-3 rounded-lg border-2 border-rouge p-6 sm:p-8">
          <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">Partenaire de jeu</p>
          <p className="font-affiche text-4xl uppercase leading-none">Viens à deux.</p>
          <p className="max-w-2xl text-lg">
            Pour les formations pro, recommande un talent et profitez-en tous les deux : un mois de formation offert
            chacun sur l&apos;Intensif, 10 % de réduction sur le Pro du lundi.
          </p>
        </section>

        {/* ── IACTEUR ── */}
        <section className="flex flex-col gap-5 rounded-lg bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex flex-1 flex-col gap-3">
            <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">Né à l&apos;école</p>
            <p className="font-affiche text-4xl uppercase leading-none">IACTEUR</p>
            <p className="text-lg">
              L&apos;espace personnel de l&apos;acteur : textes, coaching, carrière, et les castings qui te correspondent.
              Gratuit pour commencer.
            </p>
          </div>
          <BoutonRouge href="https://iacteur.com">Entrer dans IACTEUR</BoutonRouge>
        </section>

        {/* ── Le lieu ── */}
        <section className="flex flex-col gap-6">
          <Scene numero="03" nom="Le lieu" />
          <Titre rouge="à Avignon.">Le théâtre de l&apos;Oriflamme,</Titre>
          <div className="relative aspect-[16/8] overflow-hidden rounded-lg">
            <Image
              src="/intensif/salle.jpg"
              alt="La salle du théâtre de l'Oriflamme"
              fill
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="object-cover"
            />
          </div>
          <p className="text-lg">
            Les cours ont lieu au théâtre de l&apos;Oriflamme, 5 rue Portail Matheron, en plein cœur d&apos;Avignon.
          </p>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="flex scroll-mt-20 flex-col gap-6">
          <Scene numero="04" nom="Contact" />
          <Titre rouge="On te répond sous 24 h.">Une question, un essai ?</Titre>
          <p className="max-w-2xl text-lg">
            David Rousseau et Laetitia Gaune :{" "}
            <a href="tel:+33623181579" className="font-bold underline">
              06 23 18 15 79
            </a>{" "}
            (dis-nous que tu viens du site), ou{" "}
            <a href="mailto:contact@lejeudelacteur.com" className="font-bold underline">
              contact@lejeudelacteur.com
            </a>
            .
          </p>
          <FormulaireContact sujet="loisirs" />
        </section>
      </div>
    </main>
  );
}
