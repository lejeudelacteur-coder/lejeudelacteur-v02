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

export async function noterVisite(page: string, source: string, campagne: string, session: string) {
  if (EN_TEST) return;
  const ua = (await headers()).get("user-agent");
  if (estUnRobot(ua)) return;
  await base()
    .from("ecole_visites")
    .insert({ page: court(page, 200), source: court(source), campagne: court(campagne), session: court(session, 60), appareil: court(ua, 300) });
}

export async function noterEtape(formation: string, etape: number, session: string) {
  if (EN_TEST || !Number.isInteger(etape) || etape < 1 || etape > 7) return;
  const ua = (await headers()).get("user-agent");
  if (estUnRobot(ua)) return;
  await base().from("ecole_etapes").insert({ formation: court(formation, 40), etape, session: court(session, 60) });
}
