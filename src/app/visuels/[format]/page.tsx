// VISUELS À EXPORTER (07/10/2026) : le bandeau IACTEUR en images (post
// Instagram, carré, Facebook, bandeau large). Pages de travail, non
// référencées : on les ouvre dans un navigateur pour en tirer des PNG.
// RÉPLIQUE (12/10/2026) : les mêmes formats pour RÉPLIQUE (« replique-… »), à partager
// sur Facebook, Instagram et LinkedIn (1200 × 630 vaut pour les deux).
// MINI-COACH (17/10/2026) : « minicoach-… » : la photo de David (sa caméra) fondue dans le noir, et
// l'exemple de résultat (Alceste) dans un cadre semi-transparent, comme le bandeau du site.
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import BandeauIacteur from "@/components/BandeauIacteur";

export const metadata: Metadata = { title: "Visuels IACTEUR", robots: { index: false, follow: false } };
export function generateStaticParams() {
  return ["bandeau", "instagram", "carre", "facebook", "couverture-7-exercices", "cv-bandeau", "cv-instagram", "cv-carre", "cv-facebook", "replique-bandeau", "replique-instagram", "replique-carre", "replique-facebook", "minicoach-instagram", "minicoach-story", "minicoach-carre", "minicoach-facebook", "couverture-carriere", "carriere-instagram", "carriere-carre", "carriere-facebook", "carriere-tiktok-1", "carriere-tiktok-2", "carriere-tiktok-3", "pub2-a-instagram", "pub2-b-instagram", "pub2-a-carre", "pub2-b-carre", "prolonger-a", "prolonger-b"].map((format) => ({ format }));
}

const MASQUER = `
  body > header, body > footer, [role="dialog"], nextjs-portal { display: none !important; }
  body { background: #0b0909; }
`;

const Telephone = ({ largeur, haut }: { largeur: number; haut: number }) => (
  <div style={{ position: "relative", width: largeur, height: haut, overflow: "hidden" }}>
    <Image src="/iacteur/telephone-fiche.png" alt="" fill sizes={`${largeur}px`} className="object-cover object-top" priority />
  </div>
);

const Logo = ({ largeur }: { largeur: number }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/iacteur/logo-iacteur.png" alt="IACTEUR" width={largeur} style={{ width: largeur, height: "auto" }} />
);

// RÉPLIQUE : la photo de David derrière son texte (paysage), fondue dans le noir du côté du texte
const PhotoReplique = ({ largeur, haut, fondu }: { largeur: number; haut: number; fondu: "haut" | "gauche" }) => (
  <div style={{ position: "relative", width: largeur, height: haut, overflow: "hidden" }}>
    <Image src="/iacteur/replique.jpg" alt="" fill sizes={`${largeur}px`} className="object-cover" style={{ objectPosition: "72% 35%" }} priority />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: fondu === "haut" ? "linear-gradient(to bottom, #0b0909 0%, transparent 35%)" : "linear-gradient(to right, #0b0909 0%, transparent 40%)",
      }}
    />
  </div>
);

// CV PRO : les trois modèles en éventail (portraits de David, © Olivier ALLARD, crédité en petit)
const EventailCv = ({ largeur }: { largeur: number }) => {
  const l = Math.round(largeur * 0.52);
  const h = Math.round(l * 1.414);
  const carte = (id: string, extra: React.CSSProperties) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/iacteur/cv-${id}.jpg`} alt="" width={l} height={h} style={{ position: "absolute", top: 0, width: l, height: h, boxShadow: "0 12px 40px rgba(0,0,0,.6)", ...extra }} />
  );
  return (
    <div style={{ position: "relative", width: largeur, height: h + 20 }}>
      {carte("theatre", { left: 0, transform: "rotate(-9deg)", transformOrigin: "bottom center" })}
      {carte("vip", { right: 0, transform: "rotate(9deg)", transformOrigin: "bottom center" })}
      {carte("cine", { left: (largeur - l) / 2, zIndex: 2 })}
    </div>
  );
};
const CreditPhotos = ({ taille }: { taille: number }) => (
  <p style={{ position: "absolute", right: 24, bottom: 8, margin: 0, zIndex: 5, fontSize: taille, color: "rgba(255,255,255,.85)" }}>Photos © Olivier ALLARD</p>
);
const TITRE_CV = (
  <>
    Ton CV d&apos;acteur Pro, <span style={{ color: "#e3191d", display: "block" }}>en 3 modèles.</span>
  </>
);
const TEXTE_CV = "Gratuit, en un clic, à partir de ta fiche casting : CINÉ, THÉÂTRE ou VIP.";

const TITRE_REPLIQUE = (
  <>
    Personne pour te donner la réplique ? <span style={{ color: "#e3191d", display: "block" }}>Plus maintenant.</span>
  </>
);
const TEXTE_REPLIQUE = "IACTEUR te donne la réplique avec une voix française naturelle, et te souffle quand tu as un trou. À la fin, tes répliques à retravailler.";

// MINI-COACH : la photo (portrait de David, sa caméra) fondue dans le noir, et l'exemple par-dessus
const PhotoCoach = ({ largeur, haut, position = "62% 15%", fondu }: { largeur: number; haut: number; position?: string; fondu: "haut" | "gauche" }) => (
  <div style={{ position: "relative", width: largeur, height: haut, overflow: "hidden" }}>
    <Image src="/iacteur/coach.jpg" alt="" fill sizes={`${largeur}px`} className="object-cover" style={{ objectPosition: position }} priority />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          fondu === "haut"
            ? "linear-gradient(to bottom, #0b0909 0%, transparent 30%, transparent 70%, #0b0909 100%)"
            : "linear-gradient(to right, #0b0909 0%, transparent 40%)",
      }}
    />
  </div>
);
const EXEMPLE_MC: [string, string][] = [
  ["Ce que veut ton personnage", "Convaincre Philinte qu'on doit dire aux gens ce qu'on pense d'eux."],
  ["Ce qui l'en empêche", "Philinte défend les politesses du monde, avec calme et ironie."],
  ["Ce qui se joue", "Alceste reproche à Philinte ses grandes démonstrations d'amitié envers un homme qu'il connaît à peine. Philinte refuse de s'emporter."],
];
const ExempleMiniCoach = ({ echelle }: { echelle: number }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 14 * echelle,
      padding: 26 * echelle,
      borderRadius: 14 * echelle,
      border: "1px solid rgba(243,237,228,.28)",
      background: "rgba(11,9,9,.55)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
    }}
  >
    <p className="font-mono" style={{ margin: 0, fontSize: 15 * echelle, letterSpacing: "0.2em", color: "rgba(243,237,228,.6)" }}>
      EXEMPLE · ALCESTE, LE MISANTHROPE
    </p>
    {EXEMPLE_MC.map(([titre, phrase]) => (
      <div key={titre}>
        <p className="font-mono" style={{ margin: 0, fontSize: 15 * echelle, fontWeight: 900, letterSpacing: "0.15em", color: "#e3191d" }}>
          {titre.toUpperCase()}
        </p>
        <p style={{ margin: `${4 * echelle}px 0 0`, fontSize: 24 * echelle, lineHeight: 1.3 }}>{phrase}</p>
      </div>
    ))}
  </div>
);
const TITRE_MC = (
  <>
    Ton casting approche ? <span style={{ color: "#e3191d", display: "block" }}>Colle ton texte.</span>
  </>
);
const TEXTE_MC = "En quelques secondes : l'objectif de ton personnage, son obstacle, et ce qui se joue dans la scène.";
// Post et story (texte centré) : « dans la scène » sur sa propre ligne (David, 17/10)
const TEXTE_MC_CENTRE = (
  <>
    En quelques secondes : l&apos;objectif de ton personnage, son obstacle, et ce qui se joue
    <br />
    dans la scène.
  </>
);

// CARRIÈRE (18/10/2026) : la « récompense » en exemple (noms inventés) : la question reçue après un
// événement, ou la lecture du parcours (le Fil Conducteur, sans ce mot)
const ExempleCarriere = ({ echelle, mode }: { echelle: number; mode: "question" | "fil" }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 12 * echelle,
      padding: 26 * echelle,
      borderRadius: 14 * echelle,
      border: "1px solid rgba(201,162,39,.45)",
      background: "rgba(20,17,14,.9)",
    }}
  >
    {mode === "question" ? (
      <>
        <p className="font-mono" style={{ margin: 0, fontSize: 15 * echelle, letterSpacing: "0.2em", color: "rgba(201,162,39,.85)" }}>
          CASTING · JEUDI 15 OCTOBRE
        </p>
        <p style={{ margin: 0, fontSize: 26 * echelle, lineHeight: 1.25 }}>Les Remparts, avec Claire Martin</p>
        <p style={{ margin: 0, fontSize: 19 * echelle, lineHeight: 1.35, color: "rgba(243,237,228,.65)" }}>
          « Elle m&apos;a demandé d&apos;être plus calme, et j&apos;ai trouvé quelque chose. »
        </p>
        <p style={{ margin: `${6 * echelle}px 0 0`, paddingLeft: 16 * echelle, borderLeft: `${3 * echelle}px solid rgba(201,162,39,.7)`, fontSize: 25 * echelle, lineHeight: 1.3, fontStyle: "italic", color: "#d9b44a" }}>
          Qu&apos;est-ce que tu as trouvé, quand elle t&apos;a demandé d&apos;être plus calme ?
        </p>
      </>
    ) : (
      <>
        <p className="font-mono" style={{ margin: 0, fontSize: 15 * echelle, letterSpacing: "0.2em", color: "rgba(201,162,39,.85)" }}>
          TON PARCOURS · APRÈS 10 ÉVÉNEMENTS
        </p>
        <p style={{ margin: 0, fontSize: 22 * echelle, lineHeight: 1.35, fontStyle: "italic", color: "rgba(243,237,228,.85)" }}>
          Deux castings, un atelier face caméra, une rencontre avec un agent. Et un mot qui revient dans tes récits : « calme ».
        </p>
        <p style={{ margin: `${4 * echelle}px 0 0`, paddingLeft: 16 * echelle, borderLeft: `${3 * echelle}px solid rgba(201,162,39,.7)`, fontSize: 25 * echelle, lineHeight: 1.3, fontStyle: "italic", color: "#d9b44a" }}>
          Et si ce calme était déjà en train de devenir une signature ?
        </p>
      </>
    )}
  </div>
);

const TITRE_CARRIERE_VOUS = (
  <>
    Ce que vous vivez<br /><span style={{ color: "#e3191d" }}>entre deux castings</span>
  </>
);
const TITRE_CARRIERE_TU = (
  <>
    Ce que tu vis<br /><span style={{ color: "#e3191d" }}>entre deux castings</span>
  </>
);
// Saut de ligne avant « IACTEUR relie… » (David, 19/10)
const TEXTE_CARRIERE_TU = (
  <>
    Raconte-le en trente secondes.
    <br />
    IACTEUR relie les fils de ton parcours.
  </>
);
const OFFERT_CARRIERE = "Tes 10 premiers événements offerts.";

export default async function Visuel({ params }: PageProps<"/visuels/[format]">) {
  const { format } = await params;

  if (format === "cv-bandeau") {
    return (
      <main style={{ width: 1100, padding: 20, margin: "0 auto" }}>
        <style>{MASQUER}</style>
        <BandeauIacteur variante="cv" />
      </main>
    );
  }

  if (format === "replique-bandeau") {
    return (
      <main style={{ width: 1100, padding: 20, margin: "0 auto" }}>
        <style>{MASQUER}</style>
        <BandeauIacteur variante="replique" />
      </main>
    );
  }

  if (format === "bandeau") {
    return (
      <main style={{ width: 1100, padding: 20, margin: "0 auto" }}>
        <style>{MASQUER}</style>
        <BandeauIacteur />
      </main>
    );
  }

  const cadre = { position: "relative" as const, overflow: "hidden", background: "#0b0909", border: "10px solid #e3191d", color: "#f3ede4" };
  const bandeBas = (hauteur: number, taille: number, texte = "iacteur.com") => (
    <div
      style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: hauteur, background: "#e3191d", display: "flex", alignItems: "center", justifyContent: "center" }}
      className="font-affiche uppercase"
    >
      <span style={{ fontSize: taille, letterSpacing: "0.04em", color: "#fff" }}>{texte}</span>
    </div>
  );

  if (format === "carriere-tiktok-1" || format === "carriere-tiktok-2" || format === "carriere-tiktok-3") {
    // TikTok (19/10) : carrousel « mode photo » en 3 images 1080 × 1920, comme un mini-film :
    // 1. le comédien croit avoir raté · 2. la question d'IACTEUR · 3. CARRIÈRE, offert, lien en bio
    const n = Number(format.slice(-1));
    const haut = { position: "absolute" as const, left: 90, right: 90, top: 330 };
    return (
      <div style={{ ...cadre, width: 1080, height: 1920 }}>
        <style>{MASQUER}</style>
        <div style={{ position: "absolute", left: 0, right: 0, top: 110, display: "flex", justifyContent: "center" }}>
          <Logo largeur={300} />
        </div>
        {n === 1 && (
          <div style={haut}>
            <p className="font-mono" style={{ margin: 0, fontSize: 30, letterSpacing: "0.25em", color: "#e3191d" }}>TU SORS D&apos;UN CASTING</p>
            <p className="font-affiche uppercase" style={{ fontSize: 150, lineHeight: 1.15, margin: "40px 0 0" }}>
              Tu te dis&nbsp;:<br /><span style={{ color: "#e3191d" }}>« raté. »</span>
            </p>
            <p style={{ fontSize: 52, lineHeight: 1.35, margin: "70px 0 0", color: "#d6cdc2" }}>
              Tu n&apos;étais pas dedans.<br />Tu avais la tête ailleurs.<br />Elle t&apos;a juste dit<br />«&nbsp;merci, c&apos;est bien&nbsp;».
            </p>
            <p style={{ fontSize: 40, margin: "120px 0 0", color: "rgba(243,237,228,.55)" }}>→ fais glisser</p>
          </div>
        )}
        {n === 2 && (
          <div style={haut}>
            <p className="font-mono" style={{ margin: 0, fontSize: 30, letterSpacing: "0.25em", color: "#e3191d" }}>ET IACTEUR TE DEMANDE</p>
            <div style={{ marginTop: 60, padding: "60px 56px", borderRadius: 28, border: "2px solid rgba(201,162,39,.5)", background: "rgba(20,17,14,.9)" }}>
              <p style={{ margin: 0, paddingLeft: 36, borderLeft: "6px solid rgba(201,162,39,.75)", fontSize: 76, lineHeight: 1.25, fontStyle: "italic", color: "#d9b44a" }}>
                Tu n&apos;étais pas dedans. Qu&apos;est-ce qu&apos;elle a vu, elle, de l&apos;autre côté de la caméra&nbsp;?
              </p>
            </div>
            <p style={{ fontSize: 52, lineHeight: 1.35, margin: "80px 0 0", color: "#d6cdc2" }}>La question que tu ne te serais pas posée.</p>
          </div>
        )}
        {n === 3 && (
          <div style={haut}>
            <p className="font-affiche uppercase" style={{ fontSize: 130, lineHeight: 1, margin: 0 }}>
              Raconte<br />ton casting.<br /><span style={{ color: "#e3191d" }}>IACTEUR te pose la question.</span>
            </p>
            <p style={{ fontSize: 50, lineHeight: 1.4, margin: "70px 0 0", color: "#d6cdc2" }}>
              30 secondes, à voix haute.<br />Il range tout : date, rôle, contacts.<br />Il te rappelle tes rendez-vous.
            </p>
            <p style={{ fontSize: 56, fontWeight: 700, margin: "80px 0 0" }}>Tes 10 premiers événements offerts.</p>
          </div>
        )}
        {bandeBas(170, 76, n === 3 ? "iacteur.com · lien en bio" : "iacteur.com")}
      </div>
    );
  }

  if (format === "couverture-carriere" || format === "carriere-facebook") {
    // CARRIÈRE (18/10, option B de David) : la récompense en exemple, la lecture du parcours.
    // Couverture de l'article (vous, lejeudelacteur.com) ou Facebook / LinkedIn (tu, iacteur.com)
    const fb = format === "carriere-facebook";
    return (
      <div style={{ ...cadre, width: 1200, height: 630 }}>
        <style>{MASQUER}</style>
        <div style={{ position: "absolute", left: 56, top: 44, width: 560 }}>
          <p className="font-mono" style={{ fontSize: 22, letterSpacing: "0.25em", color: "#e3191d", margin: 0 }}>IACTEUR · CARRIÈRE</p>
          <p className="font-affiche uppercase" style={{ fontSize: 80, lineHeight: 1.02, margin: "18px 0 0" }}>{fb ? TITRE_CARRIERE_TU : TITRE_CARRIERE_VOUS}</p>
          <p style={{ fontSize: 28, lineHeight: 1.3, margin: "22px 0 0", color: "#bdb2a6" }}>{fb ? TEXTE_CARRIERE_TU : <>
                Racontez-le en trente secondes.
                <br />
                IACTEUR relie les fils de votre parcours.
              </>}</p>
          {fb && <p style={{ fontSize: 28, fontWeight: 700, margin: "10px 0 0" }}>{OFFERT_CARRIERE}</p>}
        </div>
        <div style={{ position: "absolute", right: 36, top: 0, bottom: 70, width: 505, display: "flex", alignItems: "center" }}>
          <ExempleCarriere echelle={1.04} mode="fil" />
        </div>
        {bandeBas(70, 40, fb ? "iacteur.com" : "lejeudelacteur.com")}
      </div>
    );
  }

  if (format === "prolonger-a" || format === "prolonger-b") {
    // PROLONGER (21/10/2026, newsletter 04, 1200 × 630) : le même texte qui continue, et change de style.
    // La même réplique qui continue (David, 25/10 : les deux phrases doivent se suivre) : drame, puis bascule en comédie.
    // A = deux cartes reliées par une flèche · B = une seule page, la coupure au milieu
    const parties: [string, string][] = [
      ["PARTIE 1 · DRAME", "« Vas-y. Monte dans ce train. Je serai là quand tu reviendras. »"],
      ["PARTIE 2 · COMÉDIE", "« … Enfin, sauf s'il pleut. Ou si j'ai faim. Disons que je serai pas loin. »"],
    ];
    const titre = (
      <>
        <p className="font-mono" style={{ fontSize: 22, letterSpacing: "0.25em", color: "#e3191d", margin: 0 }}>IACTEUR · PROLONGER</p>
        <p className="font-affiche uppercase" style={{ fontSize: 76, lineHeight: 1.02, margin: "16px 0 0" }}>
          Votre texte<br />continue.<br /><span style={{ color: "#e3191d" }}>Le style change.</span>
        </p>
        <p style={{ fontSize: 26, lineHeight: 1.35, margin: "20px 0 0", color: "#bdb2a6" }}>
          Mêmes personnages, nouvelle couleur :<br />de quoi travailler les ruptures de jeu.
        </p>
      </>
    );
    const carte = ([etiquette, phrase]: [string, string], dore: boolean) => (
      <div style={{ padding: "22px 26px", borderRadius: 14, border: `1px solid ${dore ? "rgba(201,162,39,.6)" : "rgba(243,237,228,.25)"}`, background: dore ? "rgba(20,17,14,.95)" : "rgba(243,237,228,.06)" }}>
        <p className="font-mono" style={{ margin: 0, fontSize: 16, fontWeight: 900, letterSpacing: "0.2em", color: dore ? "#c9a227" : "rgba(243,237,228,.6)" }}>{etiquette}</p>
        <p style={{ margin: "10px 0 0", fontSize: 25, lineHeight: 1.3, fontStyle: "italic", color: dore ? "#d9b44a" : "#f3ede4" }}>{phrase}</p>
      </div>
    );
    return (
      <div style={{ ...cadre, width: 1200, height: 630 }}>
        <style>{MASQUER}</style>
        <div style={{ position: "absolute", left: 56, top: 44, width: 540 }}>{titre}</div>
        <div style={{ position: "absolute", right: 46, top: 0, bottom: 70, width: 500, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
          {format === "prolonger-a" ? (
            <>
              {carte(parties[0], false)}
              <p className="font-affiche" style={{ margin: 0, textAlign: "center", fontSize: 44, lineHeight: 1, color: "#e3191d" }}>↓ ➕ PROLONGER</p>
              {carte(parties[1], true)}
            </>
          ) : (
            <div style={{ padding: "26px 30px", borderRadius: 14, border: "1px solid rgba(243,237,228,.25)", background: "rgba(243,237,228,.05)" }}>
              <p className="font-mono" style={{ margin: 0, fontSize: 16, fontWeight: 900, letterSpacing: "0.2em", color: "rgba(243,237,228,.6)" }}>{parties[0][0]}</p>
              <p style={{ margin: "10px 0 0", fontSize: 25, lineHeight: 1.3, fontStyle: "italic" }}>{parties[0][1]}</p>
              <p className="font-mono" style={{ margin: "22px 0", paddingTop: 14, borderTop: "2px dashed rgba(227,25,29,.8)", fontSize: 16, fontWeight: 900, letterSpacing: "0.2em", color: "#e3191d" }}>➕ PROLONGER</p>
              <p className="font-mono" style={{ margin: 0, fontSize: 16, fontWeight: 900, letterSpacing: "0.2em", color: "#c9a227" }}>{parties[1][0]}</p>
              <p style={{ margin: "10px 0 0", fontSize: 25, lineHeight: 1.3, fontStyle: "italic", color: "#d9b44a" }}>{parties[1][1]}</p>
            </div>
          )}
        </div>
        {bandeBas(70, 40, "iacteur.com")}
      </div>
    );
  }

  if (format.startsWith("pub2-")) {
    // PUB META 02 (21/10/2026, David + GPT) : la question qu'on rumine en sortant d'un casting, face à
    // celle d'IACTEUR, tirée d'un détail. Promesse : ne plus être seul face à ce qu'on vit.
    // A = deux bulles (une conversation) · B = comme une page de texte de théâtre
    const carre = format.endsWith("carre");
    const k = carre ? 0.86 : 1;
    // Espaces insécables : jamais un « ? » ou un « » » seul en début de ligne
    const toi = "«\u00a0Elle m'a fait refaire la scène trois fois. Vont-ils me rappeler\u00a0?\u00a0»";
    const iac = "«\u00a0Qu'est-ce qu'elle cherchait, à la troisième prise\u00a0?\u00a0»";
    const nomRole = (nom: string, couleur: string) => (
      <p className="font-mono" style={{ margin: 0, fontSize: 26 * k, fontWeight: 900, letterSpacing: "0.25em", color: couleur }}>{nom}</p>
    );
    const dialogue = format.startsWith("pub2-a") ? (
      <div style={{ display: "flex", flexDirection: "column", gap: 34 * k }}>
        <div style={{ alignSelf: "flex-start", maxWidth: "82%", padding: `${26 * k}px ${32 * k}px`, borderRadius: `${30 * k}px ${30 * k}px ${30 * k}px 6px`, background: "rgba(243,237,228,.1)" }}>
          {nomRole("TOI", "rgba(243,237,228,.6)")}
          <p style={{ margin: `${10 * k}px 0 0`, fontSize: 46 * k, lineHeight: 1.28 }}>{toi}</p>
        </div>
        <div style={{ alignSelf: "flex-end", maxWidth: "82%", padding: `${26 * k}px ${32 * k}px`, borderRadius: `${30 * k}px ${30 * k}px 6px ${30 * k}px`, border: "2px solid rgba(201,162,39,.6)", background: "rgba(20,17,14,.95)" }}>
          {nomRole("IACTEUR", "#c9a227")}
          <p style={{ margin: `${10 * k}px 0 0`, fontSize: 48 * k, lineHeight: 1.25, fontStyle: "italic", color: "#d9b44a" }}>{iac}</p>
        </div>
      </div>
    ) : (
      <div style={{ display: "flex", flexDirection: "column", gap: 40 * k, paddingLeft: 30 * k, borderLeft: "3px solid rgba(201,162,39,.5)" }}>
        <div>
          {nomRole("TOI", "rgba(243,237,228,.6)")}
          <p style={{ margin: `${12 * k}px 0 0`, fontSize: 52 * k, lineHeight: 1.28 }}>{toi}</p>
        </div>
        <div>
          {nomRole("IACTEUR", "#c9a227")}
          <p style={{ margin: `${12 * k}px 0 0`, fontSize: 56 * k, lineHeight: 1.22, fontStyle: "italic", color: "#d9b44a" }}>{iac}</p>
        </div>
      </div>
    );
    return (
      <div style={{ ...cadre, width: 1080, height: carre ? 1080 : 1350 }}>
        <style>{MASQUER}</style>
        <div style={{ position: "absolute", left: 70, right: 70, top: carre ? 50 : 70, display: "flex", flexDirection: "column", gap: (carre ? 34 : 52) }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p className="font-mono" style={{ margin: 0, fontSize: 30 * k, letterSpacing: "0.22em", color: "#e3191d" }}>EN SORTANT D&apos;UN CASTING…</p>
            <Logo largeur={carre ? 170 : 200} />
          </div>
          {dialogue}
        </div>
        <div style={{ position: "absolute", left: 70, right: 70, bottom: carre ? 140 : 175 }}>
          <p className="font-affiche uppercase" style={{ margin: 0, fontSize: carre ? 120 : 140, lineHeight: 1.02 }}>
            N&apos;avance plus <span style={{ color: "#e3191d" }}>seul.</span>
          </p>
          <p style={{ margin: `${20 * k}px 0 0`, fontSize: 38 * k, lineHeight: 1.35, color: "#bdb2a6" }}>Raconte ce que tu vis. IACTEUR t&apos;aide à prendre du recul.</p>
        </div>
        {bandeBas(carre ? 100 : 120, carre ? 46 : 54, "iacteur.com · essaie sans compte")}
      </div>
    );
  }

  if (format === "carriere-instagram") {
    // 1080 × 1350 (post vertical)
    return (
      <div style={{ ...cadre, width: 1080, height: 1350 }}>
        <style>{MASQUER}</style>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26, paddingTop: 70, textAlign: "center" }}>
          <Logo largeur={340} />
          <p className="font-affiche uppercase" style={{ fontSize: 112, lineHeight: 1.02, margin: "14px 40px 0" }}>{TITRE_CARRIERE_TU}</p>
          <p style={{ fontSize: 38, lineHeight: 1.35, margin: "0 90px", color: "#bdb2a6" }}>{TEXTE_CARRIERE_TU}</p>
        </div>
        <div style={{ position: "absolute", left: 70, right: 70, bottom: 230 }}>
          <ExempleCarriere echelle={1.45} mode="fil" />
          <p style={{ fontSize: 38, fontWeight: 700, margin: "34px 0 0", textAlign: "center" }}>{OFFERT_CARRIERE}</p>
        </div>
        {bandeBas(120, 58, "iacteur.com")}
      </div>
    );
  }

  if (format === "carriere-carre") {
    // 1080 × 1080
    return (
      <div style={{ ...cadre, width: 1080, height: 1080 }}>
        <style>{MASQUER}</style>
        <div style={{ position: "absolute", left: 60, top: 50, right: 60 }}>
          <Logo largeur={260} />
          <p className="font-affiche uppercase" style={{ fontSize: 92, lineHeight: 1.02, margin: "24px 0 0" }}>{TITRE_CARRIERE_TU}</p>
          <p style={{ fontSize: 32, lineHeight: 1.3, margin: "18px 0 0", color: "#bdb2a6" }}>{TEXTE_CARRIERE_TU}</p>
        </div>
        <div style={{ position: "absolute", left: 60, right: 60, bottom: 185 }}>
          <ExempleCarriere echelle={1.3} mode="fil" />
          <p style={{ fontSize: 32, fontWeight: 700, margin: "22px 0 0" }}>{OFFERT_CARRIERE}</p>
        </div>
        {bandeBas(100, 52, "iacteur.com")}
      </div>
    );
  }

  if (format === "couverture-7-exercices") {
    // Couverture de l'article « Apprendre son texte : 7 exercices » (1200 × 630)
    return (
      <div style={{ ...cadre, width: 1200, height: 630 }}>
        <style>{MASQUER}</style>
        <div style={{ position: "absolute", left: 60, top: 44, right: 60 }}>
          <p className="font-mono" style={{ fontSize: 24, letterSpacing: "0.25em", color: "#e3191d", margin: 0 }}>LE JEU DE L&apos;ACTEUR · MÉTHODE</p>
          <p className="font-affiche uppercase" style={{ fontSize: 112, lineHeight: 1.02, margin: "20px 0 0" }}>
            <span style={{ color: "#e3191d" }}>7 exercices</span> pour apprendre son texte
          </p>
          <p style={{ fontSize: 34, lineHeight: 1.3, margin: "26px 0 0", color: "#bdb2a6" }}>
            Les modes, le phrasé, la vitesse, le crayon dans la bouche… Avec la fiche PDF à télécharger.
          </p>
        </div>
        <div
          style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 70, background: "#e3191d", display: "flex", alignItems: "center", justifyContent: "center" }}
          className="font-affiche uppercase"
        >
          <span style={{ fontSize: 42, letterSpacing: "0.04em", color: "#fff" }}>lejeudelacteur.com</span>
        </div>
      </div>
    );
  }

  if (format === "instagram") {
    // 1080 × 1350 (post vertical)
    return (
      <div style={{ ...cadre, width: 1080, height: 1350 }}>
        <style>{MASQUER}</style>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, paddingTop: 70, textAlign: "center" }}>
          <Logo largeur={420} />
          <p className="font-affiche uppercase" style={{ fontSize: 118, lineHeight: 1.1, margin: "16px 60px 0" }}>
            Les castings viennent <span style={{ color: "#e3191d" }}>à toi.</span>
          </p>
          <p style={{ fontSize: 40, lineHeight: 1.35, margin: "0 90px", color: "#bdb2a6" }}>
            Crée ta fiche casting, gratuitement : IACTEUR te propose les rôles qui te correspondent.
          </p>
          <p className="font-accent" style={{ fontSize: 44, fontStyle: "italic", margin: 0 }}>
            Conçu par des comédiens, pour des comédiens.
          </p>
        </div>
        <div style={{ position: "absolute", left: "50%", bottom: 90, transform: "translateX(-50%)" }}>
          <Telephone largeur={520} haut={560} />
        </div>
        {bandeBas(120, 64)}
      </div>
    );
  }

  if (format === "carre") {
    // 1080 × 1080
    return (
      <div style={{ ...cadre, width: 1080, height: 1080 }}>
        <style>{MASQUER}</style>
        <div style={{ position: "absolute", left: 70, top: 60, width: 560 }}>
          <Logo largeur={340} />
          <p className="font-affiche uppercase" style={{ fontSize: 100, lineHeight: 1.1, margin: "40px 0 0" }}>
            Les castings viennent <span style={{ color: "#e3191d" }}>à toi.</span>
          </p>
          <p style={{ fontSize: 34, lineHeight: 1.35, margin: "28px 0 0", color: "#bdb2a6" }}>
            Crée ta fiche casting, gratuitement : IACTEUR te propose les rôles qui te correspondent.
          </p>
          <p className="font-accent" style={{ fontSize: 38, fontStyle: "italic", margin: "26px 0 0" }}>
            Conçu par des comédiens, pour des comédiens.
          </p>
        </div>
        <div style={{ position: "absolute", right: 40, bottom: 100 }}>
          <Telephone largeur={400} haut={760} />
        </div>
        {bandeBas(100, 56)}
      </div>
    );
  }

  if (format === "facebook") {
    // 1200 × 630 (aperçu de lien, publicité)
    return (
      <div style={{ ...cadre, width: 1200, height: 630 }}>
        <style>{MASQUER}</style>
        <div style={{ position: "absolute", left: 60, top: 44, width: 700 }}>
          <Logo largeur={300} />
          <p className="font-affiche uppercase" style={{ fontSize: 88, lineHeight: 1.1, margin: "28px 0 0" }}>
            Les castings viennent <span style={{ color: "#e3191d" }}>à toi.</span>
          </p>
          <p style={{ fontSize: 30, lineHeight: 1.3, margin: "22px 0 0", color: "#bdb2a6" }}>
            Ta fiche casting gratuite sur IACTEUR. Conçu par des comédiens, pour des comédiens.
          </p>
        </div>
        <div style={{ position: "absolute", right: 50, bottom: 70 }}>
          <Telephone largeur={330} haut={520} />
        </div>
        {bandeBas(70, 42)}
      </div>
    );
  }

  if (format === "cv-instagram") {
    // 1080 × 1350
    return (
      <div style={{ ...cadre, width: 1080, height: 1350 }}>
        <style>{MASQUER}</style>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, paddingTop: 60, textAlign: "center" }}>
          <Logo largeur={380} />
          <p className="font-affiche uppercase" style={{ fontSize: 104, lineHeight: 1.08, margin: "10px 50px 0" }}>{TITRE_CV}</p>
          <p style={{ fontSize: 38, lineHeight: 1.35, margin: "0 100px", color: "#bdb2a6" }}>{TEXTE_CV}</p>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 150, display: "flex", justifyContent: "center" }}>
          <EventailCv largeur={820} />
        </div>
        <CreditPhotos taille={20} />
        {bandeBas(120, 64)}
      </div>
    );
  }

  if (format === "cv-carre") {
    // 1080 × 1080
    return (
      <div style={{ ...cadre, width: 1080, height: 1080 }}>
        <style>{MASQUER}</style>
        <div style={{ position: "absolute", left: 60, top: 50, width: 480 }}>
          <Logo largeur={290} />
          <p className="font-affiche uppercase" style={{ fontSize: 84, lineHeight: 1.08, margin: "30px 0 0" }}>{TITRE_CV}</p>
          <p style={{ fontSize: 30, lineHeight: 1.35, margin: "22px 0 0", color: "#bdb2a6" }}>{TEXTE_CV}</p>
        </div>
        <div style={{ position: "absolute", right: 30, bottom: 130 }}>
          <EventailCv largeur={560} />
        </div>
        <CreditPhotos taille={18} />
        {bandeBas(100, 56)}
      </div>
    );
  }

  if (format === "cv-facebook") {
    // 1200 × 630
    return (
      <div style={{ ...cadre, width: 1200, height: 630 }}>
        <style>{MASQUER}</style>
        <div style={{ position: "absolute", left: 56, top: 40, width: 620 }}>
          <Logo largeur={250} />
          <p className="font-affiche uppercase" style={{ fontSize: 74, lineHeight: 1.08, margin: "22px 0 0" }}>{TITRE_CV}</p>
          <p style={{ fontSize: 27, lineHeight: 1.3, margin: "16px 0 0", color: "#bdb2a6" }}>{TEXTE_CV}</p>
        </div>
        <div style={{ position: "absolute", right: 40, top: 40 }}>
          <EventailCv largeur={430} />
        </div>
        <CreditPhotos taille={16} />
        {bandeBas(70, 42)}
      </div>
    );
  }

  if (format === "minicoach-instagram" || format === "minicoach-story") {
    // 1080 × 1350 (post vertical) ou 1080 × 1920 (story)
    const story = format === "minicoach-story";
    const haut = story ? 1920 : 1350;
    return (
      <div style={{ ...cadre, width: 1080, height: haut }}>
        <style>{MASQUER}</style>
        <div style={{ position: "absolute", left: 0, right: 0, top: story ? 560 : 400, height: story ? 1000 : 820 }}>
          <PhotoCoach largeur={1060} haut={story ? 1000 : 820} position={story ? "62% 15%" : "35% 20%"} fondu="haut" />
        </div>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 24, paddingTop: story ? 130 : 60, textAlign: "center" }}>
          <Logo largeur={story ? 400 : 360} />
          <p className="font-affiche uppercase" style={{ fontSize: story ? 112 : 100, lineHeight: 1.06, margin: "10px 50px 0" }}>{TITRE_MC}</p>
          <p style={{ fontSize: 38, lineHeight: 1.35, margin: "0 90px", color: "#bdb2a6" }}>{TEXTE_MC_CENTRE}</p>
          {!story && <p style={{ fontSize: 40, fontWeight: 700, margin: 0 }}>Gratuit, sans compte.</p>}
        </div>
        <div style={{ position: "absolute", left: story ? 120 : 60, right: story ? 120 : 60, bottom: story ? 300 : 145 }}>
          <ExempleMiniCoach echelle={story ? 1.25 : 1.22} />
          {story && <p style={{ fontSize: 40, fontWeight: 700, margin: "28px 0 0", textAlign: "center" }}>Gratuit, sans compte.</p>}
        </div>
        {bandeBas(story ? 140 : 120, story ? 64 : 58, "iacteur.com/mini-coach")}
      </div>
    );
  }

  if (format === "minicoach-carre") {
    // 1080 × 1080 : l'exemple en grand, en pleine largeur (David, 17/10 : quitte à moins voir le visage)
    return (
      <div style={{ ...cadre, width: 1080, height: 1080 }}>
        <style>{MASQUER}</style>
        <div style={{ position: "absolute", left: 0, right: 0, top: 150, bottom: 100 }}>
          <PhotoCoach largeur={1060} haut={830} position="62% 18%" fondu="haut" />
        </div>
        <div style={{ position: "absolute", left: 60, top: 50, right: 60 }}>
          <Logo largeur={260} />
          <p className="font-affiche uppercase" style={{ fontSize: 78, lineHeight: 1.04, margin: "24px 0 0" }}>{TITRE_MC}</p>
          <p style={{ fontSize: 30, lineHeight: 1.3, margin: "18px 0 0", color: "#d6cdc2", maxWidth: 820 }}>{TEXTE_MC}</p>
          <p style={{ fontSize: 32, fontWeight: 700, margin: "12px 0 0" }}>Gratuit, sans compte.</p>
        </div>
        <div style={{ position: "absolute", left: 60, right: 60, bottom: 125 }}>
          <ExempleMiniCoach echelle={1.22} />
        </div>
        {bandeBas(100, 52, "iacteur.com/mini-coach")}
      </div>
    );
  }

  if (format === "minicoach-facebook") {
    // 1200 × 630 : Facebook et LinkedIn (aperçu de lien, publication)
    return (
      <div style={{ ...cadre, width: 1200, height: 630 }}>
        <style>{MASQUER}</style>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 70 }}>
          <PhotoCoach largeur={560} haut={540} fondu="gauche" />
        </div>
        <div style={{ position: "absolute", left: 56, top: 40, width: 620 }}>
          <Logo largeur={250} />
          <p className="font-affiche uppercase" style={{ fontSize: 72, lineHeight: 1.06, margin: "22px 0 0" }}>{TITRE_MC}</p>
          <p style={{ fontSize: 26, lineHeight: 1.3, margin: "16px 0 0", color: "#bdb2a6" }}>{TEXTE_MC}</p>
          <p style={{ fontSize: 28, fontWeight: 700, margin: "10px 0 0" }}>Gratuit, sans compte.</p>
        </div>
        <div style={{ position: "absolute", right: 36, bottom: 96, width: 430 }}>
          <ExempleMiniCoach echelle={0.72} />
        </div>
        {bandeBas(70, 40, "iacteur.com/mini-coach")}
      </div>
    );
  }

  if (format === "replique-instagram") {
    // 1080 × 1350 (post vertical)
    return (
      <div style={{ ...cadre, width: 1080, height: 1350 }}>
        <style>{MASQUER}</style>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26, paddingTop: 60, textAlign: "center" }}>
          <Logo largeur={380} />
          <p className="font-affiche uppercase" style={{ fontSize: 96, lineHeight: 1.08, margin: "10px 60px 0" }}>
            {TITRE_REPLIQUE}
          </p>
          <p style={{ fontSize: 38, lineHeight: 1.35, margin: "0 90px", color: "#bdb2a6" }}>{TEXTE_REPLIQUE}</p>
          <p style={{ fontSize: 42, fontWeight: 700, margin: 0 }}>Ton premier texte est offert.</p>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 120 }}>
          <PhotoReplique largeur={1060} haut={420} fondu="haut" />
        </div>
        {bandeBas(120, 64)}
      </div>
    );
  }

  if (format === "replique-carre") {
    // 1080 × 1080
    return (
      <div style={{ ...cadre, width: 1080, height: 1080 }}>
        <style>{MASQUER}</style>
        <div style={{ position: "absolute", left: 70, right: 70, top: 56 }}>
          <Logo largeur={300} />
          <p className="font-affiche uppercase" style={{ fontSize: 84, lineHeight: 1.08, margin: "30px 0 0" }}>
            {TITRE_REPLIQUE}
          </p>
          <p style={{ fontSize: 32, lineHeight: 1.35, margin: "22px 0 0", color: "#bdb2a6" }}>{TEXTE_REPLIQUE}</p>
          <p style={{ fontSize: 36, fontWeight: 700, margin: "16px 0 0" }}>Ton premier texte est offert.</p>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 100 }}>
          <PhotoReplique largeur={1060} haut={330} fondu="haut" />
        </div>
        {bandeBas(100, 56)}
      </div>
    );
  }

  if (format === "replique-facebook") {
    // 1200 × 630 : Facebook et LinkedIn (aperçu de lien, publication)
    return (
      <div style={{ ...cadre, width: 1200, height: 630 }}>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 70 }}>
          <PhotoReplique largeur={560} haut={540} fondu="gauche" />
        </div>
        <style>{MASQUER}</style>
        <div style={{ position: "absolute", left: 56, top: 40, width: 660 }}>
          <Logo largeur={260} />
          <p className="font-affiche uppercase" style={{ fontSize: 68, lineHeight: 1.08, margin: "22px 0 0" }}>
            {TITRE_REPLIQUE}
          </p>
          <p style={{ fontSize: 26, lineHeight: 1.3, margin: "16px 0 0", color: "#bdb2a6" }}>{TEXTE_REPLIQUE}</p>
          <p style={{ fontSize: 28, fontWeight: 700, margin: "10px 0 0" }}>Ton premier texte est offert.</p>
        </div>
        {bandeBas(70, 42)}
      </div>
    );
  }

  notFound();
}
