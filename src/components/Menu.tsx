"use client";

// Menu du site de l'école : en haut, fixe. Sur téléphone, un bouton ☰ ouvre
// la liste ; sur ordinateur, les liens sont visibles directement.
import Image from "next/image";
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
  { href: "/news", label: "Blog" },
  // Autre site : s'ouvre dans un nouvel onglet (le site de l'école reste ouvert)
  { href: "https://iacteur.com", label: "IACTEUR ↗" },
  { href: "/#contact", label: "Contact" },
];

export default function Menu() {
  const page = usePathname();
  const [ouvert, setOuvert] = useState(false);
  // On referme le menu à chaque changement de page
  useEffect(() => {
    void Promise.resolve().then(() => setOuvert(false));
  }, [page]);

  // « Blog » reste allumé dans les articles et les catégories du blog
  const actif = (href: string) =>
    href === "/news" ? page === "/news" || page.startsWith("/news/") || page.startsWith("/post/") : page === href;
  const lien = (href: string) =>
    `font-affiche text-base uppercase tracking-wide ${actif(href) ? "text-rouge" : "text-foreground"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-secondaire/15 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" aria-label="Le Jeu de l'Acteur, Avignon — accueil">
          <Image src="/logo/jeu-de-lacteur-blanc.png" alt="Le Jeu de l'Acteur" width={1400} height={87} priority className="h-auto w-[190px]" />
        </Link>
        <nav className="hidden items-center gap-4 lg:flex">
          {LIENS.map((l) => (
            <Link key={l.href} href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})} className={lien(l.href)}>
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
            <Link key={l.href} href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})} className={`${lien(l.href)} text-2xl`}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
