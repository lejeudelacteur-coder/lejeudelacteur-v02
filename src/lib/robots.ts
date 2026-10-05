// Les visiteurs qui ne sont pas des personnes (robots, aperçus de liens,
// vérificateurs) : leurs visites ne sont pas comptées. Même liste qu'IACTEUR.
export function estUnRobot(ua: string | null) {
  return /bot|crawl|spider|preview|proxy|scan|slack|whatsapp|facebookexternalhit|externalhit|meta-external|safelinks|headless|Linux i686|Gecko\/2002|X11; U;/i.test(
    ua ?? ""
  );
}
