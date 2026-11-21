// TYPOGRAPHIE FRANÇAISE DES TITRES (21/11/2026, David : « le point d'interrogation est à la ligne ») : l'espace avant « ? ! : ; »
// et après « « » est insécable, pour que le signe ne tombe jamais seul sur la ligne suivante.
export function titreSansVeuve(titre: string): string {
  return titre.replace(/[   ]+([?!:;»])/g, " $1").replace(/(«)[   ]+/g, "$1 ");
}
