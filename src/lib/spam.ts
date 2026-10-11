// Démarchage automatique dans les formulaires (« Hello Lejeudelacteur Com Owner… »),
// 11/10/2026 : ces envois passent le champ piège, car ils sont remplis comme par
// une personne. On les reconnaît à leur contenu. Chaque indice vaut des points ;
// à 3 points, c'est du spam. Un vrai message n'en coche jamais assez : un lien
// seul (bande démo) ou un message en anglais seul (élève étranger) passent.
const MOTS_SPAM =
  /unsubscribe|website owner|\bowner\b|leads?\b|\bseo\b|backlinks?|marketing|free trial|live demo|crypto|bitcoin|casino|loan|google ranking|traffic to your/i;
const MOTS_ANGLAIS = /\b(the|your|you|and|with|that|this|our|can|business|website|now|more)\b/gi;
const MOTS_FRANCAIS = /\b(le|la|les|je|vous|bonjour|merci|pour|une|des|est|suis|cours|avec)\b/gi;

export function estUnSpam(c: { prenom: string; nom: string; telephone: string; message: string }) {
  const message = c.message;
  let points = 0;
  if (/https?:\/\/|www\./i.test(message)) points += 1;
  if (MOTS_SPAM.test(message)) points += 2;
  const anglais = message.match(MOTS_ANGLAIS)?.length ?? 0;
  const francais = message.match(MOTS_FRANCAIS)?.length ?? 0;
  if (anglais >= 5 && anglais > francais * 2) points += 1;
  // Un numéro français a 10 chiffres ; un numéro étranger commence par + ou 00
  const chiffres = c.telephone.replace(/\D/g, "");
  if (!/^\s*(\+|00)/.test(c.telephone) && chiffres.length !== 10) points += 1;
  if (c.nom && c.prenom.toLowerCase() === c.nom.toLowerCase()) points += 1;
  return points >= 3;
}
