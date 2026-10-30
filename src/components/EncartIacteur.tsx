// L'ENCART IACTEUR DANS LE TEXTE (30/10/2026, David) : petit, juste après le premier paragraphe, comme dans un
// magazine : un module d'IACTEUR choisi selon le sujet de l'article (voir moduleEncart, lib/blog.ts). Le lien passe
// par iacteur.com/go/ecole/<module> : la provenance « ecole-<article> » apparaît dans ADMIN > VISITES d'IACTEUR.
import { BoutonRouge } from "@/components/Scene";
import { campagneArticle, type ModuleEncart } from "@/lib/blog";

const TEXTES: Record<ModuleEncart, { page: string; eyebrow: string; titre: string; texte: string; bouton: string }> = {
  solo: {
    page: "solo",
    eyebrow: "IACTEUR · SOLO",
    titre: "Un monologue écrit pour toi.",
    texte: "Tu choisis l'âge, le genre, le style, l'action : IACTEUR écrit un monologue sur mesure, que tu peux aussi écouter.",
    bouton: "Écrire mon monologue",
  },
  duo: {
    page: "duo",
    eyebrow: "IACTEUR · DUO",
    titre: "Une scène à deux, sur mesure.",
    texte: "Les personnages, leur lien, ce qu'ils veulent : IACTEUR écrit la scène, à répéter seul·e ou à lire avec un partenaire.",
    bouton: "Écrire ma scène",
  },
  replique: {
    page: "replique",
    eyebrow: "IACTEUR · RÉPLIQUE",
    titre: "Ton texte, par cœur.",
    texte: "Personne pour te donner la réplique ? IACTEUR la dit pour toi avec une voix naturelle, et te souffle quand tu as un trou.",
    bouton: "Apprendre mon texte",
  },
  role: {
    page: "mon-role",
    eyebrow: "IACTEUR · MON RÔLE EN ENTIER",
    titre: "Ton rôle, extrait de la pièce ou du scénario.",
    texte: "Dépose le texte entier, choisis ton rôle : tes scènes sont prêtes, à lire, à imprimer ou à apprendre. Gratuit, sans compte.",
    bouton: "Extraire mon rôle",
  },
  casting: {
    page: "mon-pass", // la fiche casting (30/10, David : plutôt la fiche que la page recruteur de CASTING CALL)
    eyebrow: "IACTEUR · CASTING CALL",
    titre: "Les castings viennent à toi.",
    texte: "Crée ta fiche casting, gratuitement : quand une annonce correspond à ton profil, IACTEUR te prévient et tu choisis de postuler ou non.",
    bouton: "Créer ma fiche casting",
  },
  carriere: {
    page: "carriere",
    eyebrow: "IACTEUR · CARRIÈRE",
    titre: "Ton quotidien d'acteur, en ordre.",
    texte: "Un casting, un tournage, une rencontre : tu racontes en quelques phrases, IACTEUR te pose la question que personne ne te pose. À essayer sans compte.",
    bouton: "Essayer CARRIÈRE",
  },
};

export default function EncartIacteur({ module, slug }: { module: ModuleEncart; slug: string }) {
  const t = TEXTES[module];
  const lien = `https://iacteur.com/go/ecole/${t.page}?m=blog&c=${campagneArticle(slug)}`;
  return (
    <aside className="flex flex-col gap-2 rounded-lg border-2 border-rouge bg-surface p-5" aria-label="IACTEUR">
      <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">{t.eyebrow}</p>
      <p className="font-affiche text-2xl uppercase leading-none">{t.titre}</p>
      <p className="text-base">{t.texte}</p>
      <div className="pt-1">
        <BoutonRouge href={lien}>{t.bouton}</BoutonRouge>
      </div>
    </aside>
  );
}
