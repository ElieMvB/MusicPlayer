import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Musics from "./components/Musics";
import { SearchBar } from "./components/SearchBar";
import { useAppContext } from "./components/AppContext";
import home from "./assets/home.svg";

function Playlist() {
  const params = useParams();
  const playlist = String(params.parameter);
  let title = playlist;
  title = title.charAt(0).toUpperCase() + title.slice(1);

  const [data, setData] = useState<{ music: string[] } | null>(null);
  const [search, setSearch] = useState("");

  const {
    setMusics,
    setCurrentMusic,
    setCurrentPlaylist,
    setNumberMusics,
    setOldMusics,
  } = useAppContext();

  useEffect(() => {
    fetch("http://localhost:5000/music/" + playlist)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  function playMusic(music: string) {
    const player = document.getElementById("player") as HTMLAudioElement;
    if (music !== null) {
      const textC = document.getElementById("pauseButtonTextComputer");
      if (textC !== null) {
        textC.innerHTML = "||";
      }
      const textP = document.getElementById("pauseButtonTextPhone");
      if (textP !== null) {
        textP.innerHTML = "||";
      }
      const path = "./music/" + playlist + "/" + music;
      player.src = path;
      player.load();
      player.play().catch((err) => {
        console.log(err);
      });
    }
  }

  function playPlaylist() {
    if (data !== null) {
      setMusics(data.music);
      setCurrentMusic(0);
      setOldMusics([{ music: data.music[0], playlist: playlist }]);
      setNumberMusics(0);
      setCurrentPlaylist(playlist);
      playMusic(data.music[0]);
    }
  }

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
      <div
        className="fixed sm:left-5 sm:top-5 left-3 top-3 absolute sm:w-12 sm:h-12 w-9 h-9 bg-lime-400 rounded-full tracking-wide

            shadow-[0_0_30px_rgba(163,230,53,0.35)]

            transition-all duration-300
            hover:scale-105
            hover:shadow-[0_0_40px_rgba(163,230,53,0.55)]
            active:scale-95"
      >
        <NavLink to="./.." className="flex justify-center h-full">
          <img src={home} className="w-[60%]" />
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
            {title}
          </span>
        </h1>
      </div>

      {/* Main Content */}
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
    "
      >
        {/* Play Button */}
        <div className="flex justify-center mb-8">
          <button
            className="
            group
            relative
            overflow-hidden

            px-8 py-4
            rounded-2xl

            bg-gradient-to-r
            from-lime-400
            to-lime-300

            text-black
            font-bold
            tracking-wide

            shadow-[0_0_30px_rgba(163,230,53,0.35)]

            transition-all duration-300
            hover:scale-105
            hover:shadow-[0_0_40px_rgba(163,230,53,0.55)]
            active:scale-95
          "
            onClick={playPlaylist}
          >
            <span className="relative z-10 flex items-center gap-3">
              <span className="mr-2">&#9655;</span> Lancer la playlist !
            </span>

            <div
              className="
            absolute inset-0
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300

            bg-gradient-to-r
            from-white/20
            to-transparent
          "
            />
          </button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar
            value={search}
            placeholder="Rechercher une musique..."
            onChange={setSearch}
          />
        </div>

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
            Musiques
          </h1>
        </div>

        {/* Music List */}
        <div>
          {data ? (
            <Musics playlist={data} filter={search} />
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
  );
}

export default Playlist;
