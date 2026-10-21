"use client";

// Une vidéo YouTube de l'article : on affiche d'abord l'image, la vidéo ne se
// charge qu'au toucher (page plus rapide, et rien n'est envoyé à YouTube
// avant que le visiteur le demande). « fin » (en secondes) : ne lire que le début (21/10, la
// projection de fin d'année : seulement la partie des cours Loisirs).
import { useState } from "react";

export default function VideoYoutube({ id, titre, fin }: { id: string; titre: string; fin?: number }) {
  const [lecture, setLecture] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
      {lecture ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0${fin ? `&end=${fin}` : ""}`}
          title={titre}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setLecture(true)} aria-label={`Lire la vidéo : ${titre}`} className="group absolute inset-0 h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 group-hover:opacity-100" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-rouge text-2xl text-white">
            ▶
          </span>
        </button>
      )}
    </div>
  );
}
