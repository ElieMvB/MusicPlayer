import { useState } from "react";
import { NavLink } from "react-router-dom";
import HomeMusics from "./components/HomeMusics";
import Playlists from "./components/Playlists";
import { SearchBar } from "./components/SearchBar";
import home from './assets/home.svg';
import plus from './assets/plus.svg';
import delBut from './assets/delete.svg';
import folder from './assets/folder.svg';
import { CreatePlaylist } from "./components/modifyData/CreatePlaylist";
import { DeletePlaylist } from "./components/modifyData/DeletePlaylist";
import { UploadFile } from "./components/modifyData/UploadFile";
import { useAppContext } from "./components/AppContext";

function Dashboard() {
  const [search, setSearch] = useState("");
  const { connectedUser } = useAppContext();

  return (
    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      to-purple-950
      text-white
      pb-32
    ">
      <UploadFile />
      <DeletePlaylist/>
      <CreatePlaylist/>
      <div
        className="fixed sm:left-5 sm:top-5 left-3 top-3 absolute sm:w-12 sm:h-12 w-9 h-9 bg-lime-400 rounded-full tracking-wide

            shadow-[0_0_30px_rgba(163,230,53,0.35)]

            transition-all duration-300
            hover:scale-105
            hover:shadow-[0_0_40px_rgba(163,230,53,0.55)]
            active:scale-95"
      >
        <NavLink to="/" className="flex justify-center h-full">
          <img src={home} className="w-[60%]" />
        </NavLink>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center pt-16 pb-12 px-4">

        <h1 className="
          text-center
          font-black
          tracking-tight
          drop-shadow-2xl

          sm:text-7xl
          text-4xl
        ">
          <span className="text-white">My</span>{" "}
          <span className="text-fuchsia-400"> Music</span>{" "}
          <span className="text-lime-300"> Dashboard</span>
        </h1>
      </div>

      {/* Playlists Section */}
      <div className="
        mx-auto
        w-[95%]
        max-w-6xl
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-md
        shadow-2xl
        p-6 sm:p-10
      ">
        <div className="
          mx-auto
          w-[95%]
          max-w-6xl
          rounded-3xl
          border border-white/10
          bg-white/5
          shadow-2xl
          p-1 sm:p-2
          mb-4
          grid grid-cols-3
          justify-items-center
        ">
          <div
            className="col-span-1 sm:w-12 sm:h-12 w-5 h-9 bg-lime-400 rounded-full tracking-wide

                shadow-[0_0_30px_rgba(163,230,53,0.35)]

                transition-all duration-300
                hover:scale-105
                hover:shadow-[0_0_40px_rgba(163,230,53,0.55)]
                active:scale-95"
          >
            <button
              className="flex justify-center h-full"
              onClick={() => {
                const menu = document.getElementById('createPlaylistMenu');
                if (menu !== null) {
                  menu.toggleAttribute('hidden');
                }
              }}
            >
              <img src={plus} className="w-[60%]" />
            </button>
          </div>
          <div
            className="col-span-1 sm:w-12 sm:h-12 w-5 h-9 bg-lime-400 rounded-full tracking-wide

                shadow-[0_0_30px_rgba(163,230,53,0.35)]

                transition-all duration-300
                hover:scale-105
                hover:shadow-[0_0_40px_rgba(163,230,53,0.55)]
                active:scale-95"
          >
            <button
              className="flex justify-center h-full"
              onClick={() => {
                const menu = document.getElementById('deletePlaylistMenu');
                if (menu !== null) {
                  menu.toggleAttribute('hidden');
                }
              }}
            >
              <img src={delBut} className="w-[60%]" />
            </button>
          </div>
          <div
            className="col-span-1 sm:w-12 sm:h-12 w-5 h-9 bg-lime-400 rounded-full tracking-wide

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
        <div className="mb-8">
          <SearchBar
            value={search}
            placeholder="Rechercher une playlist ou une musique..."
            onChange={setSearch}
          />
        </div>
        <div className="flex items-center gap-3 mb-8">

          <div className="
            w-3 h-3
            rounded-full
            bg-lime-400
            shadow-[0_0_12px_rgba(163,230,53,0.9)]
          "/>

          <h1 className="
            sm:text-4xl
            text-2xl
            font-bold
            tracking-wide
            text-white
          ">
            Playlists
          </h1>
        </div>

        <Playlists filter={search} userName={connectedUser}/>
        {search ?
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="
              w-3 h-3
              rounded-full
              bg-lime-400
              shadow-[0_0_12px_rgba(163,230,53,0.9)]
            "/>

            <h1 className="
              sm:text-4xl
              text-2xl
              font-bold
              tracking-wide
              text-white
            ">
              Musiques cherchées :
            </h1>
          </div>
          <HomeMusics filter={search}/>
        </div>
        : <div/>}
      </div>
    </div>
  )
}

export default Dashboard
