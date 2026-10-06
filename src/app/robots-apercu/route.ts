// robots.txt de l'APERÇU (adresses en .vercel.app) : fermé aux moteurs de
// recherche, pour ne pas faire concurrence au vrai site (voir next.config.ts).
export function GET() {
  return new Response("User-agent: *\nDisallow: /\n", { headers: { "Content-Type": "text/plain" } });
}
