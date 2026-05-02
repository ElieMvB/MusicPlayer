import { useParams } from "react-router-dom"
import { useState,useEffect } from "react";
import Musics from "./components/musics";
import { SearchBar } from "./components/SearchBar";

function Playlist() {
    const params = useParams();
    const playlist = String(params.parameter);
    let title = playlist.replace(/-/g, " ");
    title = title.charAt(0).toUpperCase() + title.slice(1);

    const [data, setData] = useState(null);
    const [search, setSearch] = useState('')
    
    useEffect(() => {
    fetch('https://music-player-api.martial-van-beek.com/music/' + playlist)
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(error))
    }, [])

    function playMusic (json: {"music": string}) {
      const current = String(json.music)
      const player = document.getElementById("player") as HTMLAudioElement;
      if (current !== null) {
        const path = "./music/" + playlist + "/" + current;
        player.src = path;
        player.load()
        player.play().catch(err => {
          console.log(err);
      })
      }
    };

    const playPlaylist = async () => {
      try {
        const res = await fetch("https://music-player-api.martial-van-beek.com/play/" + playlist, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json()
        playMusic(json)
      } catch (err){
        console.error(err)
      }
    }

  return (
    <div className="bg-slate-800 h-full text-purple-700">
      <h1 className="text-center py-10 md:text-6xl sm:text-3xl text-xl">{title}</h1>
      <div className="flex justify-center">
        <button 
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounde"
          onClick={playPlaylist}
          >
          Lancer la playlist !
        </button>
      </div>
      <div className="w-[80%] sm:ml-10 ml-2">
        <SearchBar 
        value={search} 
        placeholder="Rechercher une musique..." 
        onChange={setSearch}/>
      </div>
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl py-4 ml-4">Musiques :</h1>
      <div>
        {data ? <Musics playlist={data} filter={search}/> : 'Loading...'}
      </div>
      <div className="h-50"/>
    </div>
  )
}

export default Playlist
