// Le texte d'un article : du HTML préparé à l'import (liste blanche de balises),
// où les vidéos YouTube sont remplacées par un lecteur qui ne charge qu'au toucher.
import VideoYoutube from "@/components/VideoYoutube";

const VIDEO = /(<div class="video" data-youtube="[\w-]{11}"><\/div>)/;

export default function CorpsArticle({ html, titre }: { html: string; titre: string }) {
  return (
    <div className="article-corps">
      {html.split(VIDEO).map((morceau, i) => {
        const v = morceau.match(/data-youtube="([\w-]{11})"/);
        return v && morceau.startsWith('<div class="video"') ? (
          <VideoYoutube key={i} id={v[1]} titre={titre} />
        ) : morceau.trim() ? (
          <div key={i} className="article-corps-bloc" dangerouslySetInnerHTML={{ __html: morceau }} />
        ) : null;
      })}
    </div>
  );
}
