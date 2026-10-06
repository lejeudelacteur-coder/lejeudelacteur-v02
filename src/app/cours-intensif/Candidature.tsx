"use client";

// La candidature en 6 « prises » (5 questions à toucher, puis les
// coordonnées). Chaque prise atteinte est notée (anonymement) pour voir,
// dans l'onglet ÉCOLE, où les gens abandonnent.
import { useEffect, useRef, useState } from "react";
import { envoyerCandidature, type EtatCandidature } from "./actions";
import { QUESTIONS_INTENSIF } from "@/lib/candidature";
import { estPasCompte, lireProvenance, premiereFois } from "@/lib/provenance";
import { noterEtape } from "@/lib/suivi-actions";
import { evenementPixel } from "@/lib/pixel";

const TOTAL = QUESTIONS_INTENSIF.length + 1;
const champ =
  "w-full rounded-md border border-secondaire/30 bg-black/40 px-4 py-3 text-base text-foreground placeholder:text-secondaire/60 focus:border-rouge focus:outline-none";

export default function Candidature() {
  const [prise, setPrise] = useState(0); // 0 à 4 : questions ; 5 : coordonnées
  const [reponses, setReponses] = useState<Record<string, string>>({});
  const [contact, setContact] = useState<Record<string, string>>({});
  const [enCours, setEnCours] = useState(false);
  const [resultat, setResultat] = useState<EtatCandidature>(null);
  const notees = useRef(new Set<number>());

  // Chaque prise atteinte est notée une seule fois par visite
  useEffect(() => {
    const etape = prise + 1;
    if (notees.current.has(etape)) return;
    notees.current.add(etape);
    if (!estPasCompte() && premiereFois(`intensif-${etape}`)) void noterEtape("intensif", etape, lireProvenance().session);
  }, [prise]);

  const question = QUESTIONS_INTENSIF[prise];

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setEnCours(true);
    const r = await envoyerCandidature(reponses, contact, lireProvenance());
    setResultat(r);
    setEnCours(false);
    if (r?.ok) evenementPixel("Lead");
  }

  if (resultat?.ok) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-rouge p-8 text-center">
        <p className="font-affiche text-4xl uppercase text-rouge">C&apos;est dans la boîte.</p>
        <p className="text-lg">{resultat.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-secondaire/20 bg-surface p-5 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">
          Prise {prise + 1} / {TOTAL}
        </p>
        <div className="h-1 flex-1 overflow-hidden rounded bg-secondaire/20">
          <div className="h-full bg-rouge transition-all" style={{ width: `${((prise + 1) / TOTAL) * 100}%` }} />
        </div>
      </div>

      {question ? (
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-2 font-affiche text-3xl uppercase leading-tight">{question.titre}</legend>
          {question.aide && <p className="-mt-1 text-sm text-secondaire">{question.aide}</p>}
          {question.choix.map((c) => {
            const choisi = reponses[question.cle] === c.valeur;
            return (
              <button
                key={c.valeur}
                type="button"
                aria-pressed={choisi}
                onClick={() => {
                  setReponses((r) => ({ ...r, [question.cle]: c.valeur }));
                  // On passe tout seul à la prise suivante : un geste par question
                  setTimeout(() => setPrise((p) => p + 1), 180);
                }}
                className={`rounded-md border px-4 py-4 text-left text-lg transition ${
                  choisi ? "border-rouge bg-rouge/15 text-foreground" : "border-secondaire/30 hover:border-secondaire"
                }`}
              >
                {c.libelle}
              </button>
            );
          })}
        </fieldset>
      ) : (
        <form onSubmit={envoyer} className="flex flex-col gap-3">
          <p className="mb-2 font-affiche text-3xl uppercase leading-tight">Dernière prise. Où te joindre ?</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {(
              [
                ["prenom", "Prénom", "text", "given-name", true],
                ["nom", "Nom", "text", "family-name", true],
                ["telephone", "Téléphone", "tel", "tel", true],
                ["email", "E-mail", "email", "email", true],
              ] as const
            ).map(([cle, etiquette, type, auto, requis]) => (
              <input
                key={cle}
                type={type}
                autoComplete={auto}
                required={requis}
                placeholder={`${etiquette}${requis ? " *" : ""}`}
                value={contact[cle] ?? ""}
                onChange={(e) => setContact((c) => ({ ...c, [cle]: e.target.value }))}
                className={champ}
              />
            ))}
          </div>
          <input
            placeholder="Ville"
            autoComplete="address-level2"
            value={contact.ville ?? ""}
            onChange={(e) => setContact((c) => ({ ...c, ville: e.target.value }))}
            className={champ}
          />
          <textarea
            rows={3}
            placeholder="En une phrase : pourquoi tu veux jouer ? (facultatif)"
            value={contact.motivation ?? ""}
            onChange={(e) => setContact((c) => ({ ...c, motivation: e.target.value }))}
            className={champ}
          />
          {/* Piège à robots : invisible pour les humains */}
          <input
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
            className="hidden"
            value={contact.site ?? ""}
            onChange={(e) => setContact((c) => ({ ...c, site: e.target.value }))}
          />
          <label className="flex items-start gap-3 text-sm text-secondaire">
            <input
              type="checkbox"
              required
              checked={contact.consentement === "oui"}
              onChange={(e) => setContact((c) => ({ ...c, consentement: e.target.checked ? "oui" : "" }))}
              className="mt-1 h-5 w-5 shrink-0 accent-[#e3191d]"
            />
            J&apos;accepte que Le Jeu de l&apos;Acteur utilise ces informations pour me recontacter au sujet de la
            formation intensive.
          </label>
          <button
            disabled={enCours}
            className="mt-2 rounded-md bg-rouge px-6 py-4 font-affiche text-2xl uppercase tracking-wide text-white disabled:opacity-60"
          >
            {enCours ? "Envoi…" : "Envoyer ma candidature →"}
          </button>
          {resultat && !resultat.ok && <p className="text-center text-rouge">{resultat.message}</p>}
        </form>
      )}

      {prise > 0 && (
        <button type="button" onClick={() => setPrise((p) => p - 1)} className="self-start text-sm text-secondaire underline">
          ← Retour
        </button>
      )}
    </div>
  );
}
