// Le visiteur est-il près d'Avignon ? (07/10/2026) Sert à choisir le bandeau
// de fin d'article : un cours d'essai à Avignon pour les gens du coin, IACTEUR
// pour les autres. La position vient de Vercel (déduite de la connexion, à
// quelques km près) ; rien n'est enregistré.
const AVIGNON = { lat: 43.949, lon: 4.806 };
const RAYON_KM = 100;

function distanceKm(lat: number, lon: number) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const a =
    Math.sin(rad(lat - AVIGNON.lat) / 2) ** 2 +
    Math.cos(rad(AVIGNON.lat)) * Math.cos(rad(lat)) * Math.sin(rad(lon - AVIGNON.lon) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

export async function GET(request: Request) {
  const lat = Number(request.headers.get("x-vercel-ip-latitude"));
  const lon = Number(request.headers.get("x-vercel-ip-longitude"));
  // Position inconnue : on garde le bandeau du cours d'essai (le plus prudent)
  const proche = !Number.isFinite(lat) || !Number.isFinite(lon) || !lat || !lon ? true : distanceKm(lat, lon) <= RAYON_KM;
  return Response.json({ proche }, { headers: { "Cache-Control": "private, no-store" } });
}
