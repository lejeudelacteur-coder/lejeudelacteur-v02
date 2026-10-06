// PIXEL META (publicités Facebook / Instagram), 07/10/2026 — le même pixel
// que sur le site Wix. Il ne se charge QU'APRÈS le consentement du visiteur
// (bandeau), et seulement sur le vrai domaine (pas sur l'aperçu Vercel, pour
// ne pas fausser les données des publicités).
export const PIXEL_ID = "1538718027568728";
export const CLE_CONSENTEMENT = "ljda-consentement";
export const EVENEMENT_COOKIES = "ljda-cookies";

type Fbq = (...args: unknown[]) => void;

// Le choix du visiteur : renouvelé tous les 6 mois (recommandation de la CNIL)
export function lireConsentement(): "oui" | "non" | null {
  try {
    const [choix, quand] = (localStorage.getItem(CLE_CONSENTEMENT) ?? "").split("|");
    if ((choix === "oui" || choix === "non") && Date.now() - Number(quand) < 182 * 24 * 3600 * 1000) return choix;
  } catch {
    // stockage indisponible : on redemande
  }
  return null;
}

export function noterConsentement(choix: "oui" | "non") {
  try {
    localStorage.setItem(CLE_CONSENTEMENT, `${choix}|${Date.now()}`);
  } catch {
    // tant pis : on redemandera à la prochaine visite
  }
}

export function domaineReel() {
  return /(^|\.)lejeudelacteur\.com$/.test(window.location.hostname);
}

// Un événement pour les publicités (ex. « Lead » : une demande envoyée)
export function evenementPixel(nom: string) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (fbq) fbq("track", nom);
}

export function chargerPixel() {
  const w = window as unknown as { fbq?: Fbq & { loaded?: boolean; queue?: unknown[]; callMethod?: Fbq; push?: unknown; version?: string }; _fbq?: unknown };
  if (w.fbq || !domaineReel()) return;
  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args);
    else n.queue.push(args);
  } as Fbq & { loaded: boolean; queue: unknown[]; callMethod?: Fbq; push: unknown; version: string };
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  w.fbq = n;
  w._fbq = n;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  n("init", PIXEL_ID);
  n("track", "PageView");
}
