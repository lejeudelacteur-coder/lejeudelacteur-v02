// Les éléments de style « plateau de cinéma », communs à toutes les pages.
import Link from "next/link";

// Petit en-tête de scène : « SC. 01 · LE RÊVE »
export function Scene({ numero, nom }: { numero: string; nom: string }) {
  return (
    <div className="flex items-stretch self-start border border-secondaire/30 font-mono text-[11px] font-black uppercase tracking-[0.2em]">
      <span aria-hidden="true" className="w-8 bg-[repeating-linear-gradient(135deg,#f3ede4_0_5px,transparent_5px_10px)]" />
      <span className="border-l border-secondaire/30 px-3 py-2 text-rouge">SC. {numero}</span>
      <span className="border-l border-secondaire/30 px-3 py-2">{nom}</span>
    </div>
  );
}

export function Titre({ children, rouge }: { children: React.ReactNode; rouge?: React.ReactNode }) {
  return (
    <h2 className="font-affiche text-[2.6rem] uppercase leading-[0.95] sm:text-6xl">
      {children} {rouge && <span className="text-rouge">{rouge}</span>}
    </h2>
  );
}

export function BoutonRouge({ href, children }: { href: string; children: React.ReactNode }) {
  const classe =
    "inline-block rounded-md bg-rouge px-6 py-4 text-center font-affiche text-xl uppercase tracking-wide text-white";
  return href.startsWith("/") && !href.startsWith("//") ? (
    <Link href={href} className={classe}>
      {children} →
    </Link>
  ) : (
    // Lien vers un autre site (IACTEUR…) : nouvel onglet, pour que le site de
    // l'école reste ouvert derrière (demande de David, 06/10)
    <a href={href} target="_blank" rel="noopener" className={classe}>
      {children} →
    </a>
  );
}

export function PiedDePage() {
  return (
    <footer className="border-t border-secondaire/20 px-5 py-10 text-center text-sm text-secondaire">
      <p className="font-affiche text-2xl uppercase text-foreground">Le Jeu de l&apos;Acteur</p>
      <p className="mt-1">École de comédiens, théâtre &amp; cinéma</p>
      <p className="mt-3">Théâtre de l&apos;Oriflamme · 5 rue Portail Matheron · 84000 Avignon</p>
      <p className="mt-1">
        <a href="tel:+33623181579" className="underline">
          06 23 18 15 79
        </a>{" "}
        ·{" "}
        <a href="mailto:contact@lejeudelacteur.com" className="underline">
          contact@lejeudelacteur.com
        </a>
      </p>
      <p className="mt-4 text-xs">© Le Jeu de l&apos;Acteur 2019-2026</p>
    </footer>
  );
}
