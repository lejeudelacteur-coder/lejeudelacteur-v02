// MENTIONS LÉGALES & CONFIDENTIALITÉ — même adresse que sur Wix (/rgpd).
// Réécrit pour le nouveau site le 07/10/2026 (l'ancienne page parlait de
// Wix et de l'app IACTEUR). Rédigé avec David ; une relecture par un juriste
// reste conseillée. À METTRE À JOUR si un prestataire est ajouté (pixel Meta,
// newsletter…).
import type { Metadata } from "next";
import { Scene } from "@/components/Scene";

export const metadata: Metadata = {
  title: "Mentions légales et confidentialité",
  description: "Mentions légales du site du Jeu de l'Acteur et politique de confidentialité : quelles données, pourquoi, et tes droits.",
  alternates: { canonical: "/rgpd" },
};

const MISE_A_JOUR = "7 octobre 2026";

const SECTIONS: { titre: string; paragraphes: string[] }[] = [
  {
    titre: "Éditeur du site",
    paragraphes: [
      "Le site lejeudelacteur.com est édité par David Rousseau, entrepreneur individuel (EI, micro-entreprise), nom commercial CIA (Carte d'Identité Artistique), SIRET 537 384 216 00025, dont le siège est situé au 17 rue sous le Barri, 30650 Rochefort-du-Gard (adresse déclarée au registre des entreprises).",
      "Les cours ont lieu au Théâtre de l'Oriflamme, 5 rue Portail Matheron, 84000 Avignon.",
      "Directeur de la publication : David Rousseau. Contact : contact@lejeudelacteur.com · 06 23 18 15 79.",
    ],
  },
  {
    titre: "Hébergement",
    paragraphes: ["Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (vercel.com)."],
  },
  {
    titre: "Quelles données ?",
    paragraphes: [
      "Quand tu remplis un formulaire du site (candidature à la formation intensive, cours d'essai, stage, question, Partenaire de jeu) : ton prénom, ton nom, ton téléphone, ton e-mail, et selon le formulaire ta ville, tes réponses aux questions et ton message. Dans le formulaire Partenaire de jeu, tu nous donnes aussi les coordonnées de la personne que tu recommandes : assure-toi qu'elle est d'accord.",
      "Les statistiques de visite : les pages vues, le site d'où tu viens (Instagram, Google, une publicité…), le type d'appareil, ta ville approximative (déduite de ta connexion internet ; ton adresse IP n'est pas conservée), et un identifiant aléatoire gardé dans ton navigateur, qui ne sert qu'à ne pas te compter plusieurs fois. Cet identifiant n'est relié à aucune identité, et il est renouvelé tous les 13 mois.",
      "Les liens de contact que tu touches (téléphone, e-mail, IACTEUR, plan d'accès) sont comptés, sans plus.",
    ],
  },
  {
    titre: "Pourquoi ?",
    paragraphes: [
      "Pour répondre à ta demande et te rappeler : c'est l'objet du formulaire que tu as envoyé (et tu coches une case pour l'accepter).",
      "Pour mesurer de façon anonyme quelles pages et quelles sources fonctionnent, afin d'améliorer le site : nous ne cherchons jamais à savoir qui tu es.",
      "Aucune revente de données, aucun profilage commercial. Aucun cookie de publicité sur ce site à ce jour : si nous en ajoutons un, il ne s'activera qu'avec ton accord (bandeau).",
    ],
  },
  {
    titre: "Qui voit tes données ?",
    paragraphes: [
      "David Rousseau et Laetitia Gaune pour les demandes. Les prestataires techniques qui font fonctionner le site : Vercel (hébergement), Supabase (base de données), Resend (envoi des e-mails de confirmation). Certains sont situés aux États-Unis ; les transferts se font avec les garanties prévues par le RGPD (clauses contractuelles types ou cadre de protection des données UE–États-Unis).",
      "Certaines pages affichent des contenus de Google ou de YouTube (plan d'accès du théâtre, vidéos des articles du blog). Les vidéos du blog ne se chargent qu'au moment où tu touches « lecture ».",
    ],
  },
  {
    titre: "Combien de temps ?",
    paragraphes: [
      "Les demandes sont gardées 3 ans après le dernier échange, puis supprimées. Les statistiques de visite ne contiennent aucune donnée personnelle.",
      "Tu peux demander la suppression de tes données à tout moment, nous les effaçons sous 30 jours.",
    ],
  },
  {
    titre: "Tes droits",
    paragraphes: [
      "Tu peux consulter, corriger, exporter ou faire supprimer tes données, retirer ton accord, ou t'opposer à un traitement. Il suffit d'écrire à contact@lejeudelacteur.com : réponse sous 30 jours. Si tu estimes que tes droits ne sont pas respectés, tu peux saisir la CNIL (www.cnil.fr).",
    ],
  },
  {
    titre: "Photos et vidéos",
    paragraphes: [
      "Les photos et vidéos du site montrent des élèves, des intervenants et des tournages de l'école. Toute personne qui entre au théâtre consent à être filmée ou photographiée, et nos élèves signent une autorisation de droit à l'image. Si tu apparais sur le site et que tu souhaites être retiré·e, écris-nous : nous le faisons rapidement.",
    ],
  },
  {
    titre: "Propriété",
    paragraphes: [
      "Les textes, photos et vidéos du site sont la propriété du Jeu de l'Acteur et de leurs auteurs. Merci de ne pas les reprendre sans notre accord.",
    ],
  },
];

export default function Rgpd() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-16">
      <header className="flex flex-col gap-4">
        <Scene numero="00" nom="Mentions légales" />
        <h1 className="font-affiche text-[3rem] uppercase leading-[0.95] sm:text-6xl">
          Mentions légales <span className="text-rouge">&amp; confidentialité.</span>
        </h1>
        <p className="text-sm text-secondaire">Mise à jour le {MISE_A_JOUR}</p>
      </header>
      {SECTIONS.map((s) => (
        <section key={s.titre} className="flex flex-col gap-2">
          <h2 className="font-affiche text-2xl uppercase text-rouge">{s.titre}</h2>
          {s.paragraphes.map((p) => (
            <p key={p} className="text-lg">
              {p}
            </p>
          ))}
        </section>
      ))}
    </main>
  );
}
