// AuthContext.tsx
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { authLogin, authLogout, authSignup } from "../../services/auth.service";
import { newUser } from "../../types/types";

type loginProps = { username: string; password: string };
type loginAuthType = ({ username, password }: loginProps) => Promise<boolean>;
type signupAuthType = (user: newUser) => Promise<boolean>;
type logoutType = () => Promise<void>;

interface AuthContextProps {
  isAuthenticated: boolean;
  login: loginAuthType;
  logout: () => Promise<void>;
  signup: (user: newUser) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const signup: signupAuthType = async (user) => {
    try {
      await authSignup(user);
      // Implement your login logic here, e.g., by verifying JWT
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const login: loginAuthType = async ({ password, username }) => {
    try {
      await authLogin({ password, username });
      // Implement your login logic here, e.g., by verifying JWT
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logout: logoutType = async () => {
    await authLogout();
    // Implement your logout logic here, e.g., clearing JWT
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
