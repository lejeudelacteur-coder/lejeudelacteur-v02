"use server";

// Formulaire « Partenaire de jeu » (parrainage) : enregistré dans ADMIN >
// ÉCOLE (type « partenaire »), e-mail à l'école et accusé au filleul.
import { headers } from "next/headers";
import { base } from "@/lib/supabase";
import { envoyerEmail } from "@/lib/emails";
import { estUnRobot } from "@/lib/robots";

export type EtatParrainage = { ok: boolean; message: string } | undefined;

const COURS: Record<string, string> = { intensif: "le Cursus intensif", pro: "le Pro du lundi" };

export async function envoyerParrainage(_e: EtatParrainage, formData: FormData): Promise<EtatParrainage> {
  if (String(formData.get("site") ?? "")) return { ok: true, message: "Merci !" };
  if (estUnRobot((await headers()).get("user-agent"))) return { ok: false, message: "Envoi impossible." };
  const champ = (cle: string, max = 120) => String(formData.get(cle) ?? "").trim().slice(0, max);
  const parrain = champ("parrain");
  const filleul = champ("filleul");
  const email = champ("email", 200).toLowerCase();
  const telephone = champ("telephone", 30);
  const cours = COURS[champ("cours", 20)] ? champ("cours", 20) : "";
  if (!parrain || !filleul || !cours || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Il manque un nom, le cours ou un e-mail valide." };
  }
  const { error } = await base()
    .from("ecole_candidatures")
    .insert({
      formation: "partenaire",
      prenom: filleul,
      nom: "",
      telephone,
      email,
      motivation: `Partenaire de jeu : ${filleul}, parrainé·e par ${parrain}, pour ${COURS[cours]}.`,
      source: champ("source"),
      campagne: champ("campagne"),
    });
  if (error) {
    console.log("[PARTENAIRE] Erreur :", error.message);
    return { ok: false, message: "L'envoi n'a pas fonctionné. Appelle-nous au 06 23 18 15 79." };
  }
  await envoyerEmail({
    to: "contact@lejeudelacteur.com",
    replyTo: email,
    subject: `🤝 Partenaire de jeu — ${filleul}, parrainé·e par ${parrain}`,
    text: `Nouvelle demande Partenaire de jeu.

Le nouveau (filleul) : ${filleul}
Parrainé·e par : ${parrain}
Pour : ${COURS[cours]}
E-mail : ${email}
Téléphone : ${telephone || "—"}

Pour répondre : répondre à ce message.`,
  });
  await envoyerEmail({
    to: email,
    replyTo: "contact@lejeudelacteur.com",
    subject: "Partenaire de jeu : ta demande est bien arrivée",
    text: `Bonjour,

Ta demande Partenaire de jeu (${filleul}, parrainé·e par ${parrain}, pour ${COURS[cours]}) est bien arrivée. On te recontacte sous 24 heures.

À très vite sur le plateau,

Le Jeu de l'Acteur, Avignon`,
  });
  return { ok: true, message: "Merci ! La demande est bien arrivée : on vous recontacte sous 24 heures." };
}
