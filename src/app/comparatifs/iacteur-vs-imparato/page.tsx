// COMPARATIF IACTEUR / IMPARATO (16/11/2026, David) : pour le référencement et pour renseigner les futurs utilisateurs.
// Chaque chiffre a été vérifié le 16/11/2026 : IACTEUR dans le code de l'app (packs, FAQ), Imparato sur imparato.io.
// Voir COMPARATIF-IMPARATO.md (corrections faites au texte de départ). On dit ce qu'Imparato fait mieux, et on n'écrit
// jamais « non » à la place d'Imparato : « ne fait pas partie de l'offre annoncée ». À remettre à jour si les offres changent.
import type { Metadata } from "next";
import Link from "next/link";
import EncartVideoIacteur from "@/components/EncartVideoIacteur";
import { BoutonRouge } from "@/components/Scene";

const TITRE = "IACTEUR ou Imparato : quelle application choisir pour répéter ses textes ?";
const DESCRIPTION =
  "IACTEUR ou Imparato ? Répétition vocale, création de textes, coaching, tarifs : le comparatif pour choisir l'application adaptée à ton travail de comédien.";
const ADRESSE = "/comparatifs/iacteur-vs-imparato";

export const metadata: Metadata = {
  title: { absolute: TITRE },
  description: DESCRIPTION,
  alternates: { canonical: ADRESSE },
  openGraph: { type: "article", title: TITRE, description: DESCRIPTION, modifiedTime: "2026-11-16" },
};

const C = "m=blog&c=comparatif-imparato";
const lien = (page: string) => `https://iacteur.com/go/ecole${page ? `/${page}` : ""}?${C}`;
const article = (slug: string) => `/post/${encodeURIComponent(slug)}`;

// Un tableau qui défile sur le côté sur téléphone
function Tableau({ entetes, lignes }: { entetes: string[]; lignes: string[][] }) {
  return (
    <div>
      <table className="w-full table-fixed border-collapse text-left text-sm [overflow-wrap:anywhere] sm:text-base">
        <thead>
          <tr>
            {entetes.map((e, i) => (
              <th key={i} className="border-b-2 border-rouge px-2 py-2 font-mono text-[10px] font-black sm:px-3 sm:text-xs uppercase tracking-[0.15em]">
                {e}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lignes.map((l, i) => (
            <tr key={i} className="border-b border-secondaire/25 align-top">
              {l.map((c, j) => (
                <td key={j} className={`px-2 py-2.5 leading-snug sm:px-3 ${j === 0 ? "font-bold" : ""}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ComparatifImparato() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITRE,
    description: DESCRIPTION,
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    author: { "@type": "Organization", name: "IACTEUR", url: "https://iacteur.com" },
    publisher: { "@type": "Organization", name: "Le Jeu de l'Acteur", url: "https://www.lejeudelacteur.com" },
    mainEntityOfPage: `https://www.lejeudelacteur.com${ADRESSE}`,
  };
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className="flex flex-col gap-4">
        <nav className="font-mono text-[11px] font-black uppercase tracking-[0.15em] text-secondaire">
          <Link href="/news" className="underline">
            Le blog
          </Link>
          {" · "}
          <span className="text-rouge">Comparatif</span>
        </nav>
        <h1 className="font-affiche text-[2.6rem] uppercase leading-[0.98] sm:text-6xl">{TITRE}</h1>
        <p className="text-sm text-secondaire">Comparatif IACTEUR · informations vérifiées le 16 novembre 2026 · 5 min de lecture</p>
      </header>

      <div className="article-corps">
        <p>
          Apprendre son texte, c&apos;est la base. Mais un comédien ne fait pas que ça : il cherche une scène, explore un personnage,
          prépare un casting, suit sa carrière.
        </p>
        <p>
          Imparato et IACTEUR permettent tous les deux de <strong>répéter avec un partenaire vocal</strong>. Ils ne vont pas aussi loin
          du même côté. Voici de quoi choisir.
        </p>
      </div>

      <EncartVideoIacteur slug="comparatif-imparato" />

      <div className="article-corps">
        <h2>En bref</h2>
        <ul>
          <li>
            <strong>Imparato</strong> : le spécialiste du texte. Une bibliothèque de 458 classiques, le partage avec ses partenaires, des
            formules pour les troupes, des applications iOS et Android.
          </li>
          <li>
            <strong>IACTEUR</strong> : la répétition, plus la création de textes (monologues, scènes à deux), le coaching, le suivi de
            carrière et les castings. Un premier texte offert, puis moins d&apos;un euro par texte.
          </li>
        </ul>

        <h2>Imparato : tout autour du texte</h2>
        <p>
          Imparato aide à apprendre ses textes grâce à la répétition « à l&apos;italienne » : l&apos;application donne la réplique avec 8
          voix de synthèse, et on règle le niveau de difficulté.
        </p>
        <ul>
          <li>Importer, créer et adapter ses textes.</li>
          <li>Une bibliothèque de 458 textes du domaine public (Molière, Feydeau, Labiche…).</li>
          <li>Partager ses textes avec ses partenaires, qui les retrouvent synchronisés.</li>
          <li>Des applications iOS et Android, et une utilisation depuis le site.</li>
        </ul>
        <p>
          <a href="https://www.imparato.io/" target="_blank" rel="noopener nofollow">
            Voir le site d&apos;Imparato
          </a>
        </p>

        <h2>IACTEUR : répéter, créer, travailler, avancer</h2>
        <p>IACTEUR réunit dans la même application ce dont un acteur a besoin au fil de l&apos;année.</p>
        <ul>
          <li>
            <strong>
              <a href={lien("replique")} target="_blank" rel="noopener">
                RÉPLIQUE
              </a>
            </strong>{" "}
            : tu colles ton texte (ou tu joins un PDF ou un Word), IACTEUR donne les répliques des autres avec une voix naturelle et te
            souffle quand tu as un trou. Pour une scène, un monologue, ou <strong>tout ton rôle</strong> dans une pièce ou un scénario.
          </li>
          <li>
            <strong>
              <a href={lien("solo")} target="_blank" rel="noopener">
                SOLO
              </a>
            </strong>{" "}
            et{" "}
            <strong>
              <a href={lien("duo")} target="_blank" rel="noopener">
                DUO
              </a>
            </strong>{" "}
            : un monologue ou une scène à deux, écrits sur mesure pour toi.
          </li>
          <li>
            <strong>
              <a href={lien("coach")} target="_blank" rel="noopener">
                COACH
              </a>
            </strong>{" "}
            : tu colles n&apos;importe quel texte, IACTEUR ouvre des pistes de jeu pour ton rôle.
          </li>
          <li>
            <strong>
              <a href={lien("carriere")} target="_blank" rel="noopener">
                CARRIÈRE
              </a>
            </strong>{" "}
            : le journal de ta trajectoire (castings, rencontres, tournages).
          </li>
          <li>
            <strong>LOGE</strong> : tes textes, tes événements, tes contacts, ta fiche casting et ton CV Pro, au même endroit.
          </li>
        </ul>
        <p>
          <a href={lien("")} target="_blank" rel="noopener">
            Découvrir IACTEUR
          </a>
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="font-affiche text-3xl uppercase leading-none">Les différences, en un coup d&apos;œil</h2>
        <Tableau
          entetes={["", "IACTEUR", "Imparato"]}
          lignes={[
            ["Répétition avec partenaire vocal", "Oui (RÉPLIQUE)", "Oui (italienne, 8 voix)"],
            ["Souffleur quand on a un trou", "Oui", "Non annoncé sur le site"],
            ["Importer ses textes", "Oui (texte collé, PDF, Word)", "Oui"],
            ["Tout un rôle dans une pièce", "Oui (MON RÔLE EN ENTIER)", "Oui, en important la pièce"],
            ["Bibliothèque de textes classiques", "Non : tes textes à toi", "Oui, 458 textes"],
            ["Partager un texte avec ses partenaires", "Non annoncé", "Oui"],
            ["Monologues et scènes écrits pour toi", "Oui (SOLO, DUO)", "Ne fait pas partie de l'offre annoncée"],
            ["Coaching du rôle", "Oui (COACH)", "Ne fait pas partie de l'offre annoncée"],
            ["Suivi de carrière, CV, castings", "Oui (CARRIÈRE, CASTING)", "Ne fait pas partie de l'offre annoncée"],
            ["Formules pour troupes et enseignants", "Non", "Oui"],
            ["Applications", "Dans le navigateur, sur téléphone", "iOS, Android et web"],
          ]}
        />
      </section>

      <div className="article-corps">
        <h2>Combien ça coûte ?</h2>
        <h3>Imparato (tarifs publiés en septembre 2026)</h3>
        <ul>
          <li>
            <strong>Basique : gratuit</strong> (bibliothèque et lecture de ses textes).
          </li>
          <li>
            <strong>Solo : 7,99 €</strong>, paiement unique : répétitions illimitées sur <strong>un</strong> texte, sans limite de durée.
          </li>
          <li>
            <strong>Illimité : 19,99 € pour 3 mois, 26,99 € pour 6 mois, 39,99 € pour 12 mois</strong> : répétitions illimitées sur tous
            ses textes. Ce n&apos;est pas un abonnement obligatoire : on revient en Basique à la fin.
          </li>
          <li>
            <strong>Troupes</strong> : de 79 € (5 comédiens, 6 mois) à 799 € (200 comédiens, 12 mois).
          </li>
          <li>Essai gratuit de 8 jours sur Solo, Illimité et Troupe.</li>
        </ul>

        <h3>IACTEUR</h3>
        <p>
          IACTEUR fonctionne avec des <strong>Répèt</strong>, des crédits sans abonnement, qui ne périment jamais.
        </p>
      </div>
      <Tableau
        entetes={["Pack", "Prix", "Prix d'une Répèt"]}
        lignes={[
          ["5 Répèt", "3,90 €", "0,78 €"],
          ["15 Répèt", "9,90 €", "0,66 €"],
          ["30 Répèt", "17,90 €", "0,60 €"],
          ["60 Répèt", "32,90 €", "0,55 €"],
        ]}
      />
      <div className="article-corps">
        <p>
          À l&apos;inscription, <strong>5 Répèt sont offertes</strong>. Et tant que ton solde est à zéro, une Répèt gratuite t&apos;attend
          chaque semaine (elle ne vaut pas pour RÉPLIQUE).
        </p>
        <p>
          <strong>Pour RÉPLIQUE</strong> : ton premier texte est offert, ensuite 1 Répèt par texte, et tu répètes ce texte autant que tu
          veux.
        </p>

        <h3>Le calcul pour apprendre dix textes</h3>
      </div>
      <Tableau
        entetes={["", "Imparato", "IACTEUR"]}
        lignes={[
          ["10 textes, répétitions illimitées sur chacun", "10 × 7,99 € = 79,90 € en Solo (ou 39,99 € en Illimité sur 12 mois)", "9 Répèt (le premier texte est offert) : de 5 € à 7 € selon le pack"],
          ["Une pièce entière importée comme un seul texte", "7,99 €", "1 Répèt"],
        ]}
      />
      <div className="article-corps">
        <p>
          Le calcul reste honnête dans les deux sens : Imparato propose une formule illimitée sur un an, une bibliothèque, des troupes ;
          IACTEUR est moins cher <strong>pour répéter</strong>, et les Répèt servent aussi aux autres modules (SOLO, DUO, COACH).
        </p>

        <h2>Alors, lequel choisir ?</h2>
        <h3>Imparato si…</h3>
        <ul>
          <li>tu veux surtout apprendre des textes classiques de sa bibliothèque ;</li>
          <li>tu veux les partager avec ta troupe ;</li>
          <li>tu préfères une application iOS ou Android, ou un accès illimité à l&apos;année.</li>
        </ul>
        <h3>IACTEUR si…</h3>
        <ul>
          <li>tu apprends tes textes <strong>et</strong> tu veux en créer, les coacher et préparer tes rôles ;</li>
          <li>tu veux payer à l&apos;usage, sans abonnement ;</li>
          <li>tu veux suivre ta carrière, ton CV Pro et tes castings au même endroit.</li>
        </ul>
        <p>
          <strong>Les deux</strong> fonctionnent bien ensemble : l&apos;un pour les classiques et la troupe, l&apos;autre pour créer,
          coacher et avancer.
        </p>

        <h2>Pour aller plus loin</h2>
        <ul>
          <li>
            <Link href={article("apprendre-son-texte-seul-comment-repeter-sans-partenaire")}>Apprendre son texte seul : comment répéter sans partenaire</Link>
          </li>
          <li>
            <Link href={article("qu-est-ce-qu-une-italienne-et-une-allemande")}>Qu&apos;est-ce qu&apos;une italienne et une allemande ?</Link>
          </li>
          <li>
            <Link href={article("pourquoi-iacteur-et-pas-chatgpt-claude-ou-gemini")}>ChatGPT ou IACTEUR pour travailler son texte de théâtre ?</Link>
          </li>
          <li>
            <a href="https://iacteur.com/go/ecole/guide-texte?m=blog&c=comparatif-imparato" target="_blank" rel="noopener">
              Le guide d&apos;IACTEUR : apprendre son texte seul
            </a>
          </li>
        </ul>
      </div>

      <section className="flex flex-col gap-3 rounded-lg border-2 border-rouge p-6">
        <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">IACTEUR · l&apos;espace personnel de l&apos;acteur</p>
        <p className="font-affiche text-3xl uppercase leading-none">Travailler. Se préparer. Construire sa carrière.</p>
        <p className="font-accent text-lg italic">Conçu par des comédiens, pour des comédiens.</p>
        <div className="pt-1">
          <BoutonRouge href={lien("")}>Entrer dans IACTEUR</BoutonRouge>
        </div>
      </section>

      <p className="text-sm text-secondaire">
        Comparatif établi par l&apos;équipe IACTEUR à partir des informations publiques d&apos;Imparato (imparato.io), vérifiées le 16
        novembre 2026. Les offres et les tarifs évoluent : consulte les sites officiels. Une erreur ? Écris-nous via la page{" "}
        <Link href="/#contact" className="underline">
          Contact
        </Link>{" "}
        et nous corrigerons. Imparato est une marque de ses propriétaires, sans lien avec IACTEUR.
      </p>
    </main>
  );
}
