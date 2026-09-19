import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Playlist from "./Playlist";
import Player from "./Player";
import { AppProvider } from "./components/AppContext";
import { LoginMenu, EditButton } from "./components/Login";
import Dashboard from "./Dashboard";
import ModifyPlaylist from "./ModifyPlaylist";

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
            <EditButton/>
            <LoginMenu/>
            <Home />
          </>
      },
      {
        path: "playlist",
        children: [
          {
            path:":parameter",
            element: <Playlist/>
          }
        ]
      },
      {
        path: "dashboard",
        children: [
          {
            path: "",
            element: <Dashboard />
          },
          {
            path: 'playlist',
            children: [
              {
                path: ":parameter",
                element: <ModifyPlaylist/>
              }
            ]
          }
        ]
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
