import { useAppContext } from "./../AppContext";
import { useParams } from "react-router-dom";


function ModifyMusics({
  playlist,
  setPlaylist,
  filter,
  buttonType,
  otherMusics,
  modifyOtherMusic,
}: {
    playlist: { music: string[] };
    setPlaylist: React.Dispatch<React.SetStateAction<{ music: string[] } | null>>
    filter: string;
    buttonType: string;
    otherMusics: { music: string[] };
    modifyOtherMusic: React.Dispatch<React.SetStateAction<{ music: string[] } | null>>
  }) {

  const params = useParams();
  const playlistName = String(params.parameter);
  const { jwtToken } = useAppContext();

  function removeMusic(music: string) {
    fetch(import.meta.env.VITE_BASE_URL + '/music/remove?playlistName=' + playlistName + '&musicName=' + music, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + jwtToken,
      }
    })
      .then(() => {
        playlist.music.splice(playlist.music.indexOf(music), 1);
        setPlaylist({ music: playlist.music })
        modifyOtherMusic({ music: [...new Set([...otherMusics.music, music])] })
      })
  }

  function addMusic(music: string) {
    fetch(import.meta.env.VITE_BASE_URL + '/music/add?playlistName=' + playlistName + '&musicName=' + music, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + jwtToken,
      },
    })
      .then(() => {
        playlist.music.splice(playlist.music.indexOf(music), 1);
        setPlaylist({ music: playlist.music })
        otherMusics.music.push(music);
        modifyOtherMusic({ music: otherMusics.music });
      })
  }

  function listMusic(musics: string[]) {
    const rows = [];
    if (playlist !== null) {
      const visibleMusics = musics.filter((music: string) => {
        if (filter && !music.toLowerCase().includes(filter.toLowerCase())) {
          return false;
        }
        if (buttonType == '+') {
          return !otherMusics.music.includes(music);
        }
        return true;
      });
      for (const music of visibleMusics.sort()) {
        rows.push(
          <div
            key={music}
            id={music + 'playlist'}
            className="sm:text-2xl text-sm m-3 border-solid border-2
                      cursor-pointer grid grid-cols-8"
          >
            <h1 className="m-2 col-span-7">{music.slice(0, -4)}</h1>
            <button
              className="border-2 border-white hover:border-purple-500 m-1 rounded-md"
              onClick={() => {
                if (buttonType === '✗') {
                  removeMusic(music);
                } else {
                  addMusic(music);
                }
              }}
            >
              {buttonType}
            </button>
          </div>,
        );
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
      h-75 w-full overflow-y-auto
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

      <div className="p-4 sm:p-6" id={'listeMusiquesType' + buttonType}>
        {playlist ? (
          listMusic(playlist.music)
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

export default ModifyMusics;
