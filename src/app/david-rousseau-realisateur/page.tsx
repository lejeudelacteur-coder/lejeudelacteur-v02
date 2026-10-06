// DAVID ROUSSEAU, RÉALISATEUR — même adresse que sur Wix. Le texte et les
// liens des films sont ceux de l'ancienne page.
import type { Metadata } from "next";
import { Scene } from "@/components/Scene";

export const metadata: Metadata = {
  title: "David Rousseau, comédien et réalisateur",
  description: "David Rousseau, comédien, réalisateur et fondateur du Jeu de l'Acteur : un florilège de ses films, séries, clips et publicités.",
  alternates: { canonical: "/david-rousseau-realisateur" },
};

const FILMS: { titre: string; genre: string; lien: string }[] = [
  { titre: "My name in lights they'll speak", genre: "Vidéo clip", lien: "https://www.youtube.com/watch?v=Jr6s8eM2e8s&t=1s" },
  { titre: "Dé-chaînées", genre: "Série format court · teaser", lien: "https://www.youtube.com/watch?v=oZxEob2529o&t=49s" },
  { titre: "Et l'homme créa…", genre: "Série format court", lien: "https://vimeo.com/424765563" },
  { titre: "La femme de ma vie", genre: "Court-métrage", lien: "https://vimeo.com/377982507" },
  { titre: "La Nouvelle Vague", genre: "Expérimental", lien: "https://vimeo.com/904997879" },
  { titre: "Mots de cœur", genre: "Publicité", lien: "https://vimeo.com/424736532" },
  { titre: "Harmony", genre: "Court-métrage", lien: "https://vimeo.com/893061734" },
];

export default function Realisateur() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-5 py-16">
      <header className="flex flex-col gap-4">
        <Scene numero="01" nom="Réalisateur" />
        <h1 className="font-affiche text-[3.4rem] uppercase leading-[0.95] sm:text-7xl">
          David <span className="text-rouge">Rousseau.</span>
        </h1>
        <p className="font-accent text-2xl italic sm:text-3xl">Comédien · réalisateur · fondateur du Jeu de l&apos;Acteur.</p>
      </header>

      <section className="flex flex-col gap-4 text-lg">
        <p>
          Je pourrais vous parler de Jean-Louis Martin-Barbaz, de Blanche Salant, d&apos;Éric Valette, de Josiane Balasko
          ou encore de Rachida Brakni. Je pourrais vous relater les heures passées à les observer jouer, enseigner ou
          mettre en scène. Je pourrais aussi vous rapporter les moments vécus auprès des partenaires de jeu dont j&apos;ai
          eu la chance de croiser la route.
        </p>
        <p>
          Je pourrais vous parler des musiciens, des techniciens et des monteurs qui m&apos;ont aidé à écouter,
          comprendre et analyser. Il me serait facile de m&apos;épancher sur Charlot, Gondry ou Cassavetes, pour
          expliquer pourquoi je suis autodidacte.
        </p>
        <p>Je pourrais vous parler d&apos;eux, et bien d&apos;autres encore, mais je n&apos;aurais pas la prétention de vous parler de moi.</p>
        <p className="font-accent text-2xl italic">
          Alors, comme une image vaut mille mots, voici un florilège de mes 24 par seconde…
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <ul className="flex flex-col divide-y divide-secondaire/20 rounded-lg border border-secondaire/20">
          {FILMS.map((f) => (
            <li key={f.titre}>
              <a href={f.lien} target="_blank" rel="noopener" className="group flex items-center justify-between gap-4 px-5 py-4">
                <span>
                  <span className="block font-affiche text-2xl uppercase group-hover:text-rouge">{f.titre}</span>
                  <span className="text-sm text-secondaire">{f.genre}</span>
                </span>
                <span className="shrink-0 font-affiche text-lg uppercase text-rouge">Voir →</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
