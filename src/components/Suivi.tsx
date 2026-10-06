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
      // Sur téléphone, un lien vers IACTEUR s'ouvre dans la MÊME fenêtre : dans
      // un nouvel onglet, il n'y a pas de bouton « retour » et on reste coincé
      // là-bas (David, 07/10). Sur ordinateur : nouvel onglet, comme prévu.
      const ici =
        !!lien &&
        lien.target === "_blank" &&
        /^https?:\/\/(www\.)?iacteur\.com(\/|$)/.test(lien.href) &&
        window.matchMedia("(pointer: coarse)").matches;
      if (ici) e.preventDefault();

      const cible = lien ? cibleDuLien(lien.getAttribute("href") ?? "") : null;
      if (cible && !estPasCompte()) {
        const { source, session } = lireProvenance();
        void noterClic(cible, window.location.pathname, source, session, visiteurAnonyme());
      }
      // Un court instant, pour que le clic soit bien noté avant de quitter la page
      if (ici && lien) setTimeout(() => window.location.assign(lien.href), 250);
    }
    document.addEventListener("click", auClic, true);
    return () => document.removeEventListener("click", auClic, true);
  }, []);
  return null;
}
