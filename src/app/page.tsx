// Accueil : provisoire, le temps de construire les autres pages (ordre de
// construction dans CLAUDE.md). Mène à la page Intensif.
import { redirect } from "next/navigation";

export default function Accueil() {
  redirect("/cours-intensif");
}
