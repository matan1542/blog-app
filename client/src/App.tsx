import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import HomeHeader from "./components/HomeHeader";
import NewPost from "./pages/NewPost";

import style from "./styles/app.style.module.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/new-post",
    element: <NewPost />,
  },
]);

function App() {
  return (
    <div className={style.appContainer}>
      <>
        <RouterProvider router={router} />
      </>
    </div>
  );
}

export default App;
