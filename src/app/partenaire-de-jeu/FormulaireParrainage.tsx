"use client";

import { useActionState, useEffect, useState } from "react";
import { envoyerParrainage } from "./actions";
import { lireProvenance } from "@/lib/provenance";

const champ =
  "w-full rounded-md border border-secondaire/30 bg-black/40 px-4 py-3 text-base text-foreground placeholder:text-secondaire/60 focus:border-rouge focus:outline-none";

export default function FormulaireParrainage() {
  const [etat, action, enCours] = useActionState(envoyerParrainage, undefined);
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
      <input name="parrain" required placeholder="Ton nom (le parrain ou la marraine) *" className={champ} />
      <input name="filleul" required placeholder="Le nom du nouveau ou de la nouvelle *" className={champ} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input name="email" type="email" required autoComplete="email" placeholder="E-mail *" className={champ} />
        <input name="telephone" type="tel" autoComplete="tel" placeholder="Téléphone" className={champ} />
      </div>
      <select name="cours" required defaultValue="" className={champ}>
        <option value="" disabled>
          Quel cours ? *
        </option>
        <option value="intensif">Cursus intensif</option>
        <option value="pro">Pro du lundi</option>
      </select>
      <input type="hidden" name="source" value={prov.source} />
      <input type="hidden" name="campagne" value={prov.campagne} />
      <input name="site" tabIndex={-1} aria-hidden="true" autoComplete="off" className="hidden" />
      <button
        disabled={enCours}
        className="rounded-md bg-rouge px-6 py-4 font-affiche text-2xl uppercase tracking-wide text-white disabled:opacity-60"
      >
        {enCours ? "Envoi…" : "Envoyer ma demande →"}
      </button>
      {etat && !etat.ok && <p className="text-center text-rouge">{etat.message}</p>}
    </form>
  );
}
