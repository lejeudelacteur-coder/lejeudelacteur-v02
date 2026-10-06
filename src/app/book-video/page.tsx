// BOOK / VIDÉO — même adresse que sur Wix (/book-vidéo, voir next.config.ts).
// Les deux vidéos sont encore lues depuis Wix : À METTRE SUR YOUTUBE avant la
// fin de l'abonnement Wix (septembre 2027). Book photo : 300 € ; tout le reste sur devis (David, 07/10).
import type { Metadata } from "next";
import FormulaireContact from "@/components/FormulaireContact";
import { Scene, Titre } from "@/components/Scene";

export const metadata: Metadata = {
  title: "Book photo, vidéo de présentation et bande démo pour comédiens",
  description:
    "Book photo comédien, vidéo de présentation et tournage de scènes ou de monologues pour ta bande démo, à Avignon : tous les outils pour candidater aux castings et aux auditions.",
  alternates: { canonical: "/book-vid%C3%A9o" },
};

const VIDEO_PRESENTATION = "https://video.wixstatic.com/video/7390a3_2c70ada5f2ec4624b289f552da4b53ef/1080p/mp4/file.mp4";
const VIDEO_BANDE_DEMO = "https://video.wixstatic.com/video/7390a3_371277fb5b3b461d945de44fd5e64941/1080p/mp4/file.mp4";

function Tarif({ nom, prix, detail }: { nom: string; prix: string; detail: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-secondaire/20 p-5">
      <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">{nom}</p>
      <p className="font-affiche text-4xl">{prix}</p>
      <p className="text-sm text-secondaire">{detail}</p>
    </div>
  );
}

function Raisons({ liste }: { liste: [string, string][] }) {
  return (
    <ol className="flex flex-col gap-4">
      {liste.map(([t, d], i) => (
        <li key={t} className="flex gap-4">
          <span className="font-affiche text-4xl leading-none text-rouge">{i + 1}</span>
          <span>
            <span className="block font-bold">{t}</span>
            <span className="text-secondaire">{d}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function BookVideo() {
  return (
    <main className="flex flex-col overflow-x-clip">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-5 py-16">
        <header className="flex flex-col gap-5">
          <Scene numero="00" nom="Book / vidéo" />
          <h1 className="font-affiche text-[3.4rem] uppercase leading-[0.9] sm:text-8xl">
            Tes outils <span className="text-rouge">de casting.</span>
          </h1>
          <p className="max-w-2xl text-lg text-secondaire">
            Tout ce qu&apos;il faut pour candidater aux castings, aux auditions et aux entretiens : un book photo, une
            vidéo de présentation, et des scènes tournées pour ta bande démo.
          </p>
        </header>

        {/* ── Book photo ── */}
        <section className="flex flex-col gap-6">
          <Scene numero="01" nom="Ton book photo" />
          <Titre rouge="ça compte.">La première impression,</Titre>
          <Raisons
            liste={[
              ["Faire une forte première impression", "Des images de qualité, qui reflètent ta personnalité et ta polyvalence, captent tout de suite l'attention des directeurs de casting."],
              ["Un support de professionnel", "Un book bien fait montre ton sérieux, avec des informations claires (coordonnées, mensurations…) qui facilitent le travail du casting."],
              ["Te démarquer", "Un book professionnel, régulièrement mis à jour, te distingue des autres candidats."],
            ]}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Tarif nom="Book professionnel" prix="300 €" detail="12 photos retouchées, envoyées par WeTransfer" />
            <Tarif nom="Mini-book" prix="Sur devis" detail="5 photos retouchées, pour répondre à un casting précis" />
          </div>
        </section>

        {/* ── Vidéo de présentation ── */}
        <section className="flex flex-col gap-6">
          <Scene numero="02" nom="Ta vidéo de présentation" />
          <Titre rouge="tout simplement.">Sois toi-même,</Titre>
          <video src={VIDEO_PRESENTATION} controls playsInline preload="metadata" className="w-full rounded-lg bg-black" />
          <Raisons
            liste={[
              ["Laisse ta personnalité s'exprimer", "Une vidéo va au-delà des photos : elle révèle qui tu es, et capte l'attention des recruteurs."],
              ["Sois naturel", "Sans surjouer : la vidéo crée une connexion sincère avec celui qui la regarde, et peut faire la différence."],
              ["Un outil de professionnel", "Prise de vue et montage soignés, avec un coaching personnalisé : de quoi te démarquer des vidéos filmées seul au téléphone."],
            ]}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Tarif nom="Vidéo de présentation" prix="Sur devis" detail="Coaching, vidéo Full HD d'environ 1 min 30, sous-titrée" />
            <Tarif nom="Présentation spécifique" prix="Sur devis" detail="Pour répondre à un casting ou à un projet précis" />
          </div>
        </section>

        {/* ── Bande démo ── */}
        <section className="flex flex-col gap-6">
          <Scene numero="03" nom="Ta bande démo" />
          <Titre rouge="crée tes occasions.">N&apos;attends pas les rôles,</Titre>
          <p className="max-w-2xl text-lg">
            Pas besoin d&apos;attendre les plateaux de télé ou de cinéma pour avancer : tourne tes propres images, explore
            des personnages, et montre ton talent.
          </p>
          <video src={VIDEO_BANDE_DEMO} controls playsInline preload="metadata" className="w-full rounded-lg bg-black" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {(
              [
                ["Avant", "Évite les textes trop connus ou tirés de films. Préfère un extrait de théâtre, classique ou contemporain, ou un texte écrit pour l'occasion, qui te ressemble et correspond aux rôles que tu vises."],
                ["Le jour J", "Une tenue qui colle au personnage, et les accessoires utiles à ton jeu. Pas de décor : c'est toi qu'on met en avant. On répète au moins une heure, puis on tourne en continu, et sur deux autres valeurs de plan pour un montage dynamique. Compte environ 4 h."],
                ["Après", "Quelques jours plus tard, ta vidéo (cartons de début et de fin, sous-titres en français) t'est envoyée par WeTransfer ou le service de ton choix."],
              ] as const
            ).map(([t, d]) => (
              <div key={t} className="flex flex-col gap-2 rounded-lg border border-secondaire/20 p-5">
                <h3 className="font-affiche text-2xl uppercase">{t}</h3>
                <p className="text-secondaire">{d}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Tarif nom="Scène ou monologue" prix="Sur devis" detail="Par acteur : coaching, vidéo d'environ 1 min 30, sous-titrée" />
            <Tarif nom="Bande démo complète" prix="Sur devis" detail="Montage de tes meilleures images" />
          </div>
        </section>

        <section id="contact" className="flex scroll-mt-20 flex-col gap-6">
          <Scene numero="04" nom="Prenons rendez-vous" />
          <Titre rouge="on en parle.">Un projet ?</Titre>
          <FormulaireContact sujet="autre" />
        </section>
      </div>
    </main>
  );
}
