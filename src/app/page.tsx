// ACCUEIL du site de l'école. Contenus repris de l'accueil Wix (accroche,
// trois formations avec un avis d'élève chacune, IACTEUR, Partenaire de jeu,
// contact) et de la page « Formations » (la méthode).
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BandeauIacteur from "@/components/BandeauIacteur";
import FormulaireContact from "@/components/FormulaireContact";
import DerniersArticles from "@/components/DerniersArticles";
import VideoYoutube from "@/components/VideoYoutube";
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
    image: "/accueil/repetition-coaching.jpg",
  },
];

// FICHE « ÉCOLE » POUR GOOGLE (26/10/2026) : la même adresse et le même téléphone que la fiche Google Maps
// et que le bas de page, pour que Google relie le site à la fiche (recherches « cours de théâtre avignon »)
const FICHE_ECOLE = {
  "@context": "https://schema.org",
  "@type": ["School", "LocalBusiness"],
  name: "Le Jeu de l'Acteur",
  description: "École de théâtre et de cinéma à Avignon : cours loisirs, cours pros, formation intensive, jeu face caméra.",
  url: "https://www.lejeudelacteur.com",
  telephone: "+33623181579",
  email: "contact@lejeudelacteur.com",
  image: "https://www.lejeudelacteur.com/accueil/logo-ecole.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Théâtre de l'Oriflamme, 5 rue Portail Matheron",
    postalCode: "84000",
    addressLocality: "Avignon",
    addressCountry: "FR",
  },
  founder: { "@type": "Person", name: "David Rousseau" },
};

export default function Accueil() {
  return (
    <main className="flex flex-col overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FICHE_ECOLE).replace(/</g, "\\u003c") }} />
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
          {/* Deux extraits de jeu (21/10) */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <figure className="flex flex-col gap-2">
              <VideoYoutube id="nq-YjEEBH8c" titre="Jeu face caméra au Cours Pro du Lundi" />
              <figcaption className="text-sm text-secondaire">Jeu face caméra, au Pro du lundi.</figcaption>
            </figure>
            <figure className="flex flex-col gap-2">
              <VideoYoutube id="zc_YmcTmScA" titre="Improvisation sur le lâcher-prise" />
              <figcaption className="text-sm text-secondaire">Improvisation sur le lâcher-prise, au Pro du lundi.</figcaption>
            </figure>
          </div>
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

        {/* ── IACTEUR SOLO à l'œuvre (21/10) : des monologues écrits avec IACTEUR, joués par les élèves ── */}
        <section className="flex flex-col gap-4">
          <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">Écrits avec IACTEUR SOLO, joués à l&apos;école</p>
          <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {(
              [
                ["4R08WX35UZo", "Monologue créé avec IACTEUR SOLO (Manon)", "Manon"],
                ["JYzKl9enSJw", "Monologue créé avec IACTEUR SOLO (Nicolas)", "Nicolas"],
                ["eeznJ-zPYTg", "Monologue créé avec IACTEUR SOLO (Agnès)", "Agnès"],
              ] as const
            ).map(([id, titre, nom]) => (
              <li key={id} className="flex w-[80%] shrink-0 snap-start flex-col gap-2 sm:w-auto">
                <VideoYoutube id={id} titre={titre} />
                <p className="text-sm text-secondaire">{nom}</p>
              </li>
            ))}
          </ul>
          {/* GUIDES IACTEUR (24/10/2026) */}
          <a href="https://iacteur.com/guides" className="mt-2 self-start font-bold underline underline-offset-4 hover:text-rouge">
            Les guides IACTEUR pour comédiens : apprendre son texte, préparer un casting, travailler une scène →
          </a>
        </section>

        {/* ── IACTEUR : le mini-COACH (17/10), le CV Pro (10/10), puis RÉPLIQUE (12/10) ── */}
        <BandeauIacteur variante="minicoach" />
        <BandeauIacteur variante="cv" />
        <BandeauIacteur variante="replique" />

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

        {/* ── Le blog : les derniers articles (21/10) ── */}
        <DerniersArticles mode="bande" numero="05" />
      </div>
    </main>
  );
}
