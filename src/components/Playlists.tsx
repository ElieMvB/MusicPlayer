import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Playlists({ filter, userName }: { filter: string, userName: string | undefined }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_BASE_URL + "/playlists")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  function listPlaylists(data: { playlists: [] }) {
    const rows = [];
    if (data !== null) {
      const visiblePlaylists: {name: string, owner: string}[] = data.playlists.filter((p: {name: string, owner: string}) => {
        if (
          filter &&
          !p.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) &&
          !p.owner.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
          || (userName && userName !== p.owner)
        ) {
          return false;
        }
        return true;
      });
      for (const playlist of visiblePlaylists) {
        rows.push(
          <NavLink
            to={'playlist/' + playlist.name}
            className="flex m-3 w-[95%] border-solid border-2
                        hover:border-purple-500 bg-slate-900 sm:text-2xl text-sm"
            key={playlist.name}
            id={playlist.name}
          >
            <div className="grid grid-cols-4 w-full">
              <h1 className="m-1 col-span-3">{playlist.name}</h1>
              <h1 className="m-1 col-span-1">{playlist.owner}</h1>
            </div>
          </NavLink>,
        );
      }
    }
    return rows;
  }

  return (
    <div>
      {data ? (
        listPlaylists(data)
      ) : (
        <div
          className="
          flex items-center justify-center
          py-10
          text-slate-300
          text-lg
          animate-pulse
        "
        >
          Chargement des Playlists...
        </div>
      )}
    </div>
  );
}

export default Playlists;
