import { useAppContext } from "./../AppContext";

export function DeletePlaylist() {
  const { jwtToken } = useAppContext();

  function openCloseDeleteMenu() {
    const menu = document.getElementById('deletePlaylistMenu');
    if (menu !== null) {
      menu.toggleAttribute('hidden');
    }
  }

  function del(name: string) {
    fetch(import.meta.env.VITE_BASE_URL + '/playlist/delete?name=' + name, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + jwtToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        openCloseDeleteMenu();
        if (data.statusCode === 401) {
          alert("Tu n'est pas connecté !");
        }
      })
  }

  return (
    <div
      id="deletePlaylistMenu"
      className="fixed h-screen w-screen bg-gray-700/80 z-60"
      hidden
    >
      <div className="h-[50%] top-[20%] ml-[35%] mr-[35%] bottom-[20%] bg-white rounded-xl relative ">
        <button
          className="rounded-lg hover:border-gray-500 hover:border w-7 h-7 m-4 absolute right-4 text-black"
          onClick={() => { openCloseDeleteMenu(); }}
        >
          ✗
        </button>
        <div
          className="absolute left-[5%] right-[5%] top-[20%] bottom-[20%]
          bg-purple-900/60 rounded-md text-center text-white"
        >
          <h1 className="text-2xl m-[4%]">Supprimer une playlist</h1>
          <h2 className="text-xl m-[3%] text-black font-bold">Attention! Cette opération est irréversible! </h2>
          <h2 className="text-xl m-[3%]">Nom de la playlist</h2>
          <input
            id="playlistNameToDelete"
            type="text"
            className="bg-purple-900/80 rounded-md border border-white/80 hover:bg-purple-800/80"
          />
        </div>
        <button
          className="absolute bottom-[5%] right-[5%] h-[10%] w-[40%]
          bg-purple-900/70 hover:bg-purple-900/80 border border-gray-400 rounded-md"
          onClick={() => {
            const playlistName = document.getElementById('playlistNameToDelete') as HTMLInputElement;
            if (playlistName !== undefined && playlistName.value !== '') {
              del(playlistName.value);
              const delPlay = document.getElementById(playlistName.value);
              delPlay?.setAttribute('hidden', 'true');
            } else {
              alert('Echec lors de la supression de la playlist.\n Est-ce que vous êtes encore bien connecté ?');
              openCloseDeleteMenu();
            }
          }}
        >
          Supprimer...
        </button>
      </div>
    </div>
  )
}
