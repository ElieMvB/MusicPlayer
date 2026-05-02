import { useParams } from "react-router-dom"

function Musics({playlist, filter}: {playlist: {"music": [string]}, filter: string}) {

    const params = useParams();
    const playlistName = String(params.parameter);

    const addMusic = async (p: string, m: string) => {
        try {
            await fetch("http://music-player-api.martial-van-beek.com/force-music/" + p + "/" + m, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            console.error(err)
        }
    }

    function playMusic (p : string, m : string) {
      const player = document.getElementById("player") as HTMLAudioElement;
      if (m !== null) {
        const path = "./music/" + p + "/" + m;
        player.src = path;
        player.load()
        player.play().catch(err => {
          console.log(err);
        })
        addMusic(p, m)
      }
    };

  function listMusic (playlist : {"music": [string]}) {
    const rows = [];
    if (playlist !== null) {
        console.log("in if")
        console.log(playlist.music)
        const visibleMusics = playlist.music.filter((music: string) => {
            console.log(music)
            if (filter && !music.toLowerCase().includes(filter.toLowerCase())) {
                return false;
            }
            return true;
        });
        for (let music of visibleMusics) {
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
    <div className="border-solid border-3 ml-6 mr-6 bg-slate-900">
        {playlist ? listMusic(playlist) : 'Loading...'}
    </div>
 )
}

export default Musics