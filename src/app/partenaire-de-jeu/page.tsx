// PARTENAIRE DE JEU — même adresse que sur Wix. Formations pro seulement :
// Intensif = un mois offert chacun ; Pro du lundi = 10 % (voir CLAUDE.md).
import type { Metadata } from "next";
import FormulaireParrainage from "./FormulaireParrainage";
import { Scene, Titre } from "@/components/Scene";

export const metadata: Metadata = {
  title: "Partenaire de jeu : venez à deux, économisez tous les deux",
  description:
    "Recommandez la formation pro du Jeu de l'Acteur à un futur talent : vous profitez tous les deux d'une remise de 10 % (un mois offert sur le cursus intensif).",
  alternates: { canonical: "/partenaire-de-jeu" },
};

const ETAPES: [string, string][] = [
  ["Recommande", "Parle de la formation pro à un acteur qui partage ton exigence, mais ne connaît pas encore l'école."],
  ["Identifiez-vous", "Ton partenaire indique ton nom à son inscription, avec le formulaire ci-dessous ou par e-mail."],
  ["Profitez", "La remise s'applique sur vos prochaines mensualités, ou sur votre prochain achat de carte."],
];

export default function PartenaireDeJeu() {
  return (
    <main className="flex flex-col overflow-x-clip">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-20 px-5 py-16">
        <header className="flex flex-col gap-5">
          <Scene numero="00" nom="Partenaire de jeu" />
          <h1 className="font-affiche text-[3.6rem] uppercase leading-[0.9] sm:text-8xl">
            Viens <span className="text-rouge">à deux.</span>
          </h1>
          <p className="max-w-2xl text-lg text-secondaire">
            Tu recommandes la formation pro du Jeu de l&apos;Acteur à un futur talent de ton entourage ? On récompense
            ta confiance, et on facilite son arrivée : vous économisez tous les deux.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border-2 border-rouge p-6">
            <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">Cursus intensif</p>
            <p className="font-affiche text-4xl uppercase leading-none">Un mois offert chacun</p>
            <p>
              Ta mensualité passe de 365 € à <strong>328 €</strong>, soit 365 € d&apos;économie sur l&apos;année, pour
              toi comme pour ton partenaire.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-lg border border-secondaire/30 p-6">
            <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">Pro du lundi</p>
            <p className="font-affiche text-4xl uppercase leading-none">10 % chacun</p>
            <ul className="flex flex-col gap-1 text-secondaire">
              <li>À l&apos;année : 1 134 € au lieu de 1 260 € (frais d&apos;inscription inclus)</li>
              <li>Carte de 10 cours : 342 € au lieu de 380 €</li>
              <li>Carte de 5 cours : 180 € au lieu de 200 €</li>
            </ul>
          </div>
        </section>
        <p className="-mt-12 text-sm text-secondaire">Réservé aux formations pro : les cours loisirs n&apos;en bénéficient pas.</p>

        <section className="flex flex-col gap-6">
          <Scene numero="01" nom="Comment ça marche" />
          <Titre rouge="Trois gestes.">Simple.</Titre>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ETAPES.map(([t, d], i) => (
              <li key={t} className="flex flex-col gap-2 rounded-lg border border-secondaire/20 p-5">
                <span className="font-affiche text-5xl text-rouge">{i + 1}</span>
                <h3 className="font-affiche text-2xl uppercase">{t}</h3>
                <p className="text-secondaire">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-col gap-6">
          <Scene numero="02" nom="Parrainer un talent" />
          <Titre rouge="ton partenaire.">Présente-nous</Titre>
          <FormulaireParrainage />
        </section>
      </div>
    </main>
  );
}
