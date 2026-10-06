"use client";

// Bandeau de consentement (07/10/2026) : le pixel Meta ne se charge que si le
// visiteur accepte. « Refuser » est aussi simple qu'« Accepter ». Le choix est
// gardé 6 mois ; le lien « Gérer les cookies » du pied de page le rouvre.
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { estPasCompte } from "@/lib/provenance";
import {
  EVENEMENT_COOKIES,
  chargerPixel,
  evenementPixel,
  lireConsentement,
  noterConsentement,
} from "@/lib/pixel";

export default function Consentement() {
  const [visible, setVisible] = useState(false);
  const page = usePathname();
  const premiere = useRef(true);

  useEffect(() => {
    void Promise.resolve().then(() => {
      const choix = lireConsentement();
      if (choix === "oui" && !estPasCompte()) chargerPixel();
      if (choix === null) setVisible(true);
    });
    const rouvrir = () => setVisible(true);
    window.addEventListener(EVENEMENT_COOKIES, rouvrir);
    return () => window.removeEventListener(EVENEMENT_COOKIES, rouvrir);
  }, []);

  // Chaque page vue après la première est aussi notée pour les publicités
  useEffect(() => {
    if (premiere.current) {
      premiere.current = false;
      return;
    }
    if (lireConsentement() === "oui" && !estPasCompte()) evenementPixel("PageView");
  }, [page]);

  function choisir(choix: "oui" | "non") {
    noterConsentement(choix);
    setVisible(false);
    if (choix === "oui" && !estPasCompte()) chargerPixel();
  }

  if (!visible) return null;
  const bouton = "flex-1 rounded-md border border-foreground/40 px-4 py-3 font-affiche text-lg uppercase tracking-wide";
  return (
    <div role="dialog" aria-label="Cookies" className="fixed inset-x-0 bottom-0 z-50 border-t border-secondaire/30 bg-surface p-4 shadow-2xl">
      <div className="mx-auto flex max-w-3xl flex-col gap-3">
        <p className="text-sm">
          Avec ton accord, un pixel Facebook / Instagram mesure l&apos;effet de nos publicités. Sans ton accord, il reste
          éteint. Tu peux changer d&apos;avis à tout moment.{" "}
          <Link href="/rgpd" className="underline">
            En savoir plus
          </Link>
        </p>
        <div className="flex gap-3">
          <button type="button" onClick={() => choisir("non")} className={bouton}>
            Refuser
          </button>
          <button type="button" onClick={() => choisir("oui")} className={bouton}>
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
