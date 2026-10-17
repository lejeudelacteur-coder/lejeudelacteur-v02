// LE BANDEAU IACTEUR (07/10/2026) : le téléphone avec la fiche casting, « Les
// castings viennent à toi ». Un seul composant, plusieurs textes selon l'endroit
// (articles du blog, accueil, pages des élèves).
// CV PRO (10/10/2026, 12/10 : trois modèles en éventail) : version « cv » (accueil, articles sur le casting et le
// métier) : un exemple de CV Pro à la place du téléphone, lien iacteur.com/cv-pro ;
// et une ligne « Et ton CV d'acteur Pro » dans la version élèves.
// RÉPLIQUE (12/10/2026) : version « replique » (accueil, cours Loisirs, articles sur l'audition,
// le monologue, l'italienne) : la photo de David derrière son texte, lien iacteur.com/replique.
// Apprendre son texte est une demande récurrente des élèves (David).
// MINI-COACH (17/10/2026) : version « minicoach » : « Ton casting approche ? Colle ton texte. », un aperçu
// gratuit sans compte (objectif, obstacle, ce qui se joue), lien suivi iacteur.com/go/ecole/mini-coach.
import type { ReactNode } from "react";
import Image from "next/image";
import { BoutonRouge } from "@/components/Scene";

const TEXTES = {
  // Pour tous les visiteurs (blog, accueil, liste du blog)
  public: {
    eyebrow: "IACTEUR · l'espace personnel de l'acteur",
    titre: "Les castings viennent à toi.",
    texte: "Crée ta fiche casting, gratuitement : IACTEUR te propose les rôles qui te correspondent. Dedans aussi : ton CV Pro, un partenaire pour apprendre ton texte, ton coaching et le suivi de ta carrière.",
    bouton: "Entrer dans IACTEUR",
  },
  // Pour les élèves de l'école (Pro du lundi, stages)
  eleves: {
    eyebrow: "Offert à nos élèves",
    titre: "IACTEUR est offert à tous nos élèves.",
    texte: "Des textes à travailler, une voix qui te donne la réplique, du coaching, ton CV Pro, le suivi de ta carrière et les castings qui te correspondent : l'espace personnel de l'acteur, gratuit pour les élèves de l'école.",
    bouton: "Découvrir IACTEUR",
  },
  // Le CV Pro : accueil et articles sur le casting et le métier (David, 10/10)
  cv: {
    eyebrow: "IACTEUR · gratuit",
    titre: "Ton CV d'acteur Pro, gratuit.",
    texte: "Un CV propre et pro en un clic, en 3 modèles : CINÉ, THÉÂTRE ou VIP. Tes photos, ton agent, tes expériences : remplis ta fiche casting, ton CV est prêt.",
    bouton: "Créer mon CV Pro",
  },
  // RÉPLIQUE : apprendre son texte (David, 12/10)
  replique: {
    eyebrow: "IACTEUR · nouveau",
    // L'accroche : l'idée de David (« Tu apprends seul tes scènes ? Plus maintenant ! »), tournée
    // sans masculin
    titre: "Personne pour te donner la réplique ? Plus maintenant.",
    texte: "IACTEUR te donne la réplique avec une voix française naturelle, et te souffle quand tu as un trou. À la fin, tes répliques à retravailler.",
    bouton: "Apprendre mon texte",
  },
  // MINI-COACH : l'aperçu gratuit avant un casting (David, 17/10)
  minicoach: {
    eyebrow: "IACTEUR · gratuit, sans compte",
    titre: "Ton casting approche ? Colle ton texte.",
    texte: "En quelques secondes : l'objectif de ton personnage, son obstacle, et ce qui se joue dans la scène.",
    bouton: "Voir ce qu'il veut",
  },
} as const;

const LIEN_MINI_COACH = "https://iacteur.com/go/ecole/mini-coach";

// Le résultat d'exemple (version « exemple ») : Alceste, Le Misanthrope, acte I, scène 1
const EXEMPLE: [string, string][] = [
  ["Ce que veut ton personnage", "Convaincre Philinte qu'on doit dire aux gens ce qu'on pense d'eux."],
  ["Ce qui l'en empêche", "Philinte défend les politesses du monde, avec calme et ironie."],
  ["Ce qui se joue", "Alceste reproche à Philinte d'avoir embrassé un inconnu. Philinte refuse de s'emporter."],
];

const LIEN_CV_PRO = "https://iacteur.com/cv-pro";
const LIEN_REPLIQUE = "https://iacteur.com/replique";

export default function BandeauIacteur({
  variante = "public",
  href,
}: {
  variante?: keyof typeof TEXTES;
  href?: string;
}): ReactNode {
  const t = TEXTES[variante];
  const lien =
    href ??
    (variante === "cv" ? LIEN_CV_PRO : variante === "replique" ? LIEN_REPLIQUE : variante === "minicoach" ? LIEN_MINI_COACH : "https://iacteur.com");

  // MINI-COACH : choix de David (17/10) : deux colonnes ; à droite, la photo fondue dans le noir
  // (jamais coupée net), et dessous un exemple de résultat (titres fixes, comme sur iacteur.com/mini-coach)
  if (variante === "minicoach") {
    return (
      <section className="grid overflow-hidden rounded-lg border-2 border-rouge bg-surface sm:grid-cols-[3fr_2fr]">
        <div className="flex flex-col justify-center gap-3 p-6">
          <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">{t.eyebrow}</p>
          <p className="font-affiche text-3xl uppercase leading-none">
            Ton casting approche ? <span className="block text-rouge">Colle ton texte.</span>
          </p>
          <p className="text-lg">{t.texte}</p>
          <p className="text-lg font-bold">Gratuit, sans compte.</p>
          <p className="font-accent text-lg italic">Conçu par des comédiens, pour des comédiens.</p>
          <div>
            <BoutonRouge href={lien}>{t.bouton}</BoutonRouge>
          </div>
        </div>
        {/* Choix de David (17/10) : la photo en grand, fondue dans le noir côté texte, et l'exemple
            posé dessus dans un cadre semi-transparent */}
        <div className="relative min-h-[26rem]">
          <Image src="/iacteur/coach.jpg" alt="Un comédien concentré sur son texte" fill sizes="(min-width: 640px) 360px, 100vw" className="object-cover object-[62%_15%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface/80 sm:bg-gradient-to-r sm:via-transparent sm:to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2 rounded-lg border border-foreground/25 bg-background/55 p-4 backdrop-blur-sm sm:left-auto sm:right-4 sm:w-[78%]">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">Exemple · Alceste, Le Misanthrope</p>
            {EXEMPLE.map(([titre, phrase]) => (
              <div key={titre}>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.15em] text-rouge">{titre}</p>
                <p className="text-sm leading-snug">{phrase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="relative overflow-hidden rounded-lg border-2 border-rouge bg-surface">
      <div className="flex flex-col gap-3 p-6 pr-6 sm:w-3/5">
        <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">{t.eyebrow}</p>
        {variante === "replique" ? (
          // « Plus maintenant. » en rouge, sur sa ligne, comme sur les visuels (David, 12/10)
          <p className="font-affiche text-3xl uppercase leading-none">
            Personne pour te donner la réplique ? <span className="block text-rouge">Plus maintenant.</span>
          </p>
        ) : (
          <p className="font-affiche text-3xl uppercase leading-none">{t.titre}</p>
        )}
        <p className="text-lg">{t.texte}</p>
        {/* RÉPLIQUE : l'offre sur sa propre ligne, en gras (David, 12/10) */}
        {variante === "replique" && <p className="text-lg font-bold">Ton premier texte est offert.</p>}
        {variante === "eleves" && (
          <p className="relative z-10 text-lg font-semibold text-rouge">
            Et ton CV d&apos;acteur Pro, en un clic.{" "}
            <a href={LIEN_CV_PRO} className="underline">
              Créer mon CV Pro ›
            </a>
          </p>
        )}
        <p className="font-accent text-lg italic">Conçu par des comédiens, pour des comédiens.</p>
        <div className="relative z-10">
          <BoutonRouge href={lien}>{t.bouton}</BoutonRouge>
        </div>
      </div>
      {variante === "replique" ? (
        // La photo de RÉPLIQUE : David derrière son texte, quelqu'un de dos en face ; elle se fond
        // dans le fond sombre côté texte
        <div className="relative h-48 w-full sm:absolute sm:inset-y-0 sm:right-0 sm:h-auto sm:w-2/5">
          <Image
            src="/iacteur/replique.jpg"
            alt="Un comédien derrière son texte, face à un partenaire : RÉPLIQUE, dans IACTEUR"
            fill
            sizes="(min-width: 640px) 320px, 100vw"
            className="object-cover object-[75%_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-transparent sm:bg-gradient-to-r" />
        </div>
      ) : variante === "cv" ? (
        // Les trois modèles (CINÉ, THÉÂTRE, VIP) en éventail, avec les portraits de David (exemples)
        <div className="relative mx-auto mt-2 h-56 w-72 sm:absolute sm:bottom-[-2.5rem] sm:right-6 sm:m-0 sm:h-72 sm:w-80">
          {[
            ["theatre", "-rotate-12 left-0", "THÉÂTRE"],
            ["vip", "rotate-12 right-0", "VIP"],
            ["cine", "left-1/2 -translate-x-1/2 z-10", "CINÉ"],
          ].map(([id, pos, nom]) => (
            <Image
              key={id}
              src={`/iacteur/cv-${id}.jpg`}
              alt={`CV Pro, modèle ${nom}, créé avec IACTEUR`}
              width={520}
              height={735}
              sizes="160px"
              className={`absolute top-0 h-auto w-36 rounded-sm shadow-lg sm:w-44 ${pos}`}
            />
          ))}
          <p className="absolute bottom-1 right-2 z-20 text-[9px] leading-none text-foreground/50">Photos © Olivier ALLARD</p>
        </div>
      ) : (
      /* Le téléphone dépasse du cadre par le bas : on n'en voit que le haut */
      <div className="relative mx-auto -mt-4 mb-0 h-72 w-64 overflow-hidden sm:absolute sm:bottom-0 sm:right-4 sm:m-0 sm:h-[105%] sm:w-64">
        <Image
          src="/iacteur/telephone-fiche.png"
          alt="La fiche casting d'IACTEUR sur un iPhone"
          fill
          sizes="256px"
          className="object-cover object-top"
        />
      </div>
      )}
    </section>
  );
}
