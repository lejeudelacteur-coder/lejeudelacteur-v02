// Un tableau de comparatif qui reste lisible sur téléphone : colonnes à largeur fixe, le texte passe à la ligne (16/11/2026).
export default function TableauComparatif({ entetes, lignes }: { entetes: string[]; lignes: string[][] }) {
  return (
    <div>
      <table className="w-full table-fixed border-collapse text-left text-sm [overflow-wrap:anywhere] sm:text-base">
        <thead>
          <tr>
            {entetes.map((e, i) => (
              <th key={i} className="border-b-2 border-rouge px-2 py-2 font-mono text-[10px] font-black uppercase tracking-[0.15em] sm:px-3 sm:text-xs">
                {e}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lignes.map((l, i) => (
            <tr key={i} className="border-b border-secondaire/25 align-top">
              {l.map((c, j) => (
                <td key={j} className={`px-2 py-2.5 leading-snug sm:px-3 ${j === 0 ? "font-bold" : ""}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
