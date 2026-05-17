import {useAppContext} from "./AppContext";
import { useEffect, useState } from "react";

function HomeMusics({filter}: {filter: string}) {
    const [data, setData] = useState<{"musics": {"playlist": string, "musicList": string[]}[]} | null>(null)

    const {numberMusics, setNumberMusics, oldMusics, setOldMusics, currentPlaylist} = useAppContext();

    useEffect(() => {
        fetch("https://music-player-api.martial-van-beek.com/musics")
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error))
    }, [])

    function playMusic (p : string, m : string) {
      const player = document.getElementById("player") as HTMLAudioElement;
      if (m !== null) {
        setNumberMusics(numberMusics + 1);
        const newOldMusics = oldMusics;
        newOldMusics.push({"music": m, "playlist":p});
        setOldMusics(newOldMusics);
        if (currentPlaylist == '') {
          let playerMusicTitle = document.getElementById("musicTitle");
          if (playerMusicTitle !== null) {
            playerMusicTitle.textContent = m.slice(0, -4);
          }
        }
        const path = "./music/" + p + "/" + m;
        player.src = path;
        player.load()
        player.play().catch(err => {
          console.log(err);
        })
      }
    };

  function listMusic () {
    const rows = [];
    if (data !== null) {
      rows.push(
          <div className="sm:text-3xl text-sm flex m-3 border-solid border-2 
                  grid grid-cols-3 gap-1">
              <h1 className="m-2 col-span-2"><strong>Titre</strong></h1>
              <h1 className="m-2 col-span-1"><strong>Playlist</strong></h1>
          </div>
      )
      let keyCount = 0;
      for (let playlist of data.musics){
          const playlistName = playlist.playlist;
          const musics = playlist.musicList;
          const visibleMusics = musics.filter((music: string) => {
              if (filter && !music.toLowerCase().includes(filter.toLowerCase()) 
                                && !playlistName.toLowerCase().includes(filter.toLowerCase())) {
                  return false;
              }
              return true;
          });
          for (let music of visibleMusics.sort()) {
              rows.push(
                  <div key={music + keyCount} className="sm:text-2xl text-sm flex m-3 border-solid border-2 
                      hover:border-purple-500 cursor-pointer grid grid-cols-3 gap-1"
                      onClick={() => {playMusic(playlistName, music)}}
                      >
                      <h1 className="m-2 col-span-2" >{music.slice(0, -4)}</h1>
                      <h1 className="m-2 col-span-1">{playlistName}</h1>
                  </div>
              )
              keyCount = keyCount + 1;
          }
      }
    }
    return rows
    
  }

return (
  <div
    className="
      rounded-3xl
      border border-white/10

      bg-slate-900

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
      {data ? (
        listMusic()
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
    <div className="
      h-[2px]
      w-full
      bg-gradient-to-r
      from-transparent
      via-lime-400
      to-transparent
    "/>
  </div>
)
}

export default HomeMusics