import axios from "axios";
import { newUser } from "../types/types";

const API_URL = "http://localhost:3000/api/auth";

export { authLogin, authLogout, authSignup };

export type loginType = (credentials: {
  username: string;
  password: string;
}) => Promise<string>;

const authLogin: loginType = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const token = response.data.token;
    localStorage.setItem("jwtToken", token);
    return token;
  } catch (error) {
    throw error;
  }
};

const authSignup = async (user: newUser) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, user);
    const token = response.data.token;
    localStorage.setItem("jwtToken", token);
    return token;
  } catch (error) {
    throw error;
  }
};

const authLogout: () => void = () => {
  // Remove the token cookie when the user logs out
  localStorage.removeItem("jwtToken");
};
