@AGENTS.md

# LE JEU DE L'ACTEUR — site V02

## Intention (David, 2026-10-06)

Reconstruire le site de l'école (lejeudelacteur.com, aujourd'hui sur Wix) en
dehors de Wix, avant le 1er janvier 2027 (abonnement Wix payé jusqu'au
4 septembre 2027, domaine renouvelé le 12 mai 2027 : David est « Admin
(Co-Owner) » du site Wix).

Style : celui de la page de référence https://lejeudelacteur-intensif.vercel.app
(faite par un élève ; on reconstruit, on ne reprend pas son code) : plateau de
cinéma, noir et rouge, titres-affiches, « scènes » numérotées (SC. 01…),
bandeau défilant, chiffres clés, parcours qui mène à une candidature en
6 questions.

David n'est pas développeur et a peu de temps : sessions de 2 h de temps en
temps. Travailler par blocs, laisser un aperçu et une courte liste « à
valider ». Ne JAMAIS basculer le domaine, publier en production, ni engager
de dépense sans lui.

## Ordre de construction

1. **Page Intensif** + candidature en 6 questions enregistrée en base +
   e-mail de confirmation + onglet ÉCOLE dans l'ADMIN d'IACTEUR (visites par
   page et par source, abandons par question, candidats à rappeler avec un
   statut, résultats par formation).
2. Autres formations (Pro du lundi, Loisir), équipe, tarifs, Partenaire de
   jeu, contact, stages, Book / Vidéo, théâtre de l'Oriflamme.
3. **Blog** : les 162 articles importés depuis Wix, MÊMES ADRESSES
   (`/post/<slug>`) et mêmes catégories (`/news/categories/...`), pour ne rien
   perdre du référencement (~4 000 clics Google en 3 mois, 148 pages indexées
   au 06/10/2026, Search Console de lejeudelacteur@gmail.com). Images
   téléchargées dans le projet (rien ne doit dépendre de Wix).
4. Accueil, puis bascule du domaine en décembre, avec David présent. LE JOUR DE LA BASCULE : retirer le noindex (layout.tsx, `robots`) et ouvrir robots.ts.

Aperçu en ligne : https://lejeudelacteur-v02.vercel.app (projet Vercel « lejeudelacteur-v02 », équipe IACTEUR ; dépôt GitHub lejeudelacteur-coder/lejeudelacteur-v02). Fermé aux moteurs de recherche (noindex) jusqu'à la bascule.

## Faits à respecter

- Le site présente la promo SUIVANTE (2027-2028) : Intensif = lundi à jeudi,
  14 h à 17 h (4 après-midis, 12 h/semaine, 336 h/an), 365 €/mois × 10,
  10 élèves maximum, sur entretien. L'année 2026-2027 est une exception
  (mardi à jeudi) : ne jamais l'afficher.
- Intervenants : David Rousseau (comédien & réalisateur, cofondateur),
  Nicolas Laurent (comédien, coach d'acting), Laetitia Gaune (directrice de
  casting, cofondatrice), Aureck (cascade), Isabelle Delaetre (techniques de respiration).
- Ne JAMAIS écrire « sophrologie » sur le site (décision de David, 06/10/2026, liée au dossier de certification) : dire « techniques de respiration ».
  EXCEPTION (David, 07/10/2026) : les 163 articles de blog repris de Wix sont gardés tels quels, y compris « La Sophrologie pour le jeu de l'Acteur » et 4 autres qui citent le mot. La règle vaut pour tout NOUVEAU texte.
- Partenaire de jeu (« Viens à deux »), UNIQUEMENT pour les formations pro :
  Intensif = un mois de formation offert à chacun (328 €/mois au lieu de 365) ;
  Pro du lundi = 10 % de réduction (à l'année ou en cartes de 5 et 10 cours).
  Pas pour les loisirs.
- Book photo hors cursus : 300 € ; tout le reste (mini-book, vidéos, scène, bande démo) sur devis (David, 07/10). Stage casting : ne pas annoncer de financement AFDAS / France Travail.
- Pro du lundi et Loisirs : on affiche l'année EN COURS (on peut s'y inscrire en
  cours d'année). Intensif : la promo SUIVANTE (voir plus haut).
- Téléphone public : 06 23 18 15 79. Adresse : Théâtre de l'Oriflamme,
  5 rue Portail Matheron, 84000 Avignon.
- Droit à l'image : tous les élèves l'ont signé, et la règle de la maison est
  que toute personne qui entre au théâtre consent. Retirer une photo si
  quelqu'un le demande (2 fois en 7 ans).
- Publicités Meta : le pixel ne se charge qu'après consentement (bandeau).
  Chaque candidature garde sa source (utm, Instagram, Facebook, Google…).
- Toujours « Directrice / Directeur de casting », jamais « Direction de
  casting ».

## Stack

Next.js 16 + React 19 + TypeScript + Tailwind 4 (mêmes versions
qu'IACTEUR, projet voisin : `../../16 IACTEUR V02/iacteur-v02`). Base de
données : la MÊME Supabase qu'IACTEUR (tables préfixées `ecole_`), pour que
l'onglet ÉCOLE vive dans l'ADMIN d'IACTEUR. Vercel : projet à part. Clés en
variables d'environnement uniquement (`.env.local`, jamais commité).

Polices : Anton (titres), Playfair Display italique (accents), Nunito Sans
(texte). Couleurs : fond #0B0909, texte #F3EDE4, rouge #E3191D, secondaire
#BDB2A6.

Mobile d'abord, toujours. Textes en français, tutoiement pour les élèves.
