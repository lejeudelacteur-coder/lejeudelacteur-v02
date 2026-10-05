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
  { href: "/stages-casting", label: "Stages" },
  { href: "/book-vid%C3%A9o", label: "Book / Vidéo" },
  { href: "/%C3%A9quipe", label: "Équipe" },
  { href: "/th%C3%A9%C3%A2tredeloriflamme", label: "Le théâtre" },
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
    `font-affiche text-base uppercase tracking-wide ${page === href ? "text-rouge" : "text-foreground"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-secondaire/15 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" className="font-affiche text-xl uppercase tracking-wide">
          Le Jeu de l&apos;<span className="text-rouge">A</span>cteur
        </Link>
        <nav className="hidden items-center gap-4 lg:flex">
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
          className="text-2xl lg:hidden"
        >
          {ouvert ? "✕" : "☰"}
        </button>
      </div>
      {ouvert && (
        <nav className="flex flex-col gap-4 border-t border-secondaire/15 px-5 py-5 lg:hidden">
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
