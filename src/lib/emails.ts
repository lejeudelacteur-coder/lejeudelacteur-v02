// Envoi d'un e-mail via Resend (même compte qu'IACTEUR, clé RESEND_API_KEY
// à ajouter dans Vercel). Sans clé, rien ne part : on le note simplement.
import "server-only";

export async function envoyerEmail(mail: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  const cle = process.env.RESEND_API_KEY;
  if (!cle) {
    console.log("[E-MAIL] Pas de clé Resend : e-mail non envoyé à", mail.to);
    return false;
  }
  const reponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${cle}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Le Jeu de l'Acteur <notifications@iacteur.com>",
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      reply_to: mail.replyTo,
    }),
  });
  if (!reponse.ok) console.log("[E-MAIL] Échec :", reponse.status, await reponse.text());
  return reponse.ok;
}
