import { useParams } from "react-router-dom"
import {useAppContext} from "./AppContext";

function Musics({playlist, filter}: {playlist: {"music": string[]}, filter: string}) {

    const params = useParams();
    const playlistName = String(params.parameter);

    const {numberMusics, setNumberMusics, oldMusics, setOldMusics} = useAppContext();

    function playMusic (p : string, m : string) {
      const player = document.getElementById("player") as HTMLAudioElement;
      if (m !== null) {
        setNumberMusics(numberMusics + 1);
        const newOldMusics = oldMusics;
        newOldMusics.push({"music": m, "playlist":p});
        setOldMusics(newOldMusics);
        const path = "./music/" + p + "/" + m;
        player.src = path;
        player.load()
        player.play().catch(err => {
          console.log(err);
        })
      }
    };

  function listMusic (playlist : {"music": string[]}) {
    const rows = [];
    if (playlist !== null) {
        const visibleMusics = playlist.music.filter((music: string) => {
            if (filter && !music.toLowerCase().includes(filter.toLowerCase())) {
                return false;
            }
            return true;
        });
        for (let music of visibleMusics.sort()) {
            rows.push(
                <div key={music} className="sm:text-2xl text-sm flex m-3 border-solid border-2 
                    hover:border-purple-500"
                    onClick={() => {playMusic(playlistName, music)}}
                    >
                    <h1 className="m-2" >{music.slice(0, -4)}</h1>
                </div>
            )
        }
    }
    return rows
    
  }

return (
  <div
    className="
      rounded-3xl
      border border-white/10

      bg-gradient-to-b
      from-slate-900
      to-purple-950/70

      backdrop-blur-md
      shadow-2xl

      overflow-hidden
    "
  >

    {/* Top Glow */}
    <div className="
      h-[2px]
      w-full
      bg-gradient-to-r
      from-transparent
      via-lime-400
      to-transparent
    "/>

    <div className="p-4 sm:p-6">
      {playlist ? (
        listMusic(playlist)
      ) : (
        <div className="
          py-10
          text-center
          text-slate-300
          animate-pulse
        ">
          Chargement des Musiques...
        </div>
      )}
    </div>
  </div>
)
}

export default Musics