// Nombre de vues de chaque article du blog (07/10/2026), affiché UNIQUEMENT sur
// les appareils de David (réglés sur « ne plus me compter », voir
// VuesDavid.tsx). Compte les pages vues depuis la mise en ligne du nouveau
// site (l'historique de Wix n'est pas récupérable). Le total est mis en cache
// 5 minutes pour ne pas solliciter la base à chaque page.
import { base } from "@/lib/supabase";

export async function GET() {
  const { data } = await base().from("ecole_visites").select("page").like("page", "/post/%").limit(100000);
  const vues: Record<string, number> = {};
  for (const v of data ?? []) {
    let slug = String(v.page).slice(6);
    try {
      slug = decodeURIComponent(slug);
    } catch {
      // adresse mal formée : on la garde telle quelle
    }
    vues[slug] = (vues[slug] ?? 0) + 1;
  }
  return Response.json(vues, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
}
