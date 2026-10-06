# BASCULE DU DOMAINE lejeudelacteur.com (Wix → Vercel)

**FAITE le 07/10/2026 avec David** (DNS modifiés chez Wix, validés par Vercel, certificat HTTPS émis).
Changements effectués dans Wix > Domaines > Gérer les enregistrements DNS :
- 2 TXT ajoutés : _vercel = vc-domain-verify=lejeudelacteur.com,5f70b9ce02fd8cebf564 et vc-domain-verify=www.lejeudelacteur.com,52016a9044eed71fc814
- A (@) : 216.198.79.1 (les 3 adresses Wix supprimées)
- CNAME (www) : c04d6af3e85480e6.vercel-dns-017.com
- NE PAS TOUCHER : A intensif.lejeudelacteur.com → 76.76.21.21 (page de l'élève sur Vercel), CNAME hostingermail-a/b/c._domainkey, s1/s2/sel1._domainkey et sg (e-mails), MX Hostinger, TXT SPF et Google.

Faite avec David. Ne jamais la faire sans lui.

## Situation AVANT (relevée le 06/10/2026, pour pouvoir revenir en arrière)
- Domaine géré chez Wix (serveurs de noms ns14.wixdns.net / ns15.wixdns.net).
- A (@) : 185.230.63.186, 185.230.63.171, 185.230.63.107 (Wix)
- CNAME (www) : cdn3.wixdns.net (Wix)
- MX : mx1.hostinger.com (30), mx2.hostinger.com (40) → LA MESSAGERIE contact@ (À NE PAS TOUCHER)
- TXT : « v=spf1 include:_spf.mail.hostinger.com ~all » (À NE PAS TOUCHER)
- TXT : « google-site-verification=WccDDEF0AnnH1fQc2WIAluOvUdiAZ3zUe8SvXRalzIc » (Search Console, À NE PAS TOUCHER)
- TTL 3600 (1 h)

## Ce qui change (et seulement ça)
- A (@) : les 3 adresses Wix → 76.76.21.21 (Vercel)
- CNAME (www) : cdn3.wixdns.net → cname.vercel-dns.com (Vercel)
(Les valeurs exactes sont affichées par Vercel, Projet > Settings > Domains.)

## Retour en arrière
Remettre les 3 adresses A et le CNAME de la section « AVANT » (changement de DNS : 1 h au plus).

## Déjà prêt dans le code
- Aperçu .vercel.app : reste fermé à Google (en-tête noindex + robots) même après la bascule.
- Vrai domaine : ouvert à Google, robots.txt avec le plan du site (sitemap.xml, 181 adresses).
- Redirections des anciennes adresses Wix, pixel Meta + bandeau (actif seulement sur le vrai domaine).

## Après la bascule
1. Search Console (lejeudelacteur@gmail.com) : envoyer https://www.lejeudelacteur.com/sitemap.xml.
2. Meta : vérifier le domaine, tester le pixel (Meta Pixel Helper).
3. David : refaire /ne-pas-me-compter sur chaque appareil (le réglage est propre à chaque adresse).
4. IACTEUR : le lien « Ne plus compter mes visites » de ADMIN > ÉCOLE pointe vers la nouvelle adresse.
5. Surveiller 48 h : demandes reçues, e-mails contact@, Search Console (erreurs 404).
