"use client";

// Le bandeau de fin d'article (07/10/2026). Pour un visiteur près d'Avignon :
// le cours d'essai (et IACTEUR en plus sur les articles de travail d'acteur).
// Pour les autres : IACTEUR seulement (un cours à Avignon ne leur dit rien).
// Avant de savoir où il est, la page affiche le cas « près d'Avignon ».
import { useEffect, useState, type ReactNode } from "react";

const CLE = "ljda-proche-avignon";

export default function CtaArticle({ ecole, iacteur, acteur }: { ecole: ReactNode; iacteur: ReactNode; acteur: boolean }) {
  const [proche, setProche] = useState(true);

  useEffect(() => {
    let annule = false;
    void Promise.resolve().then(async () => {
      try {
        const garde = sessionStorage.getItem(CLE);
        if (garde) return !annule && setProche(garde === "oui");
        const r = await fetch("/api/lieu");
        const { proche: p } = (await r.json()) as { proche: boolean };
        sessionStorage.setItem(CLE, p ? "oui" : "non");
        if (!annule) setProche(p);
      } catch {
        // pas de réponse : on garde le bandeau du cours d'essai
      }
    });
    return () => {
      annule = true;
    };
  }, []);

  return (
    <>
      {proche && ecole}
      {(!proche || acteur) && iacteur}
    </>
  );
}
