import Playlists from "./components/playlists";

function Home() {

  

  return (
    <div className="bg-slate-800 h-screen text-purple-700">
      <h1 className="text-center py-10 sm:text-6xl text-3xl"><strong>My Music Player !</strong></h1>
      <div className="lg:ml-10 md:ml-5 ml-2">
        <h1 className="sm:text-4xl text-xl py-6">Playlists :</h1>
        <div className="lg:ml-5 sm:ml-3 ml-1">
          <Playlists/>
        </div>
      </div>
    </div>
  )
}

export default Home
