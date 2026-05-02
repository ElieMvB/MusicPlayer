import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Home from "./Home"
import Playlist from "./playlist"
import Player from "./Player"

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
        element: <Home/>
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
    <RouterProvider router={router} />
  )
}

export default App
