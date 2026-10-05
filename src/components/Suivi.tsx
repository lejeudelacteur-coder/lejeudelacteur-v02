"use client";

// Note chaque visite de page, avec sa provenance. La provenance (Instagram,
// Facebook, Google, publicité…) est retenue pour toute la visite, pour
// qu'une candidature envoyée trois pages plus loin garde sa vraie source.
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { noterVisite } from "@/lib/suivi-actions";
import { estPasCompte, lireProvenance } from "@/lib/provenance";

export default function Suivi() {
  const page = usePathname();
  useEffect(() => {
    if (estPasCompte()) return;
    const { source, campagne, session } = lireProvenance();
    void noterVisite(page, source, campagne, session);
  }, [page]);
  return null;
}
