import { useAppContext } from "./AppContext";
import { useEffect, useState } from "react";

function HomeMusics({ filter }: { filter: string }) {
  const [data, setData] = useState < {
    music: string[]; paths: string[];
  } | null>(null);

  const {
    numberMusics,
    setNumberMusics,
    oldMusics,
    setOldMusics,
    currentPlaylist,
    musicPaths,
    setMusicPaths,
  } = useAppContext();

  useEffect(() => {
    fetch( import.meta.env.VITE_BASE_URL + "/musics")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        const paths = new Map<string, string>
        for (let i = 0; i < json.music.length; i = i + 1) {
          paths.set(json.music[i], json.paths[i]);
        }
        setMusicPaths(paths);
      })
      .catch((error) => console.error(error));
  }, [setMusicPaths]);

  function playMusic(m: string) {
    const player = document.getElementById("player") as HTMLAudioElement;
    if (m !== null) {
      setNumberMusics(numberMusics + 1);
      const newOldMusics = oldMusics;
      newOldMusics.push({ music: m, playlist: 'Direct play !' });
      setOldMusics(newOldMusics);
      if (currentPlaylist == "") {
        const playerMusicTitle = document.getElementById("musicTitle");
        if (playerMusicTitle !== null) {
          playerMusicTitle.textContent = m;
        }
      }
      const path = musicPaths.get(m);
      if (path !== undefined) {
        player.src = path;
      } else {
        player.src = '';
      }
      player.load();
      player.play().catch((err) => {
        console.log(err);
      });
    }
  }

  function listMusic() {
    const rows = [];
    if (data !== null) {
      let keyCount = 0;
      const musics = data.music;
      const visibleMusics = musics.filter((music: string) => {
        if (
          filter &&
          !music.toLowerCase().includes(filter.toLowerCase())
        ) {
          return false;
        }
        return true;
      });
      for (const music of visibleMusics.sort()) {
        rows.push(
          <div
            key={music + keyCount}
            className="sm:text-2xl text-sm flex m-3 border-solid border-2
                    hover:border-purple-500 cursor-pointer"
            onClick={() => {
              playMusic(music);
            }}
          >
            <h1 className="m-2">{music.slice(0, -4)}</h1>
          </div>,
        );
        keyCount = keyCount + 1;
      }
    }
    return rows;
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
      <div
        className="
      h-[2px]
      w-full
      bg-gradient-to-r
      from-transparent
      via-lime-400
      to-transparent
    "
      />

      <div className="p-4 sm:p-6">
        {data ? (
          listMusic()
        ) : (
          <div
            className="
          py-10
          text-center
          text-slate-300
          animate-pulse
        "
          >
            Chargement des Musiques...
          </div>
        )}
      </div>
      <div
        className="
      h-[2px]
      w-full
      bg-gradient-to-r
      from-transparent
      via-lime-400
      to-transparent
    "
      />
    </div>
  );
}

export default HomeMusics;
