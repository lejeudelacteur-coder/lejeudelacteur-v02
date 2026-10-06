// D'où vient le visiteur ? Lu une fois au début de sa visite (paramètres
// utm des publicités, ou site d'où il arrive), puis gardé pour la visite.
// Côté navigateur uniquement.
export type Provenance = { source: string; campagne: string; session: string };

function deviner(): Omit<Provenance, "session"> {
  const p = new URLSearchParams(window.location.search);
  const utm = p.get("utm_source");
  if (utm) return { source: utm.toLowerCase(), campagne: p.get("utm_campaign") ?? "" };
  if (p.get("fbclid")) return { source: "facebook", campagne: "" };
  if (p.get("gclid")) return { source: "google-ads", campagne: "" };
  const ref = document.referrer;
  if (!ref) return { source: "direct", campagne: "" };
  try {
    const hote = new URL(ref).hostname.replace(/^www\./, "");
    if (hote === window.location.hostname.replace(/^www\./, "")) return { source: "direct", campagne: "" };
    if (/instagram/.test(hote)) return { source: "instagram", campagne: "" };
    if (/facebook|fb\.com/.test(hote)) return { source: "facebook", campagne: "" };
    if (/google\./.test(hote)) return { source: "google", campagne: "" };
    if (/iacteur\.com/.test(hote)) return { source: "iacteur", campagne: "" };
    return { source: hote, campagne: "" };
  } catch {
    return { source: "autre", campagne: "" };
  }
}

// Un lien de campagne (utm, fbclid, gclid) l'emporte toujours sur ce qui a
// été retenu plus tôt dans la visite.
function lienDeCampagne() {
  const p = new URLSearchParams(window.location.search);
  return p.has("utm_source") || p.has("fbclid") || p.has("gclid");
}

export function lireProvenance(): Provenance {
  try {
    const garde = sessionStorage.getItem("ljda-provenance");
    if (garde) {
      const ancienne = JSON.parse(garde) as Provenance;
      if (!lienDeCampagne()) return ancienne;
      const p = { ...deviner(), session: ancienne.session };
      sessionStorage.setItem("ljda-provenance", JSON.stringify(p));
      return p;
    }
    const p = { ...deviner(), session: crypto.randomUUID() };
    sessionStorage.setItem("ljda-provenance", JSON.stringify(p));
    return p;
  } catch {
    return { ...deviner(), session: "" };
  }
}

// Chaque étape de la candidature n'est comptée qu'une fois par visite, même si
// la page est rechargée. Renvoie true si elle n'avait pas encore été comptée.
export function premiereFois(cle: string): boolean {
  try {
    const vues = new Set<string>(JSON.parse(sessionStorage.getItem("ljda-etapes") ?? "[]"));
    if (vues.has(cle)) return false;
    vues.add(cle);
    sessionStorage.setItem("ljda-etapes", JSON.stringify([...vues]));
    return true;
  } catch {
    return true;
  }
}

// « Ne pas me compter » (David, 06/10) : sur les appareils de David, les
// visites et les étapes ne sont pas notées. Réglé une fois par appareil et
// par navigateur, avec la page /ne-pas-me-compter.
export const CLE_PAS_COMPTE = "ljda-ne-pas-compter";
export function estPasCompte(): boolean {
  try {
    return localStorage.getItem(CLE_PAS_COMPTE) === "oui";
  } catch {
    return false;
  }
}

// Un identifiant anonyme gardé par ce navigateur (06/10), pour compter les
// visiteurs uniques : quelqu'un qui revient trois fois dans le mois compte
// pour un visiteur et trois visites.
export function visiteurAnonyme(): string {
  try {
    // « identifiant|date de création » ; renouvelé après 13 mois
    const [id, depuis] = (localStorage.getItem("ljda-visiteur") ?? "").split("|");
    if (id && depuis && Date.now() - Number(depuis) < 13 * 30 * 24 * 3600 * 1000) return id;
    const nouveau = crypto.randomUUID();
    localStorage.setItem("ljda-visiteur", `${nouveau}|${Date.now()}`);
    return nouveau;
  } catch {
    return "";
  }
}

// Les prises de contact sans formulaire : on reconnaît le lien touché.
export function cibleDuLien(href: string): string | null {
  if (href.startsWith("tel:")) return "telephone";
  if (href.startsWith("mailto:")) return "email";
  if (/wa\.me|whatsapp/i.test(href)) return "whatsapp";
  if (/iacteur\.com/i.test(href)) return "iacteur";
  if (/google\.[a-z.]+\/maps|maps\.google|maps\.app\.goo\.gl/i.test(href)) return "google-maps";
  if (/instagram\.com/i.test(href)) return "instagram";
  if (/facebook\.com/i.test(href)) return "facebook";
  return null;
}
