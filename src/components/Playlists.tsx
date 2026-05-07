import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";

function Playlists() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://music-player-api.martial-van-beek.com/playlists')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
  }, [])

  function listPlaylists (data : {"playlists": []}) {
    const rows = [];
    if (data !== null) {
        for (let playlist of data.playlists) {
            rows.push(
                <NavLink 
                    to={playlist}
                    className="flex m-3 w-[95%] border-solid border-2 
                        hover:border-purple-500 bg-slate-900 sm:text-2xl text-sm"
                    key={playlist}
                    >
                    <h1 className="m-1">{playlist}</h1>
                </NavLink>
            )
        }
    }
    return rows
    
  }

 return (
    <div>
      {data ? (
        listPlaylists(data)
      ) : (
        <div className="
          flex items-center justify-center
          py-10
          text-slate-300
          text-lg
          animate-pulse
        ">
          Chargement des Playlists...
        </div>
      )}
    </div>
  )
}

export default Playlists
