"use client";

// CARROUSEL DE L'AFFICHE D'ACCUEIL (21/11/2026, David) : 5 photos de cinéma qui se fondent l'une dans l'autre toutes les
// 4 secondes (20 s pour le tour complet), petits points au milieu en bas pour choisir, balayage du doigt sur mobile.
// - La 1re photo est chargée tout de suite (page rapide) ; les autres arrivent juste après, sans gêner l'ouverture.
// - Dès que le visiteur touche un point ou balaie, le défilement automatique s'arrête (il choisit lui-même).
// - Si l'appareil demande « réduire les animations », il n'y a pas de défilement automatique ni de fondu.
// - Sur mobile, la photo (verticale, recadrée sur le visage) occupe les 92 % du bas de l'affiche : le visage tombe entre le
//   titre (en haut) et le texte (en bas), et se fond vers le haut. Sur grand écran, elle remplit toute l'affiche.
// - Le titre et les boutons restent dans la page (ce composant ne fait que le fond, le dégradé et les points).
import { useCallback, useEffect, useRef, useState } from "react";

export type DiapoHero = {
  /** Photo large (ordinateur, tablette). */
  src: string;
  /** Photo verticale recadrée sur le visage (téléphone) : l'affiche est haute et étroite sur mobile. */
  mobile: string;
  alt: string;
  /** Position horizontale de la photo large (%), 50 par défaut. */
  position?: number;
};

const DELAI_MS = 4000;

export default function HeroCarrousel({ diapos }: { diapos: DiapoHero[] }) {
  const [actuelle, setActuelle] = useState(0);
  const [suite, setSuite] = useState(false); // les photos 2 à 5 ne sont chargées qu'après l'ouverture de la page
  const [auto, setAuto] = useState(true);
  const racine = useRef<HTMLDivElement>(null);
  const n = diapos.length;

  // Charger la suite un peu après l'affichage de la première photo
  useEffect(() => {
    const t = window.setTimeout(() => setSuite(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  // Pas de défilement si l'appareil le demande
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
  }, []);

  // Défilement automatique, seulement quand la suite est chargée et que la page est visible
  useEffect(() => {
    if (!auto || !suite) return;
    const t = window.setInterval(() => {
      if (document.visibilityState === "visible") setActuelle((i) => (i + 1) % n);
    }, DELAI_MS);
    return () => window.clearInterval(t);
  }, [auto, suite, n]);

  const aller = useCallback(
    (i: number) => {
      setSuite(true);
      setAuto(false); // le visiteur choisit lui-même
      setActuelle(((i % n) + n) % n);
    },
    [n]
  );

  // Balayage du doigt : écouté sur toute l'affiche (le titre et les boutons recouvrent le fond)
  useEffect(() => {
    const zone = racine.current?.parentElement;
    if (!zone) return;
    let x0 = 0;
    let y0 = 0;
    const debut = (e: TouchEvent) => {
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    };
    const fin = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) aller(actuelle + (dx < 0 ? 1 : -1));
    };
    zone.addEventListener("touchstart", debut, { passive: true });
    zone.addEventListener("touchend", fin, { passive: true });
    return () => {
      zone.removeEventListener("touchstart", debut);
      zone.removeEventListener("touchend", fin);
    };
  }, [actuelle, aller]);

  return (
    <div ref={racine} className="absolute inset-0">
      {diapos.map((d, i) => {
        if (i > 0 && !suite) return null;
        return (
          <picture key={d.src}>
            <source media="(min-width: 768px)" srcSet={d.src} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={d.mobile}
              alt={d.alt}
              aria-hidden={i !== actuelle}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
              style={{ objectPosition: `var(--pos) center`, ["--pos" as string]: `${d.position ?? 50}%` }}
              className={`absolute inset-x-0 bottom-0 top-[8%] h-[92%] w-full object-cover opacity-0 [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_16%)] [mask-image:linear-gradient(to_bottom,transparent,#000_16%)] md:inset-0 md:h-full md:[-webkit-mask-image:none] md:[mask-image:none] transition-opacity duration-1000 motion-reduce:transition-none ${
                i === actuelle ? "!opacity-90" : ""
              }`}
            />
          </picture>
        );
      })}
      {/* Le flou ne monte plus haut : sombre seulement derrière le texte du bas, léger en haut pour le titre, la photo reste claire au milieu */}
      <div className="absolute inset-0 bg-gradient-to-t from-background from-0% via-background/70 via-22% to-transparent to-52% md:via-25% md:to-60%" />
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center gap-1" role="group" aria-label="Choisir une photo">
        {diapos.map((d, i) => (
          <button
            key={d.src}
            type="button"
            onClick={() => aller(i)}
            aria-label={`Photo ${i + 1} sur ${n}`}
            aria-current={i === actuelle}
            className="flex h-7 w-7 items-center justify-center"
          >
            <span className={`block h-2 rounded-full transition-all duration-300 ${i === actuelle ? "w-5 bg-rouge" : "w-2 bg-foreground/50"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
