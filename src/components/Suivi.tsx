"use client";

// Note chaque visite de page, avec sa provenance. La provenance (Instagram,
// Facebook, Google, publicité…) est retenue pour toute la visite, pour
// qu'une candidature envoyée trois pages plus loin garde sa vraie source.
// Note aussi les liens de contact touchés (téléphone, e-mail, IACTEUR…).
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { noterClic, noterVisite } from "@/lib/suivi-actions";
import { cibleDuLien, estPasCompte, lireProvenance, visiteurAnonyme } from "@/lib/provenance";

export default function Suivi() {
  const page = usePathname();
  useEffect(() => {
    if (estPasCompte()) return;
    const { source, campagne, session } = lireProvenance();
    void noterVisite(page, source, campagne, session, visiteurAnonyme());
  }, [page]);

  useEffect(() => {
    function auClic(e: MouseEvent) {
      const lien = (e.target as Element | null)?.closest?.("a");
      const cible = lien ? cibleDuLien(lien.getAttribute("href") ?? "") : null;
      if (!cible || estPasCompte()) return;
      const { source, session } = lireProvenance();
      void noterClic(cible, window.location.pathname, source, session, visiteurAnonyme());
    }
    document.addEventListener("click", auClic, true);
    return () => document.removeEventListener("click", auClic, true);
  }, []);
  return null;
}
