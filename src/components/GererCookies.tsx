"use client";

// Rouvre le bandeau de consentement (lien du pied de page).
import { EVENEMENT_COOKIES } from "@/lib/pixel";

export default function GererCookies() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(EVENEMENT_COOKIES))} className="underline">
      Gérer les cookies
    </button>
  );
}
