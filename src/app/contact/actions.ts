"use server";

// Formulaire de contact (cours d'essai, questions) : enregistré comme une
// candidature (formation pro / loisirs / autre), visible dans ADMIN > ÉCOLE,
// avec un e-mail à l'école et un accusé à la personne.
import { headers } from "next/headers";
import { base } from "@/lib/supabase";
import { envoyerEmail } from "@/lib/emails";
import { estUnRobot } from "@/lib/robots";

export type EtatContact = { ok: boolean; message: string } | undefined;

const SUJETS: Record<string, string> = {
  loisirs: "un cours d'essai Loisirs",
  pro: "le Pro du lundi",
  intensif: "la formation intensive",
  stage: "un stage",
  autre: "une question",
};

export async function envoyerContact(_etat: EtatContact, formData: FormData): Promise<EtatContact> {
  if (String(formData.get("site") ?? "")) return { ok: true, message: "Merci !" };
  if (estUnRobot((await headers()).get("user-agent"))) return { ok: false, message: "Envoi impossible." };
  const champ = (cle: string, max = 200) => String(formData.get(cle) ?? "").trim().slice(0, max);
  const prenom = champ("prenom", 80);
  const nom = champ("nom", 80);
  const telephone = champ("telephone", 30);
  const email = champ("email").toLowerCase();
  const message = champ("message", 2000);
  const sujet = SUJETS[champ("sujet", 20)] ? champ("sujet", 20) : "autre";
  if (!prenom || !telephone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Il manque ton prénom, ton téléphone ou un e-mail valide." };
  }

  const { error } = await base()
    .from("ecole_candidatures")
    .insert({
      formation: sujet,
      prenom,
      nom,
      telephone,
      email,
      motivation: message,
      source: champ("source", 120),
      campagne: champ("campagne", 120),
    });
  if (error) {
    console.log("[CONTACT] Erreur d'enregistrement :", error.message);
    return { ok: false, message: "L'envoi n'a pas fonctionné. Appelle-nous au 06 23 18 15 79." };
  }

  await envoyerEmail({
    to: "contact@lejeudelacteur.com",
    replyTo: email,
    subject: `📩 ${SUJETS[sujet][0].toUpperCase()}${SUJETS[sujet].slice(1)} — ${prenom} ${nom}`,
    text: `Demande depuis le site : ${SUJETS[sujet]}.

${prenom} ${nom}
Téléphone : ${telephone}
E-mail : ${email}

Message :
${message || "—"}

Provenance : ${champ("source", 120) || "inconnue"}

Pour répondre par e-mail : répondre à ce message.`,
  });
  await envoyerEmail({
    to: email,
    replyTo: "contact@lejeudelacteur.com",
    subject: "Ta demande au Jeu de l'Acteur",
    text: `Bonjour ${prenom},

Ta demande concernant ${SUJETS[sujet]} est bien arrivée. On te répond sous 24 heures.

Si tu préfères appeler : 06 23 18 15 79.

À très vite,

Le Jeu de l'Acteur, Avignon`,
  });
  return { ok: true, message: `Merci ${prenom} ! On te répond sous 24 heures.` };
}
