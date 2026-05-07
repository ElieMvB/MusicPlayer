import Playlists from "./components/Playlists";

function Home() {

  

return (
    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-purple-950
      to-fuchsia-950
      text-white
      pb-32
    ">
      
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
          <span className="bg-gradient-to-r from-fuchsia-400 via-purple-300 to-lime-300 bg-clip-text text-transparent">
            Music Player
          </span>
        </h1>
        <a className="
          px-6 py-3 mt-8
          rounded-full
          bg-lime-400/10
          border border-lime-400/20
          text-lime-300
          text-sm md:text-base
          tracking-wider
          shadow-lg
          backdrop-blur-sm
          mb-6
        "
        href="https://github.com/ElieMvB/MusicPlayer"
        target="_blank"
        >
          🎵 Répo GitHub
        </a>
      </div>

      {/* Playlist Section */}
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

        <Playlists />
      </div>
    </div>
  )
}

export default Home
