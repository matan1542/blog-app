import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterPanel from "../FilterPanel";
import style from "./style.module.scss";
import { useAuth } from "../Auth";
import AuthActionBtns from "../AuthActionBtns";

const Header = () => {
  const router = useNavigate();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  const login = () => {
    router("/login");
  };

  const signup = () => {
    router("/signup");
  };

  const directToHome = () => {
    router("/");
  };

  // Conditionally render the FilterPanel based on the current path
  const shouldRenderFilterPanel = pathname !== "/new-post" && isAuthenticated;

  return (
    <header className={style.headerContainer}>
      <img
        src="media/icons/medium-logo.svg"
        alt="company logo"
        onClick={directToHome}
      />
      <div className={style.actionBtnsContainer}>
        {shouldRenderFilterPanel && <FilterPanel />}
        <AuthActionBtns
          login={login}
          signup={signup}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </header>
  );
};

export default Header;
