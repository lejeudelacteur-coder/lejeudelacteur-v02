"use client";

// Formulaire de contact court : prénom, nom, téléphone, e-mail, sujet,
// message. La provenance de la visite est jointe (pour les statistiques).
import { useActionState, useEffect, useState } from "react";
import { envoyerContact } from "@/app/contact/actions";
import { lireProvenance } from "@/lib/provenance";

const champ =
  "w-full rounded-md border border-secondaire/30 bg-black/40 px-4 py-3 text-base text-foreground placeholder:text-secondaire/60 focus:border-rouge focus:outline-none";

export default function FormulaireContact({ sujet = "autre" }: { sujet?: string }) {
  const [etat, action, enCours] = useActionState(envoyerContact, undefined);
  const [prov, setProv] = useState({ source: "", campagne: "" });
  useEffect(() => {
    void Promise.resolve().then(() => {
      const p = lireProvenance();
      setProv({ source: p.source, campagne: p.campagne });
    });
  }, []);

  if (etat?.ok) return <p className="rounded-lg border border-rouge p-6 text-center text-lg">{etat.message}</p>;

  return (
    <form action={action} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input name="prenom" required autoComplete="given-name" placeholder="Prénom *" className={champ} />
        <input name="nom" autoComplete="family-name" placeholder="Nom" className={champ} />
        <input name="telephone" type="tel" required autoComplete="tel" placeholder="Téléphone *" className={champ} />
        <input name="email" type="email" required autoComplete="email" placeholder="E-mail *" className={champ} />
      </div>
      <select name="sujet" defaultValue={sujet} className={champ}>
        <option value="loisirs">Un cours d&apos;essai Loisirs (gratuit)</option>
        <option value="pro">Le Pro du lundi</option>
        <option value="intensif">La formation intensive</option>
        <option value="stage">Un stage</option>
        <option value="autre">Une autre question</option>
      </select>
      <textarea name="message" rows={4} placeholder="Ton message (facultatif)" className={champ} />
      <input type="hidden" name="source" value={prov.source} />
      <input type="hidden" name="campagne" value={prov.campagne} />
      <input name="site" tabIndex={-1} aria-hidden="true" autoComplete="off" className="hidden" />
      <button
        disabled={enCours}
        className="rounded-md bg-rouge px-6 py-4 font-affiche text-2xl uppercase tracking-wide text-white disabled:opacity-60"
      >
        {enCours ? "Envoi…" : "Envoyer →"}
      </button>
      {etat && !etat.ok && <p className="text-center text-rouge">{etat.message}</p>}
      <p className="text-center text-sm text-secondaire">Réponse sous 24 h.</p>
    </form>
  );
}
