// VISUELS À EXPORTER (07/10/2026) : le bandeau IACTEUR en images (post
// Instagram, carré, Facebook, bandeau large). Pages de travail, non
// référencées : on les ouvre dans un navigateur pour en tirer des PNG.
// RÉPLIQUE (12/10/2026) : les mêmes formats pour RÉPLIQUE (« replique-… »), à partager
// sur Facebook, Instagram et LinkedIn (1200 × 630 vaut pour les deux).
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import BandeauIacteur from "@/components/BandeauIacteur";

export const metadata: Metadata = { title: "Visuels IACTEUR", robots: { index: false, follow: false } };
export function generateStaticParams() {
  return ["bandeau", "instagram", "carre", "facebook", "couverture-7-exercices", "cv-bandeau", "cv-instagram", "cv-carre", "cv-facebook", "replique-bandeau", "replique-instagram", "replique-carre", "replique-facebook"].map((format) => ({ format }));
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
  const bandeBas = (hauteur: number, taille: number) => (
    <div
      style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: hauteur, background: "#e3191d", display: "flex", alignItems: "center", justifyContent: "center" }}
      className="font-affiche uppercase"
    >
      <span style={{ fontSize: taille, letterSpacing: "0.04em", color: "#fff" }}>iacteur.com</span>
    </div>
  );

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
