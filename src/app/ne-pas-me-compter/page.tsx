// Page discrète pour David (06/10) : ouverte une fois sur chacun de ses
// appareils, elle empêche que ses propres visites faussent les statistiques
// de l'onglet ÉCOLE. Non référencée, absente du menu.
import type { Metadata } from "next";
import Interrupteur from "./Interrupteur";

export const metadata: Metadata = {
  title: "Statistiques : cet appareil",
  robots: { index: false, follow: false },
};

export default function NePasMeCompter() {
  return (
    <main className="mx-auto flex min-h-[70svh] w-full max-w-xl flex-col justify-center gap-6 px-5 py-16 text-center">
      <h1 className="font-affiche text-5xl uppercase leading-none">
        Mes visites <span className="text-rouge">ne comptent pas.</span>
      </h1>
      <Interrupteur />
      <p className="text-sm text-secondaire">
        À faire une fois sur chaque appareil et chaque navigateur (iPhone, ordinateur…). Après la bascule du site sur
        lejeudelacteur.com, il faudra rouvrir cette page une fois sur chacun.
      </p>
    </main>
  );
}
