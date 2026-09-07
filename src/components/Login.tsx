export function LoginButton() {

  return (
    <div className="absolute right-10 top-5">
      <button
        className="border-white/30 border rounded-full w-10 h-10 bg-white/20 hover:bg-white/50 "
        onClick={() => {
          const menu = document.getElementById('loginMenu');
          if (menu !== null) {
            menu.removeAttribute('hidden');
          }
        }}
      >
        👤
      </button>
    </div>
  )
}

export function LoginMenu() {
  return (
    <div
      id="loginMenu"
      className="fixed h-screen w-screen bg-gray-700/80 z-60"
      hidden
    >
      <div className="h-[80%] top-[10%] ml-[35%] mr-[35%] bottom-[10%] bg-white rounded-xl relative ">
        <button
          className="rounded-lg hover:border-gray-500 hover:border w-7 h-7 m-4 absolute right-4"
          onClick={() => {
            const menu = document.getElementById('loginMenu');
            if (menu !== null) {
              menu.toggleAttribute('hidden');
            }
          }}
        >
          ✗
        </button>
        <div
          className="absolute left-[5%] right-[5%] top-[10%] bottom-[10%]
          bg-purple-900/60 rounded-md text-center text-white"
        >
          <h1 className="text-2xl m-[4%]">Se Connecter</h1>
          <h2 className="text-xl m-[3%]">Nom d'utilisateur</h2>
          <input
            id="username"
            type="text"
            className="bg-purple-900/80 rounded-md border border-white/80 hover:bg-purple-800/80"
          />
          <h2 className="text-xl m-[3%]">Mot de passe</h2>
          <input
            id="password"
            type="password"
            className="bg-purple-900/80 rounded-md border border-white/80 hover:bg-purple-800/80"
          />
        </div>
        <button
          className="absolute bottom-[2%] right-[5%] h-[7%] w-[40%]
          bg-purple-900/70 hover:bg-purple-900/80 border border-gray-400 rounded-md"
        >
          Se Connecter
        </button>
      </div>
    </div>
  )
}
