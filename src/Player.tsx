import { useEffect, useState } from "react";
import { useAppContext } from "./components/AppContext";
import AudioProgress from "./components/AudioProgress";

function Player() {
  const [musicTitle, setMusicTitle] = useState<string | null>(null);
  const [musicPlaylist, setMusicPlaylist] = useState<string | null>(null);
  const {
    musics,
    currentMusic,
    setCurrentMusic,
    currentPlaylist,
    numberMusics,
    setNumberMusics,
    oldMusics,
    setOldMusics,
  } = useAppContext();

  useEffect(() => {
    if (oldMusics.length - 1 >= numberMusics) {
      setMusicTitle(oldMusics[numberMusics].music.slice(0, -4));
      setMusicPlaylist(oldMusics[numberMusics].playlist);
      document.title = oldMusics[numberMusics].music.slice(0, -4);
    } else if (musics.length > 0) {
      setMusicTitle(musics[currentMusic].slice(0, -4));
      setMusicPlaylist(currentPlaylist);
      document.title = musics[currentMusic].slice(0, -4);
    } else {
      setMusicTitle("En attente d'une musique...");
      setMusicPlaylist("En attente d'une playlist...");
      document.title = "My Music Player";
    }
    updateTimer();
  }, [numberMusics, currentMusic, musics, oldMusics, currentPlaylist]);

  function playMusic(json: { music: string; playlist: string }) {
    const current_music = String(json.music);
    const current_playlist = String(json.playlist);
    const player = document.getElementById("player") as HTMLAudioElement;
    if (current_music !== null) {
      const textC = document.getElementById("pauseButtonTextComputer");
      if (textC !== null) {
        textC.innerHTML = "||";
      }
      const textP = document.getElementById("pauseButtonTextPhone");
      if (textP !== null) {
        textP.innerHTML = "||";
      }
      const path = "./music/" + current_playlist + "/" + current_music;
      player.src = path; //requete au site à ce moment là
      player.load();
      player.play().catch((err) => {
        console.log(err);
      });
    }
  }

  function nextMusic() {
    if (currentPlaylist != "") {
      if (oldMusics.length - 2 >= numberMusics) {
        setNumberMusics(numberMusics + 1);
        setMusicTitle(oldMusics[numberMusics + 1].music.slice(0, -4));
        playMusic(oldMusics[numberMusics + 1]);
      } else {
        const newOldMusics = oldMusics;

        if (currentMusic == musics.length - 1) {
          setCurrentMusic(0);
          newOldMusics.push({ music: musics[0], playlist: currentPlaylist });
          setOldMusics(newOldMusics);
          setNumberMusics(numberMusics + 1);
          setMusicTitle(musics[0].slice(0, -4));
          playMusic({ music: musics[0], playlist: currentPlaylist });
        } else {
          newOldMusics.push({
            music: musics[currentMusic + 1],
            playlist: currentPlaylist,
          });
          setOldMusics(newOldMusics);
          setNumberMusics(numberMusics + 1);
          setCurrentMusic(currentMusic + 1);
          setMusicTitle(musics[currentMusic + 1].slice(0, -4));
          playMusic({
            music: musics[currentMusic + 1],
            playlist: currentPlaylist,
          });
        }
      }
    }
  }

  function previousMusic() {
    if (numberMusics <= 0) {
      beginningMusic();
    } else {
      setNumberMusics(numberMusics - 1);
      setMusicTitle(oldMusics[numberMusics - 1].music.slice(0, -4));
      playMusic(oldMusics[numberMusics - 1]);
    }
  }

  function beginningMusic() {
    const player = document.getElementById("player") as HTMLAudioElement;
    player.currentTime = 0;
  }

  function pausePlayMusic() {
    const player = document.getElementById("player") as HTMLAudioElement | null;
    const textPhone = document.getElementById("pauseButtonTextPhone");
    const textComputer = document.getElementById("pauseButtonTextComputer");
    if (player !== null && textPhone !== null) {
      if (player.readyState === 4) {
        if (player.paused) {
          textPhone.innerHTML = "||";
        } else {
          textPhone.innerHTML = "&#9655;";
        }
      }
      if (player !== null && textComputer !== null) {
        if (player.paused) {
          player.play();
          textComputer.innerHTML = "||";
        } else {
          player.pause();
          textComputer.innerHTML = "&#9655;";
        }
      }
    }
  }

  function updateTimer() {
    const player = document.getElementById("player") as HTMLAudioElement;
    const currentC = document.getElementById("currentTimeComputer");
    const finalC = document.getElementById("endTimeComputer");
    const currentP = document.getElementById("currentTimePhone");
    const finalP = document.getElementById("endTimePhone");
    if (
      player !== null &&
      currentC !== null &&
      finalC !== null &&
      currentP !== null &&
      finalP !== null
    ) {
      if (player.readyState === 4) {
        const numToStr = (num: number) => {
          if (num <= 9) {
            return "0" + num;
          }
          return String(num);
        };
        currentC.innerText =
          numToStr(
            Math.round((player.currentTime - (player.currentTime % 60)) / 60),
          ) +
          ":" +
          numToStr(Math.round(player.currentTime % 60)) +
          "/";
        currentP.innerText = currentC.innerText;
        finalC.innerText =
          numToStr(
            Math.round((player.duration - (player.duration % 60)) / 60),
          ) +
          ":" +
          numToStr(Math.round(player.duration % 60));
        finalP.innerText = finalC.innerText;
      }
    }
  }

  return (
    <div className="fixed bottom-0 left-0 w-full border-t border-fuchsia-500/20 bg-gradient-to-r from-slate-900 via-fuchsia-900 to-violet-950 backdrop-blur-md shadow-2xl sm:px-4 px-3 py-3 z-50">
      {/* Title */}
      <div className="mb-3 flex items-center justify-between">
        <div className="overflow-hidden">
          <h1
            id="musicTitle"
            className="truncate font-semibold text-white tracking-wide
          2xl:text-3xl lg:text-2xl md:text-xl text-sm"
          >
            {musicTitle ? musicTitle : "En attente d'une musique..."}
          </h1>

          <p className="text-fuchsia-200/70 text-xs md:text-sm">
            {musicPlaylist
              ? "Playlist de la musique : " + musicPlaylist
              : "En attente d'une playlist..."}
          </p>
        </div>
      </div>

      {/* Controls for big screens*/}
      <div className="grid grid-cols-10 gap-3 items-center">
        {/* Previous */}
        <div className="col-span-1 flex justify-center sm:block hidden">
          <button
            className="
            group
            flex items-center justify-center
            rounded-full
            bg-white/10
            border border-white/10
            text-white
            transition-all duration-200
            hover:bg-lime-400
            hover:text-black
            hover:scale-105
            active:scale-95
            shadow-lg

            2xl:w-18 2xl:h-18
            lg:w-14 lg:h-14
            sm:w-12 sm:h-12
            w-10 h-10
          "
            onClick={previousMusic}
          >
            <span className="2xl:text-3xl lg:text-2xl text-lg font-bold">
              ≪
            </span>
          </button>
        </div>

        {/* Restart */}
        <div className="col-span-1 flex justify-center sm:block hidden">
          <button
            className="
            group
            flex items-center justify-center
            rounded-full
            bg-white/10
            border border-white/10
            text-white
            transition-all duration-200
            hover:bg-cyan-400
            hover:text-black
            hover:scale-105
            active:scale-95
            shadow-lg

            2xl:w-18 2xl:h-18
            lg:w-14 lg:h-14
            sm:w-12 sm:h-12
            w-10 h-10
          "
            onClick={beginningMusic}
          >
            <span className="2xl:text-3xl lg:text-2xl text-lg font-bold">
              ↺
            </span>
          </button>
        </div>

        {/*Pause */}
        <div className="col-span-1 flex justify-center sm:block hidden">
          <button
            className="
            group
            flex items-center justify-center
            rounded-full
            bg-white/10
            border border-white/10
            text-white
            transition-all duration-200
            hover:bg-cyan-400
            hover:text-black
            hover:scale-105
            active:scale-95
            shadow-lg

            2xl:w-18 2xl:h-18
            lg:w-14 lg:h-14
            sm:w-12 sm:h-12
            w-10 h-10
          "
            onClick={pausePlayMusic}
          >
            <span
              id="pauseButtonTextComputer"
              className="2xl:text-3xl lg:text-2xl text-lg font-bold"
            >
              &#9655;
            </span>
          </button>
        </div>

        {/* Audio Player */}
        <div className="sm:col-span-5 col-span-10 flex items-center justify-center">
          <div
            className="
          w-full
          sm:rounded-2xl
          rounded-lg
          bg-black/20
          border border-white/10
          sm:px-3 px-1 sm:py-2 py-1
          shadow-inner
        "
          >
            <audio
              id="player"
              className="w-full h-10 hidden"
              src="./music/HeartOfADancer.mp3"
              onTimeUpdate={updateTimer}
              onEnded={() => nextMusic()}
            />
            <AudioProgress />
          </div>
        </div>

        {/*timer */}
        <div
          className="text-lg text-white flex flex-col col-span-1 sm:block hidden"
          id="timerComputer"
        >
          <span id="currentTimeComputer">00:00/</span>
          <br />
          <span id="endTimeComputer">00:00</span>
        </div>

        {/* Next */}
        <div className="col-span-1 flex sm:block hidden">
          <button
            className="
            group
            flex items-center justify-center
            rounded-full
            bg-white/10
            border border-white/10
            text-white
            transition-all duration-200
            hover:bg-lime-400
            hover:text-black
            hover:scale-105
            active:scale-95
            shadow-lg

            2xl:w-18 2xl:h-18
            lg:w-14 lg:h-14
            sm:w-12 sm:h-12
            w-10 h-10
          "
            onClick={() => nextMusic()}
          >
            <span className="2xl:text-3xl lg:text-2xl text-lg font-bold">
              ≫
            </span>
          </button>
        </div>
      </div>

      {/* Controls for phones */}
      <div className="sm:hidden grid grid-cols-5 gap-3 items-center mt-1">
        {/* Previous */}
        <div className="flex justify-center">
          <button
            className="
            group
            flex items-center justify-center
            rounded-full
            bg-white/10
            border border-white/10
            text-white
            transition-all duration-200
            hover:bg-lime-400
            hover:text-black
            hover:scale-105
            active:scale-95
            shadow-lg

            2xl:w-18 2xl:h-18
            lg:w-14 lg:h-14
            sm:w-12 sm:h-12
            w-10 h-10
          "
            onClick={beginningMusic}
            onDoubleClick={previousMusic}
          >
            <span className="2xl:text-3xl lg:text-2xl text-lg font-bold">
              ≪
            </span>
          </button>
        </div>

        {/* Restart */}
        <div className="col-span-1 flex justify-center sm:hidden">
          <button
            className="
            group
            flex items-center justify-center
            rounded-full
            bg-white/10
            border border-white/10
            text-white
            transition-all duration-200
            hover:bg-cyan-400
            hover:text-black
            hover:scale-105
            active:scale-95
            shadow-lg

            2xl:w-18 2xl:h-18
            lg:w-14 lg:h-14
            sm:w-12 sm:h-12
            w-10 h-10
          "
            onClick={beginningMusic}
          >
            <span className="2xl:text-3xl lg:text-2xl text-lg font-bold">
              ↺
            </span>
          </button>
        </div>

        {/*Pause */}
        <div className="col-span-1 flex justify-center sm:hidden">
          <button
            className="
            group
            flex items-center justify-center
            rounded-full
            bg-white/10
            border border-white/10
            text-white
            transition-all duration-200
            hover:bg-cyan-400
            hover:text-black
            hover:scale-105
            active:scale-95
            shadow-lg

            2xl:w-18 2xl:h-18
            lg:w-14 lg:h-14
            sm:w-12 sm:h-12
            w-10 h-10
          "
            onClick={pausePlayMusic}
          >
            <span
              id="pauseButtonTextPhone"
              className="2xl:text-3xl lg:text-2xl text-lg font-bold"
            >
              &#9655;
            </span>
          </button>
        </div>

        {/*timer */}
        <div
          className=" col-span-1 sm:hidden

          group
          flex items-center justify-center
          rounded-lg
          bg-white/10
          border border-white/10
          text-white
          shadow-lg

          2xl:w-18 2xl:h-18
          lg:w-14 lg:h-14
          sm:w-12 sm:h-12
          w-10 h-10
        "
          id="timerPhone"
        >
          <div className="text-xs text-white flex flex-col">
            <span id="currentTimePhone">00:00/</span>
            <span id="endTimePhone">00:00</span>
          </div>
        </div>

        {/* Next */}
        <div className="col-span-1 flex justify-center sm:hidden">
          <button
            className="
            group
            flex items-center justify-center
            rounded-full
            bg-white/10
            border border-white/10
            text-white
            transition-all duration-200
            hover:bg-lime-400
            hover:text-black
            hover:scale-105
            active:scale-95
            shadow-lg

            2xl:w-18 2xl:h-18
            lg:w-14 lg:h-14
            sm:w-12 sm:h-12
            w-10 h-10
          "
            onClick={() => nextMusic()}
          >
            <span className="2xl:text-3xl lg:text-2xl text-lg font-bold">
              ≫
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
