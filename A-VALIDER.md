# À valider par David (site de l'école)

Mis à jour le 07/10/2026 : relecture de David faite (tout validé sauf les corrections ci-dessous, appliquées). Cocher ou corriger, puis le dire à Claude.

## Page Intensif (aperçu : à mettre en ligne sur Vercel, voir plus bas)
- [x] Bandeau du haut « Promo 2027-2028 · 10 places » (la référence disait « Plus que quelques places » : je ne l'ai pas repris, pour ne rien affirmer de faux).
- [x] Avis Google : 4,9 sur 41 avis (corrigé le 06/10). Citations de Cindy M., Anna C., Amaury B. conservées. Penser à mettre le nombre d'avis à jour de temps en temps.
- [x] Ta citation « Cette formation ne promet pas… » (reprise de la page Wix) : on la garde ?
- [x] Hors cursus : bande démo sur devis, book photo 300 € (corrigé le 06/10).
- [x] Les candidatures arrivent sur contact@lejeudelacteur.com (et dans ADMIN > ÉCOLE) : adresse validée le 06/10.

## Accueil, Pro du lundi, Loisirs (06/10)
- [x] Accueil : les 3 avis d'élèves (Anthony Canneddu, Caroline Beghain, Jean-Claude Ouvray) repris de l'accueil Wix.
- [x] Loisirs 2026-2027 : groupes du mardi (David, cinéma), mercredi (Myriam Waelkens, cinéma), jeudi (Nicolas Laurent, théâtre), 18h30-21h30 ; 1 cours 520 €/an, 2e cours + 400 €, 3e cours sur demande (corrigé le 06/10).
- [x] Pro du lundi : 18h30-22h30, 1 170 € + 90 €, cartes 5 et 10 cours (200 / 380 €), cours 50 €, masterclass 50 €, 4 à 8 participants.
- [x] Le formulaire de contact (cours d'essai, questions) arrive aussi dans ADMIN > ÉCOLE.

## Équipe (06/10)
- [x] Biographies reprises de la page Wix, coquilles corrigées ; « Odette Toulemonde » et « Claudio Tonetti » confirmés le 06/10.
- [x] Intervenants : photos d'Aureck et d'Isabelle ajoutées le 06/10 (dossier LE JEU 2026 / 08 EQUIPE).

## Stages, Partenaire de jeu, Book / Vidéo, Théâtre (06/10)
- [x] Stage casting : prochaine session « début 2027 » ; plus aucune mention de financement AFDAS / France Travail (07/10). Le PDF de présentation est repris de Wix.
- [x] Book / Vidéo : book photo 300 €, tout le reste sur devis (07/10).
- [ ] Book / Vidéo : la bande démo est maintenant celle de Cindy (impro du 2 décembre, sous-titrée, dans le projet). La vidéo de présentation est encore lue depuis Wix : à remplacer avant septembre 2027.
- [x] Partenaire de jeu : formulaire de parrainage (parrain, filleul, e-mail, téléphone, cours) → ADMIN > ÉCOLE.
- [x] Théâtre : photos de la façade, du hall, de la salle et du plateau (dossier LE JEU 2026 / 08 EQUIPE / L'ORIFLAMME).
- [x] Anciennes adresses Wix gardées : /book-vidéo, /théâtredeloriflamme, /équipe ; /stages mène à /stages-casting, /formations à l'accueil.

## Photos à remplacer plus tard
- [x] Loisirs : photo d'un vrai cours loisirs (ARCHIVES / Repetition loisir), le 06/10.

## Gestes à faire avec David (comptes)
- [x] Dépôt GitHub et projet Vercel créés le 06/10 : aperçu sur https://lejeudelacteur-v02.vercel.app (fermé à Google).
- [x] Vercel : NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SECRET_KEY ajoutées.
- [x] Vercel : RESEND_API_KEY ajoutée le 06/10 (clé Resend « Site école »). Les e-mails partent de notifications@iacteur.com.

## Blog (07/10)
- [x] Les 163 articles sont importés (mêmes adresses /post/<slug>, 5 catégories sur /news/categories/<slug>, images dans le projet). À parcourir par David : /news, puis quelques articles.
- [ ] **Vidéos : 135 vidéos des articles sont encore lues depuis Wix** (≈ 4,7 Go en tout, hébergées sur video.wixstatic.com). Elles marchent tant que l'abonnement Wix court (jusqu'au 4 septembre 2027). Avant cette date : les mettre sur YouTube (ou un stockage), et remplacer les liens. Les 43 vidéos YouTube des articles, elles, sont déjà indépendantes.
- [x] Les pages de tags de Wix (/news/tags/…) n'existent pas dans la nouvelle version ; elles ne figuraient pas dans le plan du site.

## Pages ajoutées le 07/10 (avant la bascule)
- [x] Mentions légales et confidentialité (/rgpd) réécrites pour le nouveau site : adresse de l'éditeur = le siège déclaré au registre des entreprises (Rochefort-du-Gard, comme l'ancienne page Wix), les cours étant au Théâtre de l'Oriflamme (corrigé le 07/10), demandes gardées 3 ans, identifiant de visiteur renouvelé tous les 13 mois, aucun cookie de publicité. À relire ; à compléter si on ajoute le pixel Meta.
- [x] Inscriptions (/inscriptions) : aiguillage vers les 4 formations + formulaire. Pas de brochure PDF téléchargeable pour l'instant (décision de David, 07/10) : l'ancienne était téléchargée 29 fois par mois, à refaire plus tard si besoin.
- [x] David Rousseau réalisateur : texte et 7 liens (YouTube, Vimeo) repris de Wix.
- [x] Redirections : les 13 anciennes pages de l'app IACTEUR (/loge, /solo, …), /iacteur, /creer, /ma-carriere, /casting vers iacteur.com ; les vieilles saisons vers le blog ou la bonne formation ; /faq (page vide chez Wix), /en-ligne (page de confinement) et trois pages de test vers l'accueil.
- [x] Plan du site (sitemap.xml) prêt : à envoyer dans la Search Console le jour de la bascule.

## Pixel Meta (07/10)
- [x] Le même pixel que sur Wix (1538718027568728) est repris, avec un bandeau « Accepter / Refuser » : il ne se charge qu'après accord, seulement sur le vrai domaine (pas sur l'aperçu), et envoie un événement « Lead » à chaque demande envoyée. Le lien « Gérer les cookies » est en bas de chaque page.
- [ ] Le jour de la bascule : dans le Business Manager Meta, vérifier le domaine lejeudelacteur.com (comme sur Wix) et tester le pixel avec l'extension Meta Pixel Helper.

## Plus tard
- [ ] contact@lejeudelacteur.com est une boîte Hostinger (https://mail.hostinger.com/). Laetitia n'y a pas accès : trouver la solution (redirection vers son adresse, ou accès partagé à la boîte), et lui expliquer pas à pas.
