"use server";

// Envoi d'une candidature à l'Intensif : enregistrée en base (onglet ÉCOLE
// d'IACTEUR), un e-mail à David, un accusé de réception au candidat.
import { headers } from "next/headers";
import { base } from "@/lib/supabase";
import { envoyerEmail } from "@/lib/emails";
import { QUESTIONS_INTENSIF, libelle } from "@/lib/candidature";
import { estUnRobot } from "@/lib/robots";

export type EtatCandidature = { ok: boolean; message: string } | null;

const ADRESSE_ECOLE = "contact@lejeudelacteur.com";

export async function envoyerCandidature(
  reponses: Record<string, string>,
  contact: Record<string, string>,
  provenance: { source: string; campagne: string; session: string }
): Promise<EtatCandidature> {
  // Champ piège invisible : seuls les robots le remplissent
  if (contact.site) return { ok: true, message: "Merci !" };
  if (estUnRobot((await headers()).get("user-agent"))) return { ok: false, message: "Envoi impossible." };

  const champ = (t: unknown, max = 200) => String(t ?? "").trim().slice(0, max);
  const prenom = champ(contact.prenom, 80);
  const nom = champ(contact.nom, 80);
  const telephone = champ(contact.telephone, 30);
  const email = champ(contact.email, 200).toLowerCase();
  const ville = champ(contact.ville, 80);
  const motivation = champ(contact.motivation, 1000);
  if (!prenom || !nom || !telephone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Il manque ton prénom, ton nom, ton téléphone ou un e-mail valide." };
  }
  if (contact.consentement !== "oui") {
    return { ok: false, message: "Coche la case d'accord pour qu'on puisse te recontacter." };
  }
  const r = (cle: string) => {
    const v = champ(reponses[cle], 40);
    return QUESTIONS_INTENSIF.find((q) => q.cle === cle)?.choix.some((c) => c.valeur === v) ? v : "";
  };

  const { error } = await base()
    .from("ecole_candidatures")
    .insert({
      formation: "intensif",
      age: r("age"),
      dispo: r("dispo"),
      niveau: r("niveau"),
      objectif: r("objectif"),
      budget: r("budget"),
      prenom,
      nom,
      telephone,
      email,
      ville,
      motivation,
      source: champ(provenance?.source, 120),
      campagne: champ(provenance?.campagne, 120),
    });
  if (error) {
    console.log("[CANDIDATURE] Erreur d'enregistrement :", error.message);
    return { ok: false, message: `L'envoi n'a pas fonctionné. Appelle-nous au 06 23 18 15 79, ou écris à ${ADRESSE_ECOLE}.` };
  }
  if (provenance?.session) {
    await base().from("ecole_etapes").insert({ formation: "intensif", etape: 7, session: champ(provenance.session, 60) });
  }

  const lignes = QUESTIONS_INTENSIF.map((q) => `${q.titre}\n→ ${libelle(q.cle, r(q.cle)) || "—"}`).join("\n\n");
  await envoyerEmail({
    to: ADRESSE_ECOLE,
    replyTo: email,
    subject: `🎬 Candidature Intensif — ${prenom} ${nom}`,
    text: `Nouvelle candidature à la formation intensive.

${prenom} ${nom}
Téléphone : ${telephone}
E-mail : ${email}
Ville : ${ville || "—"}

${lignes}

Pourquoi veut-il/elle jouer :
${motivation || "—"}

Provenance : ${provenance?.source || "inconnue"}${provenance?.campagne ? ` (campagne : ${provenance.campagne})` : ""}

À rappeler pour fixer l'entretien. Pour répondre par e-mail : répondre à ce message.`,
  });
  await envoyerEmail({
    to: email,
    replyTo: ADRESSE_ECOLE,
    subject: "Ta candidature au Jeu de l'Acteur",
    text: `Bonjour ${prenom},

Ta candidature à la formation intensive est bien arrivée. Merci !

On te rappelle sous 24 heures pour fixer ton entretien gratuit, au numéro que tu nous as donné (${telephone}).

Si tu préfères appeler toi-même : 06 23 18 15 79.

À très vite sur le plateau,

David Rousseau
Le Jeu de l'Acteur, Avignon`,
  });

  return { ok: true, message: `Merci ${prenom} ! Ta candidature est bien arrivée. On te rappelle sous 24 heures pour fixer ton entretien.` };
}
