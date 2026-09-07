import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Playlist from "./Playlist";
import Player from "./Player";
import { AppProvider } from "./components/AppContext";
import { LoginButton, LoginMenu }  from "./components/Login";

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <>
        <Player/>
        <Outlet/>
      </>,
    children: [
      {
        path: "",
        element:
          <>
            <LoginButton />
            <LoginMenu/>
            <Home />
          </>
      },
      {
        path:":parameter",
        element: <Playlist/>
      }
    ]
  }
])

function App() {

  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App
