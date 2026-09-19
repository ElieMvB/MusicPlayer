import { useState } from "react";
import { useAppContext } from "./../AppContext";
import JSZip from "jszip";
import loading from "../../assets/loading.gif";

export function UploadFile({
    pName,
    pMusics,
    setPMusics,
  }: {
    pName: string,
    pMusics: { music: string[] } | null,
    setPMusics: (e: { music: string[] } | null) => void,
  }) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { jwtToken } = useAppContext();

  function openCloseConnectMenu() {
    const menu = document.getElementById('uploadFileMenu');
    if (menu !== null) {
      menu.toggleAttribute('hidden');
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  const addMusicsFromFile = async () => {
    if (file !== null && pMusics !== null) {
      if (file.name.slice(-3, file.name.length) === 'mp3') {
        setPMusics({music: [...pMusics.music, file.name]});
      } else if (file.name.slice(-3, file.name.length) === 'zip') {
        const arrayBuffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        const newMusicsList: string[] = [];
        zip.forEach((relativePath, zipEntry) => {
          if (!zipEntry.dir) {
            newMusicsList.push(zipEntry.name)
          }
        })
        setPMusics({music: [...pMusics.music, ...newMusicsList]});
      }
    }
  }

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const result = await fetch(import.meta.env.VITE_BASE_URL + '/uploadMusics?playlistName=' + pName, {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + jwtToken,
          },
          body: formData,
        });
        const data = await result.json();
        if (!data || data.statusCode === 401) {
          alert("Une erreur s'est produite lors de l'importation...\n Est-ce que tu est encore bien connecté ? \n Est-ce que tu as bien envoyé un .mp3 ou un .zip?");
        } else {
          await addMusicsFromFile();
          openCloseConnectMenu();
        }
      } catch (error) {
        alert("Une erreur s'est produite lors de l'importation...\n Est-ce que tu est encore bien connecté ?");
        console.log(error);
      }
    }
  }

  return (
    <div
      id="uploadFileMenu"
      className="fixed h-screen w-screen bg-gray-700/80 z-60"
      hidden
    >
      <div className="h-[50%] top-[20%] ml-[35%] mr-[35%] bottom-[20%] bg-white rounded-xl relative ">
        <button
          className="rounded-lg hover:border-gray-500 hover:border w-7 h-7 m-4 absolute right-4 text-black"
          onClick={() => { openCloseConnectMenu(); }}
        >
          ✗
        </button>
        <div
          className="absolute left-[5%] right-[5%] top-[20%] bottom-[20%]
          bg-purple-900/60 rounded-md text-center text-white"
        >
          <h1 className="text-2xl m-[4%]">Charger des musiques</h1>
          <h2>
            Attention à ne pas importer des musiques qui existent déjà!
          </h2>
          <h2 className="text-xl m-[3%]">Importer un  .mp3 ou .zip</h2>
          <input
            id="playlistNameBis"
            type="file"
            className="bg-purple-900/80 rounded-md border border-white/80 hover:bg-purple-800/80"
            onChange={handleFileChange}
          />
          {file && (
            <h2 className="py-2">Nom du fichier chargé: {file.name}</h2>
          )}
        </div>
        <button
          className="absolute bottom-[5%] right-[5%] h-[10%] w-[40%]
          bg-purple-900/70 hover:bg-purple-900/80 border border-gray-400 rounded-md"
          onClick={async () => {
            const buttonImportText = document.getElementById('ImportButton2');
            const loadingGif = document.getElementById('loading2');
            if (!isLoading) {
              setIsLoading(true);
              if (buttonImportText !== null && loadingGif !== null) {
                buttonImportText.toggleAttribute('hidden');
                loadingGif.toggleAttribute('hidden');
              }
              await handleUpload();
              if (buttonImportText !== null && loadingGif !== null) {
                buttonImportText.toggleAttribute('hidden');
                loadingGif.toggleAttribute('hidden');
              }
              setIsLoading(false);
            }
          }}
        >
          <span id="ImportButton2" className="">Importer !</span>
          <img src={ loading } id="loading2" hidden className="h-[80%] mx-auto z-60"/>
        </button>
      </div>
    </div>
  )
}
