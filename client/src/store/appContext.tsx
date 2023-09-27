import React, { createContext, useState, ReactNode, useContext } from "react";
import AppContext, { AppContextData } from "./contextApp";
import { Post } from "../types/types";

// Create a provider component
type AppProviderProps = {
  children: ReactNode;
};
// Create a context

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [post, setNewPost] = useState<Post | undefined>();

  const onCreatePost = (newPost: Post) => {
    setNewPost(newPost);
  };

  return (
    <AppContext.Provider value={{ onCreatePost, post }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to access the context
export const useAppContext = (): AppContextData => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
