// Cadre commun à toutes les pages du site de l'école.
import type { Metadata, Viewport } from "next";
import { Anton, Nunito_Sans, Playfair_Display } from "next/font/google";
import Suivi from "@/components/Suivi";
import "./globals.css";

const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const nunito = Nunito_Sans({ variable: "--font-nunito", subsets: ["latin"] });
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: "italic",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lejeudelacteur.com"),
  title: {
    default: "Le Jeu de l'Acteur, école de comédiens à Avignon",
    template: "%s | Le Jeu de l'Acteur",
  },
  description:
    "École de comédiens à Avignon : formation intensive pour devenir acteur, cours pro, cours loisirs, stages et préparation aux castings.",
};

export const viewport: Viewport = {
  themeColor: "#0B0909",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${anton.variable} ${nunito.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Suivi />
        {children}
      </body>
    </html>
  );
}
