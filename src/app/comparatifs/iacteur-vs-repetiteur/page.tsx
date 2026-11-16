// COMPARATIF IACTEUR / RÉPÉTITEUR DE THÉÂTRE (16/11/2026, David). Le Répétiteur est GRATUIT : l'angle n'est pas celui du
// comparatif Imparato (fonctionnalités puis prix) mais « que gagne-t-on à payer ? » — l'oreille (voix, souffleur), puis tout
// ce qui dépasse la répétition. Chiffres vérifiés le 16/11/2026 : IACTEUR dans le code et la FAQ de l'app, le Répétiteur sur
// repetiteur-theatre.fr (accueil, comparatif, CGU, mentions). Règles : dire ce que le Répétiteur fait mieux ; jamais « non » à
// sa place (« ne fait pas partie de l'offre annoncée ») ; ne pas se vanter d'un avantage qu'on n'a pas (leur reconnaissance
// vocale tourne sur l'appareil, la nôtre passe par un service de transcription). À remettre à jour si les offres changent.
import type { Metadata } from "next";
import Link from "next/link";
import EncartVideoIacteur from "@/components/EncartVideoIacteur";
import { BoutonRouge } from "@/components/Scene";
import Tableau from "@/components/TableauComparatif";

const TITRE = "IACTEUR ou Répétiteur de théâtre : quelle appli choisir pour répéter ?";
const DESCRIPTION =
  "Répétiteur de théâtre est gratuit, IACTEUR fonctionne avec des Répèt : voix, souffleur, bibliothèque, tarifs. Le comparatif pour savoir ce que tu gagnes à payer, ou pas.";
const ADRESSE = "/comparatifs/iacteur-vs-repetiteur";

export const metadata: Metadata = {
  title: { absolute: TITRE },
  description: DESCRIPTION,
  alternates: { canonical: ADRESSE },
  openGraph: { type: "article", title: TITRE, description: DESCRIPTION, modifiedTime: "2026-11-16" },
};

const C = "m=blog&c=comparatif-repetiteur";
const lien = (page: string) => `https://iacteur.com/go/ecole${page ? `/${page}` : ""}?${C}`;
const article = (slug: string) => `/post/${encodeURIComponent(slug)}`;

// Les questions que les gens tapent dans Google, avec leur réponse : affichées, et décrites à Google (FAQPage)
const QUESTIONS: [string, string][] = [
  [
    "Le Répétiteur de théâtre est-il vraiment gratuit ?",
    "Oui. D'après son site, il est gratuit, sans publicité et sans essai limité, espaces de troupe compris. Son site n'annonce aucune offre payante.",
  ],
  [
    "IACTEUR est-il payant ?",
    "L'inscription est gratuite et 5 Répèt sont offertes. Pour RÉPLIQUE, ton premier texte est offert ; ensuite, 1 Répèt par texte, soit entre 0,55 € et 0,78 € selon le pack. Tu répètes ensuite ce texte autant que tu veux, sans rien payer de plus.",
  ],
  [
    "Peut-on utiliser les deux ?",
    "Oui, et c'est souvent le plus simple : le Répétiteur pour les pièces classiques de sa bibliothèque ou pour répéter en troupe, IACTEUR pour les voix françaises naturelles, le souffleur, la création de textes, le coaching et le suivi de carrière.",
  ],
  [
    "Faut-il installer une application ?",
    "Non, ni l'un ni l'autre : les deux s'ouvrent dans le navigateur d'un téléphone, d'une tablette ou d'un ordinateur.",
  ],
];

export default function ComparatifRepetiteur() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: TITRE,
      description: DESCRIPTION,
      datePublished: "2026-11-16",
      dateModified: "2026-11-16",
      author: { "@type": "Organization", name: "IACTEUR", url: "https://iacteur.com" },
      publisher: { "@type": "Organization", name: "Le Jeu de l'Acteur", url: "https://www.lejeudelacteur.com" },
      mainEntityOfPage: `https://www.lejeudelacteur.com${ADRESSE}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: QUESTIONS.map(([q, r]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: r } })),
    },
  ];
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
          Un outil gratuit d&apos;un côté, une application à Répèt de l&apos;autre : la première question tombe tout de suite. <strong>Pourquoi
          payer, si l&apos;un répète déjà gratuitement avec toi ?</strong>
        </p>
        <p>
          Les deux lisent les répliques des autres personnages et s&apos;arrêtent quand vient ton tour. Ce qui change, c&apos;est ce que tu
          entends, ce qui se passe quand tu bloques, et tout ce qui existe autour de la répétition. Voici une réponse honnête, y compris sur ce
          que le Répétiteur fait mieux.
        </p>
      </div>

      <EncartVideoIacteur slug="comparatif-repetiteur" />

      <div className="article-corps">
        <h2>Le gratuit, d&apos;abord : ce que fait très bien le Répétiteur</h2>
        <p>
          Le{" "}
          <a href="https://repetiteur-theatre.fr/" target="_blank" rel="noopener nofollow">
            Répétiteur de théâtre
          </a>{" "}
          est édité par POLUX, une petite société d&apos;Alès qui édite aussi DreamShow, un logiciel de régie. D&apos;après son site, il est
          gratuit, sans publicité, et se concentre sur une seule chose : apprendre son texte.
        </p>
        <ul>
          <li>
            <strong>Une bibliothèque de 687 pièces classiques</strong> (transcriptions de Wikisource, domaine public), à ouvrir en un geste.
          </li>
          <li>
            <strong>Les mots oubliés ou changés sont soulignés pendant la séance</strong>, avec le pourcentage du texte dit. L&apos;écoute se
            fait sur l&apos;appareil, en français.
          </li>
          <li>
            <strong>Une vitesse réglable</strong> de 0,6× pour poser le texte à 3×.
          </li>
          <li>
            <strong>Des espaces de troupe gratuits</strong> : le responsable dépose la pièce une fois, invite sa troupe par un lien.
          </li>
          <li>Import de Word, LibreOffice, PDF ou texte collé ; les personnages sont reconnus tout seuls.</li>
        </ul>
        <p>
          Si tu veux apprendre des classiques seul(e) ou en troupe sans dépenser un centime, <strong>il fait le travail</strong>. Aucun
          comparatif honnête ne peut dire autre chose.
        </p>

        <h2>Ce qu&apos;on gagne à payer : l&apos;oreille</h2>
        <p>
          La répétition, c&apos;est de l&apos;écoute. Pendant des dizaines de passages, tu entends les mêmes voix. Leur qualité, et ce qui
          arrive quand tu perds le fil, font la différence entre une répétition qu&apos;on supporte et une qu&apos;on a envie de refaire.
        </p>
      </div>

      <Tableau
        entetes={["Pendant la répétition", "IACTEUR (RÉPLIQUE)", "Répétiteur de théâtre"]}
        lignes={[
          ["Les voix", "Voix françaises neuronales de Microsoft Azure, choisies pour leur naturel", "Voix de l'appareil, une par personnage. Le site distingue des voix « naturelles » et des voix « locales »"],
          ["Quand tu bloques", "Le souffleur te chuchote le début de ta réplique, ou te la montre (après 2, 3 ou 5 s, à toi de choisir)", "Tu révèles ta réplique d'un geste, ou tu la fais lire"],
          ["Écoute du micro", "Mains libres : IACTEUR enchaîne quand tu as fini, le souffleur vient sur un blanc", "Écoute activée dans les réglages : il enchaîne seul à la fin de ta réplique"],
          ["Ta voix", "Transcrite pour le compte rendu, puis rien n'est gardé", "Reconnue sur l'appareil, sans enregistrement ni envoi, d'après le site"],
          ["En fin de séance", "Un compte rendu : répliques où le souffleur est venu, passages sautés, mots entendus autrement", "Un pourcentage du texte dit et les mots oubliés, soulignés pendant la séance"],
        ]}
      />

      <div className="article-corps">
        <p>
          Sur les voix, le site du Répétiteur est lui-même franc : sa FAQ reconnaît que certaines sont « un peu robotiques ». Elles
          dépendent de ton téléphone ou de ton ordinateur. C&apos;est le prix de la gratuité, et un choix assumé. IACTEUR a fait le choix
          inverse : des voix françaises naturelles, au même rendu partout, et un souffleur préparé à l&apos;avance.
        </p>
        <p>
          À l&apos;inverse, ne cherche pas chez IACTEUR de bibliothèque de classiques : tu y travailles les textes que tu apportes, que tu
          colles, importes en PDF ou en Word, ou que tu crées toi-même.
        </p>

        <h2>Ce qui existe au-delà de la répétition</h2>
        <p>
          Voilà où l&apos;écart est le plus grand. Le Répétiteur ne fait pas ça (cela ne fait pas partie de son offre annoncée), et ce n&apos;est
          pas son but.
        </p>
        <ul>
          <li>
            <strong>Pas de texte sous la main ?</strong>{" "}
            <a href={lien("solo")} target="_blank" rel="noopener">
              SOLO
            </a>{" "}
            écrit un monologue sur mesure,{" "}
            <a href={lien("duo")} target="_blank" rel="noopener">
              DUO
            </a>{" "}
            une scène à deux. Tu choisis l&apos;âge, le style, l&apos;obstacle : tu reçois de la matière à jouer, et tu peux ensuite la répéter
            avec RÉPLIQUE.
          </li>
          <li>
            <strong>Une séquence reçue pour un casting ?</strong> Tu la colles (ou tu joins le PDF) dans{" "}
            <a href={lien("coach")} target="_blank" rel="noopener">
              COACH
            </a>
            , qui ouvre des pistes de jeu pour ton rôle.
          </li>
          <li>
            <strong>Toute une pièce, un scénario ?</strong> MON RÔLE EN ENTIER découpe le texte et repère tes scènes, gratuitement et sans compte. Tu apprends ensuite chaque scène avec RÉPLIQUE.
          </li>
          <li>
            <strong>Et après le travail du texte :</strong>{" "}
            <a href={lien("carriere")} target="_blank" rel="noopener">
              CARRIÈRE
            </a>{" "}
            garde le journal de tes castings et de tes rencontres, et ta LOGE réunit tes textes, tes contacts, ta fiche casting et ton CV Pro.
          </li>
        </ul>

        <h2>Alors, combien ça coûte vraiment ?</h2>
        <p>
          <strong>Le Répétiteur : 0 €.</strong> IACTEUR fonctionne avec des Répèt, des crédits sans abonnement, qui ne périment jamais.
        </p>
      </div>

      <Tableau
        entetes={["Pack IACTEUR", "Prix", "Prix d'une Répèt"]}
        lignes={[
          ["5 Répèt", "3,90 €", "0,78 €"],
          ["15 Répèt", "9,90 €", "0,66 €"],
          ["30 Répèt", "17,90 €", "0,60 €"],
          ["60 Répèt", "32,90 €", "0,55 €"],
        ]}
      />

      <div className="article-corps">
        <p>
          À l&apos;inscription, <strong>5 Répèt sont offertes</strong>. Pour RÉPLIQUE, <strong>ton premier texte est offert</strong> ; ensuite
          1 Répèt par texte, et tu répètes ce texte autant que tu veux. Le coût d&apos;un texte appris : de 0,55 € à 0,78 €.
        </p>
        <p>
          Pour les autres outils (SOLO, DUO, COACH), tant que ton solde est à zéro, <strong>une Répèt gratuite t&apos;attend chaque
          semaine</strong>. Et les Répèt ne périment jamais.
        </p>
        <p>
          Pourquoi des crédits plutôt qu&apos;un abonnement ? Parce qu&apos;un parcours d&apos;acteur alterne des périodes très actives
          (castings, répétitions, tournages, ateliers, stages) et des creux. Les Répèt suivent ce rythme : tu en prends quand tu
          travailles, elles t&apos;attendent quand tu fais une pause, et rien ne se paie dans le vide.
        </p>
        <p>
          Les Répèt servent aussi à SOLO, DUO, COACH et CARRIÈRE : ce sont ces outils-là, plus que la répétition seule, qui justifient le
          paiement. Si tu n&apos;as besoin que de répéter, tu peux t&apos;en passer.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="font-affiche text-3xl uppercase leading-none">Qui choisit quoi ?</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-lg border border-secondaire/30 p-5">
            <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">Le Répétiteur</p>
            <p className="font-affiche text-2xl uppercase leading-none">Pour répéter gratuitement</p>
            <ul className="flex list-disc flex-col gap-1 pl-5 text-secondaire">
              <li>Tu apprends des classiques de sa bibliothèque.</li>
              <li>Tu répètes en troupe, ou tu animes un cours.</li>
              <li>Tu veux tout gratuit, sans compter.</li>
              <li>Tu aimes voir les mots oubliés soulignés pendant la séance.</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border-2 border-rouge p-5">
            <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">IACTEUR</p>
            <p className="font-affiche text-2xl uppercase leading-none">Pour répéter, créer, avancer</p>
            <ul className="flex list-disc flex-col gap-1 pl-5">
              <li>Tu veux des voix françaises naturelles et un souffleur.</li>
              <li>Tu veux créer des monologues et des scènes à deux.</li>
              <li>Tu prépares un casting ou un rôle (COACH).</li>
              <li>Tu veux suivre ta carrière au même endroit.</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="article-corps">
        <h2>Les questions qu&apos;on nous pose</h2>
        {QUESTIONS.map(([q, r]) => (
          <div key={q}>
            <h3>{q}</h3>
            <p>{r}</p>
          </div>
        ))}

        <h2>Pour aller plus loin</h2>
        <ul>
          <li>
            <Link href="/comparatifs/iacteur-vs-imparato">IACTEUR ou Imparato : le comparatif avec l&apos;application payante</Link>
          </li>
          <li>
            <Link href={article("apprendre-son-texte-seul-comment-repeter-sans-partenaire")}>Apprendre son texte seul : comment répéter sans partenaire</Link>
          </li>
          <li>
            <Link href={article("qu-est-ce-qu-une-italienne-et-une-allemande")}>Qu&apos;est-ce qu&apos;une italienne et une allemande ?</Link>
          </li>
          <li>
            <a href={`https://iacteur.com/go/ecole/guide-texte?${C}`} target="_blank" rel="noopener">
              Le guide d&apos;IACTEUR : apprendre son texte seul
            </a>
          </li>
        </ul>
      </div>

      <section className="flex flex-col gap-3 rounded-lg border-2 border-rouge p-6">
        <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">IACTEUR · l&apos;espace personnel de l&apos;acteur</p>
        <p className="font-affiche text-3xl uppercase leading-none">Ton premier texte est offert.</p>
        <p className="text-lg">Essaie la voix et le souffleur sur ta prochaine scène, et juge par toi-même.</p>
        <p className="font-accent text-lg italic">Conçu par des comédiens, pour des comédiens.</p>
        <div className="pt-1">
          <BoutonRouge href={lien("replique")}>Apprendre mon texte</BoutonRouge>
        </div>
      </section>

      <p className="text-sm text-secondaire">
        Comparatif établi par l&apos;équipe IACTEUR à partir des informations publiques du Répétiteur de théâtre (repetiteur-theatre.fr),
        vérifiées le 16 novembre 2026. Les offres évoluent : consulte les sites officiels. Une erreur ? Écris-nous via la page{" "}
        <Link href="/#contact" className="underline">
          Contact
        </Link>{" "}
        et nous corrigerons. Le Répétiteur de théâtre est une marque de ses propriétaires, sans lien avec IACTEUR.
      </p>
    </main>
  );
}
