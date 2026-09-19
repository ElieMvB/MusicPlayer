import { useAppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";

export function LoginMenu() {
  const { setJwtToken, setDateToken, setConnectedUser } = useAppContext();
  const navigate = useNavigate();

  function openCloseConnectMenu() {
    const menu = document.getElementById('loginMenu');
    if (menu !== null) {
      menu.toggleAttribute('hidden');
    }
  }

  function echecConnection() {
    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    if (username !== undefined) {
      username.style.borderColor = 'red';
    }
    if (password !== undefined) {
      password.style.borderColor = 'red';
    }
  }

  return (
    <div
      id="loginMenu"
      className="fixed h-screen w-screen bg-gray-700/80 z-60"
      hidden
    >
      <div className="h-[50%] top-[20%] ml-[35%] mr-[35%] bottom-[20%] bg-white rounded-xl relative ">
        <button
          className="rounded-lg hover:border-gray-500 hover:border w-7 h-7 m-4 absolute right-4"
          onClick={() => { openCloseConnectMenu(); }}
        >
          ✗
        </button>
        <div
          className="absolute left-[5%] right-[5%] top-[20%] bottom-[20%]
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
          className="absolute bottom-[5%] right-[5%] h-[10%] w-[40%]
          bg-purple-900/70 hover:bg-purple-900/80 border border-gray-400 rounded-md"
          onClick={() => {
            const username = document.getElementById('username') as HTMLInputElement;
            const password = document.getElementById('password') as HTMLInputElement;
            if (username !== undefined && password !== undefined) {
              fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  username: username.value,
                  password: password.value
                }),
              })
                .then(response => response.json())
                .then(response => {
                  if (response.acces_token === '' || response.acces_token === undefined) {
                    echecConnection();
                  } else {
                    setJwtToken(response.acces_token);
                    setDateToken(Date.now());
                    setConnectedUser(username.value);
                    openCloseConnectMenu();
                    navigate('dashboard');
                  }
                })
            } else {
              echecConnection();
            }
          }}
        >
          Se Connecter
        </button>
      </div>
    </div>
  )
}

export function EditButton() {
  const navigate = useNavigate();
  const { jwtToken, dateToken } = useAppContext();
  return (
    <div className="absolute right-[2%] top-[2%]">
      <button
        className="border-white/30 border rounded-full w-10 h-10 bg-white/20 hover:bg-white/50 "
        onClick={() => {
          if (jwtToken === '' || (Date.now() - dateToken > 900000)) {
            const menu = document.getElementById('loginMenu');
            if (menu !== null) {
              const username = document.getElementById('username') as HTMLInputElement;
              const password = document.getElementById('password') as HTMLInputElement;
              if (username !== undefined) {
                username.style.borderColor = 'white';
              }
              if (password !== undefined) {
                password.style.borderColor = 'white';
              }
              menu.removeAttribute('hidden');
            }
          } else {
            navigate('dashboard');
          }
        }}
      >
        🛠
      </button>
    </div>
  )
}
