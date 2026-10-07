"use client";

// Le nombre de vues d'un article, visible seulement sur les appareils de David
// (ceux réglés sur « ne plus me compter »). Les autres visiteurs ne voient rien.
import { useEffect, useState } from "react";
import { estPasCompte } from "@/lib/provenance";

let reponse: Promise<Record<string, number>> | null = null;

export default function VuesDavid({ slug, className = "" }: { slug: string; className?: string }) {
  const [vues, setVues] = useState<number | null>(null);

  useEffect(() => {
    if (!estPasCompte()) return;
    reponse ??= fetch("/api/vues").then((r) => r.json());
    void reponse.then((m) => setVues(m[slug] ?? 0)).catch(() => {});
  }, [slug]);

  if (vues === null) return null;
  return (
    <span className={className} title="Visible seulement pour toi">
      👁 {vues} vue{vues > 1 ? "s" : ""}
    </span>
  );
}
