// ÉQUIPE — même adresse que sur Wix (/équipe, voir next.config.ts). Biographies reprises de la page
// Wix (coquilles corrigées). Intervenants : Aureck (cascade), Isabelle
// Delaetre (techniques de respiration — jamais « sophrologie », voir CLAUDE.md).
import type { Metadata } from "next";
import Image from "next/image";
import { BoutonRouge, Scene, Titre } from "@/components/Scene";

export const metadata: Metadata = {
  title: "L'équipe : des coachs comédiens, metteurs en scène et directrice de casting",
  description:
    "L'équipe du Jeu de l'Acteur à Avignon : David Rousseau, comédien et réalisateur, Laetitia Gaune, directrice de casting, Myriam Waelkens et Nicolas Laurent, comédiens et metteurs en scène.",
  alternates: { canonical: "/%C3%A9quipe" },
};

const COACHS: { nom: string; role: string; image: string; lien?: [string, string]; bio: string[] }[] = [
  {
    nom: "David Rousseau",
    role: "Comédien & réalisateur · cofondateur",
    image: "david-rousseau",
    lien: ["Sa fiche d'artiste", "https://www.agencesartistiques.com/Fiche-Artiste/785755-david-rousseau.html"],
    bio: [
      "Après être passé par l'école du Studio de Jean-Louis Martin-Barbaz, David a suivi des stages avec Blanche Salant, Hélène Zidi et Fabrice Merlo. Au théâtre, il a interprété « Richard III » de Shakespeare et « Amphitryon » de Molière, et participé à des pièces classiques comme « Andromaque » de Racine, ou plus contemporaines comme « Visages » d'Hubert Colas. Il a travaillé, entre autres, sous la direction de Lester McNutt, Patrick Simon, Lucie Marchal et Josiane Balasko. Au cinéma, il a tourné dans « La belle histoire » de Philippe Dajoux, « Une affaire d'État » d'Éric Valette et « Cliente » de Josiane Balasko.",
      "À la télévision, il travaille avec Olivier Guignard, Chad Chenouga, Claudio Tonetti, et dans « Engrenages », saison 3. Il a écrit et réalisé plusieurs courts-métrages. Passionné de photographie et de vidéo, il réalise régulièrement des books photo et des bandes démo. Il produit et joue « Mise aux poings », sa deuxième pièce en tant qu'auteur, au festival d'Avignon en 2015. En 2017, Hélène Zidi, dont il avait suivi la formation et apprécié la méthode, lui propose de donner des cours au Laboratoire de l'Acteur à Paris.",
      "En 2018, il crée Carte d'Identité Artistique, le service dédié aux artistes qui regroupe les outils indispensables pour trouver du travail. En 2019, il fonde avec Laetitia Gaune le cours d'interprétation théâtre et cinéma Le Jeu de l'Acteur à Avignon, qui propose dès 2020 deux niveaux de cours, professionnels et amateurs.",
      "En 2023, il joue à Paris dans la comédie déjantée « Jeu, Sex et Match » de Sophie Deepoter et Sacha Judaszko. En juillet 2026, il tourne dans le long-métrage « Une heure et demie en été » de Marion Desseigne-Ravel. Et en 2026, poussé par sa double passion de la mise en scène et des nouvelles technologies, il conçoit IACTEUR, né de sa pratique pédagogique et de sa conviction que le travail de l'acteur commence bien avant le plateau.",
    ],
  },
  {
    nom: "Laetitia Gaune",
    role: "Directrice de casting · cofondatrice",
    image: "laetitia-gaune",
    bio: [
      "Après l'université de Montpellier en arts du spectacle, Laetitia intègre le Conservatoire libre du cinéma français, en section scripte. Lors d'un stage de production chez Ego Productions, elle découvre l'assistanat de casting et rencontre la directrice de casting Emmanuelle Bourcy, avec qui elle collabore sur « Au suivant » de Jeanne Biras, produit par Luc Besson.",
      "Elle devient assistante de casting, puis directrice de casting rôles et figuration pour la télévision (« Heidi » de Pierre-Antoine Hiroz, « Pas de secrets entre nous » de Jean-Marc Thérin, « Mes amis, mes amours, mes emmerdes » de Jérôme Navarro) et pour le cinéma (« Odette Toulemonde » d'Éric-Emmanuel Schmitt, « Chinese Zodiac » de Jackie Chan).",
      "Elle est aussi sollicitée pour du coaching d'acteurs, notamment lors de stages animés par Justine Heynemann, Élise McLeod et Sabine Crossen. En 2018, elle cofonde Carte d'Identité Artistique avec David Rousseau, puis en 2019 le Jeu de l'Acteur. En 2025, elle signe le casting du documentaire « Sacré Cœur », et elle débute en 2026 le casting d'un long-métrage produit par Peninsula Pictures.",
    ],
  },
  {
    nom: "Nicolas Laurent",
    role: "Comédien & metteur en scène",
    image: "nicolas-laurent",
    bio: [
      "Nicolas commence son apprentissage au conservatoire de théâtre du Grand Avignon, avant de poursuivre sa formation à Paris : au cours Galabru, coaché par Michel Galabru et son fils Jean, puis au Laboratoire de l'Acteur, avec Hélène Zidi et Célia Granier-Deferre, où il apprend la méthode de l'Actors Studio.",
      "Il débute auprès d'Anthony Joubert dans « Entre père et fils », puis enchaîne les rôles, du classique (« L'île des esclaves » de Marivaux) au vaudeville (« L'âge d'or » de Feydeau). Il co-met en scène le seul-en-scène « Cœur à cœur » de et avec William Rageau, et donne des cours d'acting à Paris à l'école Entrée des artistes, dirigée par Olivier Belmondo. Après cinq ans d'enseignement dans une école professionnelle parisienne, il rejoint l'équipe du Jeu de l'Acteur en 2025.",
    ],
  },
  {
    nom: "Myriam Waelkens",
    role: "Comédienne & metteuse en scène",
    image: "myriam-waelkens",
    lien: ["Son site", "https://www.myriamwaelkens.com/"],
    bio: [
      "Engagée depuis 2005 dans le théâtre et l'audiovisuel, Myriam est l'autrice et l'interprète du seule-en-scène « Femme amoureuse », produit au festival d'Avignon 2022 au théâtre Tremplin. Coautrice des spectacles « Ma voisine s'appelle Roberte » et « Roberte cherche désespérément M. Lulu », elle y explore le burlesque, tout en jouant aussi des registres plus classiques, notamment avec la troupe Artefactotum.",
      "Formée au jeu « Acteur cinéma » au théâtre des Remparts à Avignon, initiée à la méthode de l'Actors Studio par John Strasberg au théâtre de la Pépinière à Paris, elle est aussi une autodidacte du terrain, passionnée par la transmission. Avec Emergenscène, à Apt, elle encadre des comédiens, écrit des scénarios et fait du coaching artistique. Elle rejoint le Jeu de l'Acteur en 2025 pour les cours loisirs.",
    ],
  },
];

const INTERVENANTS: { nom: string; sujet: string; image: string; cadrage: string }[] = [
  { nom: "Aureck", sujet: "Initiation à la cascade", image: "aureck", cadrage: "object-[28%_center]" },
  { nom: "Isabelle Delaetre", sujet: "Voix, techniques de respiration, confiance", image: "isabelle-delaetre", cadrage: "object-[center_12%]" },
];

export default function Equipe() {
  return (
    <main className="flex flex-col overflow-x-clip">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-20 px-5 py-16">
        <header className="flex flex-col gap-5">
          <Scene numero="00" nom="Le générique" />
          <h1 className="font-affiche text-[3.6rem] uppercase leading-[0.9] sm:text-8xl">
            L&apos;<span className="text-rouge">équipe.</span>
          </h1>
          <p className="max-w-2xl text-lg text-secondaire">
            Quatre coachs professionnels, sur scène et devant la caméra : des comédiens, des metteurs en scène et une
            directrice de casting, qui transmettent ce qu&apos;ils pratiquent.
          </p>
        </header>

        {COACHS.map((c, i) => (
          <section key={c.nom} className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr] md:gap-10">
            <div className="relative aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-lg">
              <Image
                src={`/intensif/${c.image}.jpg`}
                alt={c.nom}
                fill
                sizes="(min-width: 768px) 280px, 100vw"
                className="object-cover object-top grayscale"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rouge">
                {String(i + 1).padStart(2, "0")} · {c.role}
              </p>
              <h2 className="font-affiche text-5xl uppercase leading-none">{c.nom}</h2>
              {c.bio.map((p) => (
                <p key={p.slice(0, 40)} className="text-secondaire">
                  {p}
                </p>
              ))}
              {c.lien && (
                <a href={c.lien[1]} target="_blank" rel="noreferrer" className="self-start text-rouge underline">
                  {c.lien[0]} →
                </a>
              )}
            </div>
          </section>
        ))}

        <section className="flex flex-col gap-6">
          <Scene numero="05" nom="Les intervenants" />
          <Titre rouge="et des masterclass.">Des intervenants,</Titre>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {INTERVENANTS.map((i) => (
              <li key={i.nom} className="overflow-hidden rounded-lg border border-secondaire/20">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={`/intensif/${i.image}.jpg`}
                    alt={i.nom}
                    fill
                    sizes="(min-width: 640px) 480px, 100vw"
                    className={`object-cover grayscale ${i.cadrage}`}
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-affiche text-3xl uppercase">{i.nom}</h3>
                  <p className="text-secondaire">{i.sujet}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="max-w-2xl text-lg">
            Et tout au long de l&apos;année, des professionnels du métier viennent partager leur expérience en
            masterclass.
          </p>
        </section>

        <section className="flex flex-col items-start gap-4">
          <Titre rouge="Viens jouer avec nous.">On t&apos;attend sur le plateau.</Titre>
          <BoutonRouge href="/#contact">Faire un cours d&apos;essai</BoutonRouge>
        </section>
      </div>
    </main>
  );
}
