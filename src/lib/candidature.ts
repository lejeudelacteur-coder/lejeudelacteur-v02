// Les 6 « prises » de la candidature à l'Intensif (reprises de la page de
// référence). Une seule liste pour le formulaire, l'enregistrement et
// l'e-mail envoyé à David.
export type Question = { cle: string; titre: string; aide?: string; choix: { valeur: string; libelle: string }[] };

export const QUESTIONS_INTENSIF: Question[] = [
  {
    cle: "age",
    titre: "Quel âge as-tu ?",
    choix: [
      { valeur: "18-25", libelle: "18 à 25 ans" },
      { valeur: "26-35", libelle: "26 à 35 ans" },
      { valeur: "36+", libelle: "36 ans et plus" },
      { valeur: "17-bientot-18", libelle: "17 ans, j'aurai 18 ans pendant l'année" },
      { valeur: "moins-17", libelle: "Moins de 17 ans" },
    ],
  },
  {
    cle: "dispo",
    titre: "Peux-tu te libérer du lundi au jeudi, de 14 h à 17 h ?",
    aide: "De fin septembre à début juin, hors vacances scolaires.",
    choix: [
      { valeur: "oui", libelle: "Oui, sans problème" },
      { valeur: "en-m-organisant", libelle: "Oui, en m'organisant" },
      { valeur: "non", libelle: "Non, ce n'est pas possible" },
    ],
  },
  {
    cle: "niveau",
    titre: "Où en es-tu dans le jeu ?",
    choix: [
      { valeur: "zero", libelle: "Je pars de zéro" },
      { valeur: "quelques-cours", libelle: "J'ai pris quelques cours ou stages" },
      { valeur: "deja-joue", libelle: "J'ai déjà joué ou tourné" },
    ],
  },
  {
    cle: "objectif",
    titre: "Qu'est-ce que tu vises ?",
    choix: [
      { valeur: "castings", libelle: "Passer mes premiers castings" },
      { valeur: "tourner", libelle: "Tourner dans des films ou des séries" },
      { valeur: "metier", libelle: "Devenir acteur, en faire mon métier" },
      { valeur: "me-tester", libelle: "Me tester sérieusement avant de me lancer" },
    ],
  },
  {
    cle: "budget",
    titre: "365 € par mois pendant 10 mois. C'est envisageable pour toi ?",
    aide: "Tout compris : tournages, montage, bande démo, book photo et suivi.",
    choix: [
      { valeur: "oui", libelle: "Oui" },
      { valeur: "a-deux", libelle: "Oui, à deux avec le tarif partenaire (328 €/mois)" },
      { valeur: "pas-maintenant", libelle: "Pas pour le moment" },
    ],
  },
];

export function libelle(cle: string, valeur: string) {
  return QUESTIONS_INTENSIF.find((q) => q.cle === cle)?.choix.find((c) => c.valeur === valeur)?.libelle ?? valeur;
}
