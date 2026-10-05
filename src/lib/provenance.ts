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
