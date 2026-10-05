"use client";

// Menu du site de l'école : en haut, fixe. Sur téléphone, un bouton ☰ ouvre
// la liste ; sur ordinateur, les liens sont visibles directement.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LIENS = [
  { href: "/cours-intensif", label: "Intensif" },
  { href: "/cours-pros", label: "Pro du lundi" },
  { href: "/cours-loisirs", label: "Loisirs" },
  { href: "/%C3%A9quipe", label: "Équipe" },
  { href: "https://iacteur.com", label: "IACTEUR" },
  { href: "/#contact", label: "Contact" },
];

export default function Menu() {
  const page = usePathname();
  const [ouvert, setOuvert] = useState(false);
  // On referme le menu à chaque changement de page
  useEffect(() => {
    void Promise.resolve().then(() => setOuvert(false));
  }, [page]);

  const lien = (href: string) =>
    `font-affiche text-lg uppercase tracking-wide ${page === href ? "text-rouge" : "text-foreground"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-secondaire/15 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" className="font-affiche text-xl uppercase tracking-wide">
          Le Jeu de l&apos;<span className="text-rouge">A</span>cteur
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {LIENS.map((l) => (
            <Link key={l.href} href={l.href} className={lien(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setOuvert((o) => !o)}
          aria-expanded={ouvert}
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          className="text-2xl md:hidden"
        >
          {ouvert ? "✕" : "☰"}
        </button>
      </div>
      {ouvert && (
        <nav className="flex flex-col gap-4 border-t border-secondaire/15 px-5 py-5 md:hidden">
          {LIENS.map((l) => (
            <Link key={l.href} href={l.href} className={`${lien(l.href)} text-2xl`}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
