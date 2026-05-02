import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";

function Playlists() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://192.168.1.18:5000/playlists')
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
    <div >
        {data ? listPlaylists(data) : 'Loading...'}
    </div>
 )
}

export default Playlists
