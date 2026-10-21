// LES VIDÉOS YOUTUBE DES PAGES (21/10/2026) : de quoi les décrire à Google (fiche « VideoObject »,
// invisible pour les visiteurs), pour qu'elles puissent apparaître avec leur miniature dans les
// résultats de recherche. Date de mise en ligne et durée relevées sur YouTube.
export type FicheVideo = { titre: string; description: string; date: string; duree: string };

export const VIDEOS: Record<string, FicheVideo> = {
  "D28GrQ93KXM": { titre: "Cours Intensif pour acteur à Avignon : le teaser", description: "Le teaser de la formation intensive du Jeu de l'Acteur à Avignon : travail à l'image, castings, tournages, masterclasses, cascade, shooting photo.", date: "2025-08-09T10:29:20-07:00", duree: "PT59S" },
  "iRF6VPelnrk": { titre: "Démo de comédien : Amaury B.", description: "La bande démo d'Amaury B., montée à l'issue de sa première année au Jeu de l'Acteur, école de théâtre et de cinéma à Avignon.", date: "2026-10-21T08:50:11-07:00", duree: "PT3M1S" },
  "AKAJuX7xyWQ": { titre: "Cours Pro du lundi à Avignon : interview", description: "Le Cours Pro du lundi du Jeu de l'Acteur à Avignon, raconté par ses participants : jeu face caméra, improvisation, préparation aux castings.", date: "2025-08-13T08:36:39-07:00", duree: "PT2M16S" },
  "4R08WX35UZo": { titre: "Monologue créé avec IACTEUR SOLO : Manon", description: "Un monologue créé avec IACTEUR SOLO, puis travaillé et interprété par Manon, élève du Jeu de l'Acteur à Avignon.", date: "2026-08-29T07:10:01-07:00", duree: "PT1M49S" },
  "JYzKl9enSJw": { titre: "Monologue créé avec IACTEUR SOLO : Nicolas", description: "Un monologue créé avec IACTEUR SOLO, puis travaillé et interprété par Nicolas, élève du Jeu de l'Acteur à Avignon.", date: "2026-09-08T06:59:09-07:00", duree: "PT1M12S" },
  "eeznJ-zPYTg": { titre: "Monologue créé avec IACTEUR SOLO : Agnès", description: "Un monologue créé avec IACTEUR SOLO, puis travaillé et interprété par Agnès, élève du Jeu de l'Acteur à Avignon.", date: "2026-07-09T02:25:10-07:00", duree: "PT1M52S" },
  "nq-YjEEBH8c": { titre: "Jeu face caméra au Cours Pro du lundi", description: "Extrait de « Folle à demi » de Cassidie Gardès, par Elina Maurel : première prise du travail face caméra au Cours Pro du lundi, Le Jeu de l'Acteur, Avignon.", date: "2025-10-20T01:56:21-07:00", duree: "PT1M20S" },
  "zc_YmcTmScA": { titre: "Improvisation sur le lâcher-prise", description: "Improvisation sur le lâcher-prise avec Cindy Malbon, au Cours Pro du lundi du Jeu de l'Acteur, école de théâtre et de cinéma à Avignon.", date: "2024-12-24T04:52:47-08:00", duree: "PT2M18S" },
  "AvduR_iX13c": { titre: "Projection de fin d'année 2025/2026 du Jeu de l'Acteur", description: "Projection du cursus 2025-2026 des élèves Pros et Loisirs du Jeu de l'Acteur, école de théâtre et de cinéma à Avignon : monologues, scènes et films tournés pendant l'année.", date: "2026-07-03T17:24:03-07:00", duree: "PT1H28M28S" },
};

export function ficheVideo(id: string) {
  const v = VIDEOS[id];
  if (!v) return null;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.titre,
    description: v.description,
    thumbnailUrl: [`https://i.ytimg.com/vi/${id}/hqdefault.jpg`],
    uploadDate: v.date,
    duration: v.duree,
    embedUrl: `https://www.youtube.com/embed/${id}`,
    publisher: { "@type": "Organization", name: "Le Jeu de l'Acteur", url: "https://www.lejeudelacteur.com" },
  };
}
