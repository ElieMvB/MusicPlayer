import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ModifyMusics from "./components/modifyData/ModifyMusics";
import { SearchBar } from "./components/SearchBar";
import back from "./assets/return.svg";
import folder from './assets/folder.svg';
import { UploadFile } from "./components/modifyData/UploadFileToPlaylist";

function ModifyPlaylist() {
  const params = useParams();
  const playlist = String(params.parameter);
  let title = playlist;
  title = title.charAt(0).toUpperCase() + title.slice(1);

  const [currentData, setCurrentData] = useState<{ music: string[] } | null>(null);
  const [fullData, setFullData] = useState<{ music: string[] } | null>(null);
  const [search, setSearch] = useState("");
  const [searchInPlaylist, setSearchInPlaylist] = useState("");

  useEffect(() => {
    console.log('render');
    fetch(import.meta.env.VITE_BASE_URL + "/musics/" + playlist)
      .then((response) => response.json())
      .then((json) => {
        setCurrentData(json);
      })
      .catch((error) => console.error(error));

    fetch("http://localhost:3000/musics")
      .then((response) => response.json())
      .then((json) => {
        setFullData(json);
      })
      .catch((error) => console.error(error));
  }, [playlist]);

  return (
    <div
      className="
    min-h-screen
    bg-gradient-to-br
    from-purple-950
    to-slate-900
    text-white
    pb-40
  "
    >
      <UploadFile pName={playlist} pMusics={currentData} setPMusics={setCurrentData}/>
      <div
        className="fixed sm:left-5 sm:top-5 left-3 top-3 absolute sm:w-12 sm:h-12 w-9 h-9 bg-lime-400 rounded-full tracking-wide

            shadow-[0_0_30px_rgba(163,230,53,0.35)]

            transition-all duration-300
            hover:scale-105
            hover:shadow-[0_0_40px_rgba(163,230,53,0.55)]
            active:scale-95"
      >
        <NavLink to="/dashboard" className="flex justify-center h-full">
          <img src={back} className="w-[60%]" />
        </NavLink>
      </div>

      {/* Header */}
      <div className="pt-14 pb-10 px-4 text-center">
        <h1
          className="
        font-black
        tracking-tight
        drop-shadow-2xl

        md:text-6xl
        sm:text-4xl
        text-2xl
      "
        >
          <span className="bg-gradient-to-r from-fuchsia-400 to-purple-300 bg-clip-text text-transparent">
            {'Modifier la playlist "' + title + '"'}
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-2">
        {/* La Playlist */}
        <div
          className="
        mx-auto
        w-[95%]
        max-w-6xl
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-sm
        shadow-2xl
        p-5 sm:p-8
        col-span-1
      "
        >

          {/* Music Title */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="
            w-3 h-3
            rounded-full
            bg-lime-400
            shadow-[0_0_12px_rgba(163,230,53,0.9)]
          "
            />

            <h1
              className="
            lg:text-4xl
            md:text-3xl
            sm:text-2xl
            text-xl

            font-bold
            tracking-wide
            text-white
          "
            >
              La playlist
            </h1>
            <div
              className="absolute right-[5%] sm:w-12 sm:h-12 w-5 h-9 bg-lime-400 rounded-full tracking-wide

                  shadow-[0_0_30px_rgba(163,230,53,0.35)]

                  transition-all duration-300
                  hover:scale-105
                  hover:shadow-[0_0_40px_rgba(163,230,53,0.55)]
                  active:scale-95"
            >
              <button
                className="flex justify-center h-full"
                onClick={() => {
                  const menu = document.getElementById('uploadFileMenu');
                  if (menu !== null) {
                    menu.toggleAttribute('hidden');
                  }
                }}
              >
                <img src={folder} className="w-[60%]" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-8">
            <SearchBar
              value={searchInPlaylist}
              placeholder="Rechercher une musique..."
              onChange={setSearchInPlaylist}
            />
          </div>

          {/* Music List */}
          <div>
            {currentData ? (
              <ModifyMusics
                playlist={currentData}
                setPlaylist={setCurrentData}
                filter={searchInPlaylist}
                otherMusics={fullData ? fullData : { music: [] }}
                modifyOtherMusic={setFullData}
                buttonType="✗"
              />
            ) : (
              <div
                className="
              flex justify-center items-center
              py-12
              text-slate-300
              animate-pulse
              text-lg
            "
              >
                Loading...
              </div>
            )}
          </div>
        </div>

        {/* Toutes les musiques */}
        <div
          className="
        mx-auto
        w-[95%]
        max-w-6xl
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-sm
        shadow-2xl
        p-5 sm:p-8
        col-span-1
      "
        >

          {/* Music Title */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="
            w-3 h-3
            rounded-full
            bg-lime-400
            shadow-[0_0_12px_rgba(163,230,53,0.9)]
          "
            />

            <h1
              className="
            lg:text-4xl
            md:text-3xl
            sm:text-2xl
            text-xl

            font-bold
            tracking-wide
            text-white
          "
            >
              Toutes les musiques
            </h1>
          </div>

          {/* Search */}
          <div className="mb-8">
            <SearchBar
              value={search}
              placeholder="Rechercher une musique..."
              onChange={setSearch}
            />
          </div>

          {/* Music List */}
          <div>
            {fullData ? (
              <ModifyMusics
                playlist={fullData}
                setPlaylist={setFullData}
                filter={search}
                otherMusics={currentData ? currentData : { music: [] }}
                modifyOtherMusic={setCurrentData}
                buttonType="+"
              />
            ) : (
              <div
                  className="
              flex justify-center items-center
              py-12
              text-slate-300
              animate-pulse
              text-lg
            "
              >
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default ModifyPlaylist;
