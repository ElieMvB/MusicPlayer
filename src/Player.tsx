import { useState } from "react";

function Player() {

    const [musicTitle, setMusicTitle] = useState(null);

    function playMusic (json: {"music": string, "playlist": string}) {
      const current_music = String(json.music)
      const current_playlist = String(json.playlist)
      const player = document.getElementById("player") as HTMLAudioElement;
      if (current_music !== null) {
        const path = "./music/" + current_playlist + "/" + current_music;
        player.src = path;
        player.load()
        player.play().catch(err => {
          console.log(err);
        });
      }
    };

    const nextMusic = async (direction: string) =>  {
        try {
            const res = await fetch('http://music-player-api.martial-van-beek.com/' + direction +'-music', 
                {method: 'GET'}
            )

            const json = await res.json()
            playMusic(json)
        } catch (err) {
            console.error(err)
        }
    }

    const getMusicPlayed = async () => {
        try {
            const res = await fetch('http://music-player-api.martial-van-beek.com/music-played', 
                {method: 'GET'}
            )

            const json = await res.json();
            setMusicTitle(json.music.slice(0, -4));
        } catch (err) {
            console.error(err)
        }
    }

    function beginningMusic () {
        const player = document.getElementById("player")  as HTMLAudioElement
        player.currentTime = 0;
    }

    return (
    <div className="bg-fuchsia-800 w-[100%] h-[15%] fixed absolute bottom-0 2xl:text-3xl lg:text-2xl md:text-xl">
        <div className="mb-2 ml-2">
                <h1>{musicTitle ? musicTitle : "En attente d'une musique..."}</h1>
        </div>
        <div className="w-[95%] grid grid-cols-7">
            <div className="col-span-1 flex justify-center items-center">
                <button className="2xl:w-18 2xl:h-18 lg:w-14 lg:h-14 sm:w-12 sm:h-12 rounded-full bg-violet-600 text-white text-2xl flex items-center text-4xl 
                        justify-center shadow-lg hover:bg-violet-700 hover:text-lime-500 hover:border-lime-500
                        sm:text-3xl text-xl w-8 h-8"
                    onClick={beginningMusic}
                    onDoubleClick={() => nextMusic('previous')}
                    >
                    &lt;
                </button>

            </div>
            <div className="col-span-5 flex justify-center items-center">
                <audio
                id="player"
                className="sm:w-[100%] md:h-[100%] h-[80%]"
                src="./music/HeartOfADancer.mp3"
                controls
                onEnded={() => nextMusic('next')}
                onPlay={getMusicPlayed}
                />
            </div>
            <div className="col-span-1 flex justify-center items-center">
                <button className="2xl:w-18 2xl:h-18 lg:w-14 lg:h-14 sm:w-12 sm:h-12 rounded-full bg-violet-600 text-white text-2xl flex items-center text-4xl 
                        justify-center shadow-lg hover:bg-violet-700 hover:text-lime-500 hover:border-lime-500
                        sm:text-3xl text-xl w-8 h-8"
                    onClick={() => nextMusic('next')}
                    >
                    &gt;
                </button>

            </div>
        </div>
    </div>
    )
}

export default Player
