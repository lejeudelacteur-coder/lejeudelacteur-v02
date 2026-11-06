// Télécharger la fiche de pré-inscription d'un cours (PDF). Chaque clic est compté dans l'ADMIN d'IACTEUR
// (onglet ÉCOLE, « Clics de contact ») : cibleDuLien() reconnaît les adresses /documents/fiche-preinscription-*.pdf.
export default function BoutonFiche({ cours }: { cours: "intensif" | "pro" | "loisirs" }) {
  return (
    <a
      href={`/documents/fiche-preinscription-${cours}.pdf`}
      target="_blank"
      rel="noopener"
      className="self-start rounded-md border border-foreground/40 px-5 py-3 font-affiche text-lg uppercase tracking-wide"
    >
      Télécharger la fiche de pré-inscription (PDF)
    </a>
  );
}
