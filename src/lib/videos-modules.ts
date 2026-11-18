// LES SHORTS DES MODULES (18/11/2026, David) : un court clip YouTube (vertical, non répertorié) par module d'IACTEUR,
// montré dans l'encart IACTEUR des articles du blog (voir EncartIacteur). Au plus deux par article.
// « role » (MON RÔLE EN ENTIER) : pas de short pour l'instant (son intégration YouTube était refusée au 18/11).
import type { ModuleEncart } from "@/lib/blog";

export type ShortModule = { id: string; titre: string };

export const SHORTS_PAR_MODULE: Record<ModuleEncart, ShortModule[]> = {
  solo: [{ id: "J_Km9mNohXs", titre: "Un monologue écrit pour toi : SOLO" }],
  duo: [{ id: "4dcVQlES_Xo", titre: "Une scène à deux écrite sur mesure : DUO" }],
  replique: [{ id: "cHxvYuVgcI0", titre: "Apprendre son texte seul, avec la réplique : RÉPLIQUE" }],
  role: [],
  casting: [
    { id: "Qc1rlKZwDlY", titre: "CASTING CALL : les castings viennent à toi" },
    { id: "oXynN2bNYyI", titre: "Ta fiche casting d'acteur, prête à envoyer" },
  ],
  carriere: [
    { id: "82oyKZORIvk", titre: "Garder la trace de ta carrière d'acteur : CARRIÈRE" },
    { id: "aMROLUdTaZc", titre: "Un carnet de contacts pour acteur : qui, quand, pourquoi" },
  ],
};
