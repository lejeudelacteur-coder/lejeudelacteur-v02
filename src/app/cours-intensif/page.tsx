// COURS INTENSIF — même adresse que sur Wix (/cours-intensif), pour garder
// le référencement. Style et déroulé de la page de référence (scènes
// numérotées), contenus complétés avec la page Wix actuelle.
// Présente la promo 2027-2028 (lundi à jeudi) : voir CLAUDE.md.
import type { Metadata } from "next";
import Image from "next/image";
import Candidature from "./Candidature";
import { Scene, Titre } from "@/components/Scene";

export const metadata: Metadata = {
  title: "10 mois pour devenir acteur, formation intensive à Avignon",
  description:
    "Formation d'acteur intensive à Avignon : 12 h de pratique par semaine, tournages réguliers, préparation aux castings avec une directrice de casting, bande démo et book photo inclus. 10 élèves maximum, sur entretien.",
  alternates: { canonical: "/cours-intensif" },
  openGraph: { images: ["/intensif/affiche.jpg"] },
};

const ATOUTS = [
  "Tournages réguliers",
  "Jeu face caméra",
  "Préparation aux castings",
  "Bande démo pro",
  "Book photo",
  "Cascade",
  "Masterclass",
  "IACTEUR offert",
];

const CHIFFRES: [string, string][] = [
  ["10", "mois pour devenir acteur"],
  ["12 h", "de pratique par semaine"],
  ["336 h", "de formation sur l'année"],
  ["4", "après-midis par semaine"],
  ["10", "élèves maximum"],
];

const KIT: [string, string][] = [
  ["Bande démo professionnelle", "La vidéo qui montre ton jeu aux castings et aux agents. Tournage et montage compris."],
  ["Book photos complet", "Les photos pro à joindre à chacune de tes candidatures."],
  ["336 heures de pratique", "Théorie, pratique et tournages réels, chaque semaine de l'année."],
  ["Tournages réguliers", "Face caméra, en conditions réelles. Puis projection et analyse de ton jeu."],
  ["Accompagnement individuel", "Un suivi personnalisé pour que tu progresses réellement, à ton rythme."],
  ["Masterclass", "Des professionnels du métier viennent partager leur expérience, en lien avec le travail de l'année."],
];

const PROGRAMME: { titre: string; texte: string; image: string }[] = [
  { titre: "Jeu face caméra", texte: "La technique de jeu propre au cinéma.", image: "face-camera" },
  { titre: "Tournages réguliers", texte: "Tu tournes, en conditions réelles.", image: "tournage" },
  { titre: "Interprétation & émotions", texte: "Le cœur du métier, travaillé chaque semaine.", image: "interpretation" },
  { titre: "Préparation aux castings", texte: "Avec Laetitia Gaune, directrice de casting.", image: "casting" },
  { titre: "Cascade", texte: "Initiation avec Aureck.", image: "cascade" },
  { titre: "Voix, respiration, confiance", texte: "Techniques de respiration avec Isabelle Delaetre.", image: "respiration" },
];

const EQUIPE: { nom: string; role: string; image: string }[] = [
  { nom: "David Rousseau", role: "Comédien & réalisateur · cofondateur", image: "david-rousseau" },
  { nom: "Nicolas Laurent", role: "Comédien · coach d'acting", image: "nicolas-laurent" },
  { nom: "Laetitia Gaune", role: "Directrice de casting · cofondatrice", image: "laetitia-gaune" },
];

const POUR_TOI = [
  "Tu es motivé·e et tu veux progresser vite",
  "Tu débutes, ou tu as déjà un peu joué",
  "Tu as 18 ans, ou tu les auras pendant l'année",
  "Tu peux te libérer du lundi au jeudi, de 14 h à 17 h",
  "Tu veux passer des castings et tourner",
];
const PAS_POUR_TOI = [
  "Tu n'es pas prêt·e à t'engager à 100 %",
  "Tu cherches un loisir pour décompresser. L'école a des cours loisirs pour ça.",
  "Tu comptes sur le CPF ou France Travail : la formation n'y est pas éligible",
];

const AVIS: [string, string][] = [
  ["J'ai eu le sentiment de beaucoup avancer dans mon jeu, de progresser, de gagner en confiance et d'ancrer mes connaissances.", "Cindy M."],
  ["Une super formation avec pratique et théorie sur plateau. Des premières expériences dès le 1er semestre avec un bon réseau.", "Anna C."],
  ["Superbe école et super professeur. Cela m'a beaucoup appris et j'ai beaucoup appris sur moi-même.", "Amaury B."],
];

const INCLUS = [
  "12 h de formation par semaine, 336 h sur l'année",
  "Tournages réguliers et montage",
  "Bande démo professionnelle",
  "Book photos complet",
  "Entraînement au casting, cascade, techniques de respiration",
  "Masterclass avec des professionnels",
  "Accompagnement individuel",
];

const AUDITION: [string, string][] = [
  ["Tu candidates", "Quelques questions pour vérifier que la formation te correspond. Deux minutes, en bas de cette page."],
  [
    "L'entretien gratuit",
    "Ton parcours et tes objectifs, la présentation du programme, toutes tes questions. Il permet d'évaluer ton parcours et ton désir de jeu. Sans engagement.",
  ],
  ["La réponse", "Tu sais si tu es pris·e quelques jours après l'entretien. 10 élèves maximum par promo, pas un de plus."],
];

const FAQ: [string, string][] = [
  ["Quel niveau faut-il ?", "Tous niveaux : tu peux partir de zéro, ou avoir déjà un peu joué. Ce qui compte, c'est l'envie et l'engagement."],
  ["L'entretien est obligatoire ?", "Oui. Il est gratuit et sans engagement : on parle de ton parcours et de tes objectifs, on te présente le programme, et tu poses toutes tes questions."],
  ["Quand est-ce que je saurai si je suis pris·e ?", "Quelques jours après l'entretien."],
  ["Quel est l'âge minimum ?", "18 ans, ou les avoir pendant l'année de formation."],
  ["Quels sont les horaires ?", "Du lundi au jeudi, de 14 h à 17 h, de fin septembre à début juin, hors vacances scolaires."],
  ["Combien d'élèves par promo ?", "De 6 à 10 maximum, pour un vrai suivi personnalisé."],
  ["Je peux payer en plusieurs fois ?", "Oui : 365 € par mois pendant 10 mois, soit 3 650 € au total. À deux, avec l'avantage Partenaire de jeu, c'est 328 € par mois chacun."],
  ["La formation est-elle finançable (CPF, France Travail) ?", "Non, elle n'est pas éligible à ces financements."],
  ["Et après les 10 mois ?", "Tu repars avec ton book et ta bande démo, prêt·e à candidater aux castings. Tu peux aussi poursuivre avec une deuxième année : c'est même conseillé."],
];

function BoutonCandidater({ children = "Demander mon entretien gratuit" }: { children?: React.ReactNode }) {
  return (
    <a
      href="#candidature"
      className="inline-block rounded-md bg-rouge px-6 py-4 text-center font-affiche text-xl uppercase tracking-wide text-white"
    >
      {children} →
    </a>
  );
}

export default function CoursIntensif() {
  return (
    <main className="flex flex-col overflow-x-clip">
      {/* ── Bandeau du haut ── */}
      <p className="bg-rouge px-4 py-2 text-center font-affiche text-sm uppercase tracking-[0.2em] text-white">
        Promo 2027-2028 · 10 places
      </p>

      {/* ── Affiche ── */}
      <header className="relative flex min-h-[78svh] flex-col justify-end overflow-hidden">
        <Image
          src="/intensif/affiche.jpg"
          alt="David Rousseau en séance de travail avec un élève"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-12">
          <p className="font-accent text-3xl italic sm:text-4xl">Arrête d&apos;en rêver.</p>
          <h1 className="mt-2 font-affiche text-[4.2rem] uppercase leading-[0.9] sm:text-8xl">
            10 mois pour devenir <span className="text-rouge">acteur.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-secondaire">
            Formation acteur théâtre &amp; cinéma à Avignon : 12 h de pratique par semaine, tournages réguliers, bande
            démo et book photo inclus.
          </p>
          <div className="mt-7">
            <BoutonCandidater />
          </div>
        </div>
      </header>

      {/* ── Bandeau qui défile ── */}
      <div className="-rotate-2 overflow-hidden bg-rouge py-3" aria-hidden="true">
        <div className="defilement flex w-max gap-8 whitespace-nowrap font-affiche text-xl uppercase tracking-wide text-white">
          {[...ATOUTS, ...ATOUTS].map((a, i) => (
            <span key={i} className="flex items-center gap-8">
              {a} <span>✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-5 py-20">
        {/* ── SC. 01 LE RÊVE ── */}
        <section className="flex flex-col gap-6">
          <Scene numero="01" nom="Le rêve" />
          <Titre rouge="On est en juin.">Avance de 10 mois.</Titre>
          <p className="max-w-2xl text-lg">
            Pendant 10 mois, tu as joué 12 heures par semaine. Tu as tourné. Tu t&apos;es entraîné·e au casting avec une
            directrice de casting. Et tu repars avec ce qu&apos;il faut pour candidater aux castings : ton book et ta bande
            démo.
          </p>
          <p className="font-affiche text-2xl uppercase leading-snug sm:text-3xl">
            Ton book est prêt. Ta bande démo est montée. Tu as tourné.{" "}
            <span className="text-rouge">Tu es acteur.</span>
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-secondaire/20 sm:grid-cols-5">
            {CHIFFRES.map(([n, t]) => (
              <div key={t} className="flex flex-col gap-1 bg-background p-4 last:col-span-2 sm:last:col-span-1">
                <dt className="font-affiche text-5xl text-rouge">{n}</dt>
                <dd className="text-sm uppercase tracking-wide text-secondaire">{t}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Citation de David (page Wix) ── */}
        <blockquote className="border-l-4 border-rouge pl-5 font-accent text-xl italic leading-relaxed sm:text-2xl">
          « Cette formation ne promet pas de te faire devenir comédien pro en un an. Elle te donne les bases pour
          débuter une carrière, passer tes premiers castings, préparer une grande école nationale et éventuellement
          poursuivre pour une deuxième année. »
          <footer className="mt-3 font-sans text-sm not-italic text-secondaire">David Rousseau</footer>
        </blockquote>

        {/* ── SC. 02 TON KIT D'ACTEUR ── */}
        <section className="flex flex-col gap-6">
          <Scene numero="02" nom="Ton kit d'acteur" />
          <Titre rouge="Tu repars avec les armes.">Tu arrives avec un rêve.</Titre>
          <p className="max-w-2xl text-lg">
            Des compétences concrètes et le matériel pro d&apos;un acteur, prêt à envoyer aux castings. En juin, tu ne dis
            plus que tu veux être acteur : tu le montres.
          </p>
          <div className="relative aspect-[16/8] overflow-hidden rounded-lg">
            <Image
              src="/accueil/eleve-en-jeu.jpg"
              alt="Une élève de la formation intensive, en plein jeu"
              fill
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="object-cover"
            />
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {KIT.map(([t, d]) => (
              <li key={t} className="flex flex-col gap-1 rounded-lg border border-secondaire/20 p-5">
                <h3 className="font-affiche text-2xl uppercase">{t}</h3>
                <p className="text-secondaire">{d}</p>
              </li>
            ))}
            {/* Le plus : IACTEUR est offert aux élèves (David, 07/10) */}
            <li className="flex flex-col gap-1 rounded-lg border-2 border-rouge p-5 sm:col-span-2">
              <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">En plus, offert</p>
              <h3 className="font-affiche text-2xl uppercase">IACTEUR</h3>
              <p className="text-secondaire">
                Ton espace d&apos;acteur en ligne : des textes à travailler, du coaching, le suivi de ta carrière, et les
                castings qui te correspondent. Gratuit pour tous les élèves de l&apos;école.
              </p>
            </li>
          </ul>
        </section>

        {/* ── SC. 03 FEUILLE DE SERVICE ── */}
        <section className="flex flex-col gap-6">
          <Scene numero="03" nom="Feuille de service" />
          <Titre rouge="14 h. Moteur.">Lundi. Mardi. Mercredi. Jeudi.</Titre>
          <p className="max-w-2xl text-lg">
            Chaque semaine combine théorie, pratique et tournages réels. L&apos;objectif : te préparer à tes premiers
            castings et te donner une vision concrète du métier.
          </p>
          <div className="rounded-lg bg-[#f3ede4] p-5 font-mono text-sm text-[#1a1414]">
            <p className="flex justify-between border-b border-black/20 pb-2 font-black uppercase tracking-[0.2em]">
              <span>Feuille de service</span>
              <span>Formation acteur</span>
            </p>
            {["Lundi", "Mardi", "Mercredi", "Jeudi"].map((j) => (
              <p key={j} className="flex justify-between border-b border-dashed border-black/15 py-2">
                <span className="font-black uppercase">{j}</span>
                <span>14h00 · 17h00</span>
                <span>Plateau</span>
              </p>
            ))}
            <p className="pt-3 text-xs uppercase tracking-wide">
              De fin septembre à début juin · hors vacances scolaires · Avignon
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMME.map((p, i) => (
              <li key={p.titre} className="overflow-hidden rounded-lg border border-secondaire/20">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={`/intensif/${p.image}.jpg`}
                    alt={p.titre}
                    fill
                    sizes="(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <p className="font-mono text-xs font-black text-rouge">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="font-affiche text-2xl uppercase">{p.titre}</h3>
                  <p className="text-secondaire">{p.texte}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── SC. 04 LE GÉNÉRIQUE ── */}
        <section className="flex flex-col gap-6">
          <Scene numero="04" nom="Le générique" />
          <Titre rouge="avec une directrice de casting.">Tu t&apos;entraînes au casting</Titre>
          <p className="max-w-2xl text-lg">
            Les cours sont menés essentiellement par David Rousseau et Nicolas Laurent. L&apos;entraînement au casting, par
            Laetitia Gaune. L&apos;initiation à la cascade par Aureck, et les techniques de respiration par Isabelle Delaetre.
          </p>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {EQUIPE.map((e) => (
              <li key={e.nom} className="flex flex-col gap-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg sm:aspect-[10/11]">
                  <Image
                    src={`/intensif/${e.image}.jpg`}
                    alt={e.nom}
                    fill
                    sizes="(min-width: 640px) 330px, 100vw"
                    className="object-cover object-top grayscale"
                  />
                </div>
                <div>
                  <h3 className="font-affiche text-2xl uppercase">{e.nom}</h3>
                  <p className="text-sm uppercase tracking-wide text-secondaire">{e.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── SC. 05 LA SÉLECTION ── */}
        <section className="flex flex-col gap-6">
          <Scene numero="05" nom="La sélection" />
          <Titre rouge="tout le monde.">On ne prend pas</Titre>
          <p className="max-w-2xl text-lg">
            10 élèves maximum, sur entretien. Une formation exigeante, conçue pour progresser vite et poser les bases
            d&apos;une carrière d&apos;acteur.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-secondaire/20 p-5">
              <p className="mb-3 font-affiche text-2xl uppercase">C&apos;est pour toi si</p>
              <ul className="flex flex-col gap-2">
                {POUR_TOI.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="text-rouge">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-secondaire/20 p-5">
              <p className="mb-3 font-affiche text-2xl uppercase">Passe ton chemin si</p>
              <ul className="flex flex-col gap-2 text-secondaire">
                {PAS_POUR_TOI.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span>✕</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── SC. 06 LES CRITIQUES ──
            Note Google affichée telle quelle (41 avis au 06/10/2026, tous à 5 étoiles
            sauf un). À mettre à jour de temps en temps. */}
        <section className="flex flex-col gap-6">
          <Scene numero="06" nom="Les critiques" />
          <Titre>Ce qu&apos;en disent les élèves.</Titre>
          <a
            href="https://www.google.com/maps/place/?q=place_id:ChIJH8xpoIjttRIRDqnqqdFrtP4"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 self-start"
          >
            <span className="font-affiche text-6xl text-rouge">4,9</span>
            <span className="flex flex-col">
              <span className="text-xl text-rouge">★★★★★</span>
              <span className="text-sm text-secondaire underline">Sur 41 avis Google · lire les avis</span>
            </span>
          </a>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {AVIS.map(([texte, nom]) => (
              <li key={nom} className="flex flex-col gap-3 rounded-lg border border-secondaire/20 p-5">
                <span className="text-rouge">★★★★★</span>
                <p className="font-accent text-lg italic">« {texte} »</p>
                <p className="mt-auto text-sm uppercase tracking-wide text-secondaire">{nom}</p>
              </li>
            ))}
          </ul>
          <div className="relative aspect-[16/7] overflow-hidden rounded-lg">
            <Image
              src="/intensif/salle.jpg"
              alt="La salle du théâtre de l'Oriflamme, à Avignon"
              fill
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* ── SC. 07 L'INVESTISSEMENT ── */}
        <section className="flex flex-col gap-6">
          <Scene numero="07" nom="L'investissement" />
          <Titre rouge="Tout compris.">365 € par mois.</Titre>
          <p className="max-w-2xl text-lg">
            Le prix reflète le volume et la qualité de la formation. Tout inclus : photos, tournages, montage et suivi.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-lg border-2 border-rouge p-6">
              <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">
                Formation intensive · 10 mois
              </p>
              <p>
                <span className="font-affiche text-7xl">365 €</span>{" "}
                <span className="text-secondaire">/ mois pendant 10 mois</span>
              </p>
              <p className="text-secondaire">Total 3 650 €, soit moins de 11 € l&apos;heure de formation</p>
              <ul className="flex flex-col gap-2">
                {INCLUS.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="text-rouge">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <BoutonCandidater />
            </div>
            <div className="flex flex-col gap-4 rounded-lg border border-secondaire/30 p-6">
              <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">Viens à deux</p>
              <p>
                <span className="font-affiche text-7xl">328 €</span>{" "}
                <span className="text-secondaire">/ mois chacun</span>
              </p>
              <p className="text-secondaire">365 € d&apos;économie chacun sur l&apos;année, soit moins de 10 € l&apos;heure</p>
              <p>
                Tu parraines un partenaire de jeu pour l&apos;année : vous avez tous les deux un mois de formation offert.
              </p>
              <p className="text-secondaire">
                Même formation, même contenu. Juste moins cher, et quelqu&apos;un pour te pousser les jours où c&apos;est
                dur.
              </p>
              <BoutonCandidater>Candidater à deux</BoutonCandidater>
            </div>
          </div>
          <p className="text-sm text-secondaire">
            Hors cursus, la bande démo est sur devis et le book photo à 300 €. Paiement mensuel. Formation non
            éligible au CPF ni à France Travail.
          </p>
        </section>

        {/* ── SC. 08 L'AUDITION ── */}
        <section className="flex flex-col gap-6">
          <Scene numero="08" nom="L'audition" />
          <Titre rouge="La première prend deux minutes.">Trois étapes.</Titre>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {AUDITION.map(([t, d], i) => (
              <li key={t} className="flex flex-col gap-2 rounded-lg border border-secondaire/20 p-5">
                <span className="font-affiche text-5xl text-rouge">{i + 1}</span>
                <h3 className="font-affiche text-2xl uppercase">{t}</h3>
                <p className="text-secondaire">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── SC. 09 À TOI DE JOUER ── */}
        <section id="candidature" className="flex scroll-mt-6 flex-col gap-6">
          <Scene numero="09" nom="À toi de jouer" />
          <Titre rouge="Deux minutes.">Ta candidature.</Titre>
          <p className="max-w-2xl text-lg">
            Quelques questions pour vérifier que la formation est faite pour toi. Ensuite, on te rappelle pour fixer ton
            entretien gratuit.
          </p>
          <p className="flex flex-wrap gap-x-6 gap-y-1 text-sm uppercase tracking-wide text-secondaire">
            <span>✓ Sans engagement</span>
            <span>✓ Réponse sous 24 h</span>
            <span>✓ 10 élèves maximum par promo</span>
          </p>
          <Candidature />
          <p className="text-secondaire">
            Tu préfères appeler ?{" "}
            <a href="tel:+33623181579" className="font-bold text-foreground underline">
              06 23 18 15 79
            </a>
          </p>
        </section>

        {/* ── SC. 10 QUESTIONS ── */}
        <section className="flex flex-col gap-6">
          <Scene numero="10" nom="Questions" />
          <Titre>Avant de te lancer.</Titre>
          <div className="flex flex-col divide-y divide-secondaire/20 border-y border-secondaire/20">
            {FAQ.map(([q, r]) => (
              <details key={q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
                  {q}
                  <span className="text-rouge transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-secondaire">{r}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

    </main>
  );
}
