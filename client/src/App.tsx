import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NewPost from "./pages/NewPost";

import style from "./styles/app.style.module.scss";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./components/Auth";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div className={style.appContainer}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/new-post"
            element={
              <ProtectedRoute
                element={<NewPost />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
