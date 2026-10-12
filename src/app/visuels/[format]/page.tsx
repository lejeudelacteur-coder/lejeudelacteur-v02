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
export const dynamicParams = false;
export function generateStaticParams() {
  return ["bandeau", "instagram", "carre", "facebook", "replique-bandeau", "replique-instagram", "replique-carre", "replique-facebook"].map((format) => ({ format }));
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

const TITRE_REPLIQUE = (
  <>
    Personne pour te donner la réplique ? <span style={{ color: "#e3191d", display: "block" }}>Plus maintenant.</span>
  </>
);
const TEXTE_REPLIQUE = "IACTEUR te donne la réplique, avec une vraie voix, et te souffle quand tu as un trou. À la fin, tes répliques à retravailler.";

export default async function Visuel({ params }: PageProps<"/visuels/[format]">) {
  const { format } = await params;

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
