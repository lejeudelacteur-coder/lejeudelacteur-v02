"use server";

// Statistiques du site (onglet ÉCOLE de l'ADMIN d'IACTEUR) : visites et
// étapes de la candidature. Aucune donnée personnelle : une session
// anonyme, la page, la provenance.
import { headers } from "next/headers";
import { base } from "@/lib/supabase";
import { estUnRobot } from "@/lib/robots";

const court = (t: unknown, max = 120) => String(t ?? "").slice(0, max);

// Les tests sur l'ordinateur de développement (Claude, aperçu local) ne sont
// pas comptés : ils écrivent dans la même base que le vrai site.
const EN_TEST = process.env.NODE_ENV === "development";

// La ville et le pays viennent de Vercel (déduits de l'adresse IP, qui
// n'est pas gardée).
async function lieu() {
  const h = await headers();
  let ville = h.get("x-vercel-ip-city") ?? "";
  try {
    ville = decodeURIComponent(ville);
  } catch {
    // ville mal encodée : on la garde telle quelle
  }
  return { ville: court(ville, 80), pays: court(h.get("x-vercel-ip-country"), 4) };
}

export async function noterVisite(page: string, source: string, campagne: string, session: string, visiteur = "") {
  if (EN_TEST) return;
  const ua = (await headers()).get("user-agent");
  if (estUnRobot(ua)) return;
  await base()
    .from("ecole_visites")
    .insert({
      page: court(page, 200),
      source: court(source),
      campagne: court(campagne),
      session: court(session, 60),
      visiteur: court(visiteur, 60),
      appareil: court(ua, 300),
      ...(await lieu()),
    });
}

// Un lien de contact touché (téléphone, e-mail, IACTEUR, itinéraire…)
export async function noterClic(cible: string, page: string, source: string, session: string, visiteur: string) {
  if (EN_TEST) return;
  const ua = (await headers()).get("user-agent");
  if (estUnRobot(ua)) return;
  await base()
    .from("ecole_clics")
    .insert({ cible: court(cible, 40), page: court(page, 200), source: court(source), session: court(session, 60), visiteur: court(visiteur, 60) });
}

export async function noterEtape(formation: string, etape: number, session: string) {
  if (EN_TEST || !Number.isInteger(etape) || etape < 1 || etape > 7) return;
  const ua = (await headers()).get("user-agent");
  if (estUnRobot(ua)) return;
  await base().from("ecole_etapes").insert({ formation: court(formation, 40), etape, session: court(session, 60) });
}

// « Sur le site en ce moment » (07/10) : une ligne par visiteur, mise à jour
// chaque minute tant que le site est à l'écran (pas de robot, pas de test).
export async function signeDeVie(page: string, visiteur: string, source: string) {
  if (EN_TEST || !visiteur) return;
  const ua = (await headers()).get("user-agent");
  if (estUnRobot(ua)) return;
  const b = base();
  await b.from("ecole_presence").upsert({
    visiteur: court(visiteur, 60),
    page: court(page, 200),
    source: court(source),
    appareil: court(ua, 300),
    derniere_vue: new Date().toISOString(),
    ...(await lieu()),
  });
  // Ménage : de temps en temps, on efface les lignes de plus d'un jour
  if (Math.random() < 0.02) {
    await b.from("ecole_presence").delete().lt("derniere_vue", new Date(Date.now() - 24 * 3600 * 1000).toISOString());
  }
}
