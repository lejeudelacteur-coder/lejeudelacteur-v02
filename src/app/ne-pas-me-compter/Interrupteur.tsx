"use client";

import { useEffect, useState } from "react";
import { CLE_PAS_COMPTE, estPasCompte } from "@/lib/provenance";

export default function Interrupteur() {
  const [actif, setActif] = useState<boolean | null>(null);
  useEffect(() => {
    // À l'ouverture de la page, cet appareil n'est plus compté
    void Promise.resolve().then(() => {
      try {
        localStorage.setItem(CLE_PAS_COMPTE, "oui");
      } catch {
        // stockage refusé (navigation privée) : rien à faire
      }
      setActif(estPasCompte());
    });
  }, []);

  function basculer() {
    try {
      if (actif) localStorage.removeItem(CLE_PAS_COMPTE);
      else localStorage.setItem(CLE_PAS_COMPTE, "oui");
    } catch {
      // ignoré
    }
    setActif(estPasCompte());
  }

  if (actif === null) return <p>…</p>;
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-lg">
        {actif
          ? "✓ Sur cet appareil, tes visites ne sont plus comptées dans les statistiques."
          : "Sur cet appareil, tes visites sont comptées (comme un visiteur normal)."}
      </p>
      {actif === false && (
        <p className="text-sm text-secondaire">
          Si ce message reste affiché, ce navigateur refuse le stockage (navigation privée ?).
        </p>
      )}
      <button type="button" onClick={basculer} className="text-sm text-secondaire underline">
        {actif ? "Compter à nouveau mes visites sur cet appareil" : "Ne plus compter mes visites sur cet appareil"}
      </button>
    </div>
  );
}
