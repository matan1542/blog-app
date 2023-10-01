import React, { FC } from "react";
import { Button } from "@mui/material";
import { useAuth } from "../Auth";

import style from "./style.module.scss";
import { useLocation } from "react-router-dom";

const AuthActionBtns: FC<{
  isAuthenticated: boolean;
  login: () => void;
  signup: () => void;
}> = ({ isAuthenticated, login, signup }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  const shouldRenderLogin = pathname !== "/login";
  const shouldRenderSignup = pathname !== "/signup";

  return (
    <div className={style.authContainer}>
      {isAuthenticated ? (
        // If the user is authenticated, show the Logout button
        <Button
          variant="contained"
          color="primary"
          onClick={(ev: React.MouseEvent<HTMLElement>) => {
            ev.stopPropagation();
            logout();
          }}
        >
          Logout
        </Button>
      ) : (
        // If the user is not authenticated, show the Login and Signup buttons
        <>
          {shouldRenderLogin && (
            <Button
              variant="contained"
              color="primary"
              onClick={(ev: React.MouseEvent<HTMLElement>) => {
                ev.stopPropagation();
                login();
              }}
            >
              Login
            </Button>
          )}
          {shouldRenderSignup && (
            <Button
              variant="contained"
              color="secondary"
              onClick={(ev: React.MouseEvent<HTMLElement>) => {
                ev.stopPropagation();
                signup();
              }}
            >
              Signup
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default AuthActionBtns;
