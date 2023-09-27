import { createContext } from "react";
import { Post } from "../types/types";

// Define the type for your context data
export type AppContextData = {
  onCreatePost: (newPost: Post) => void;
  post?: Post;
};

const AppContext = createContext<AppContextData | undefined>(undefined);

export default AppContext;
