import axios from "axios";
import { Post } from "../types/types";

const API_URL = "http://localhost:3000/api/posts";

export { getPosts, createPost };

const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createPost = async (newPost: Post) => {
  console.log("newPost", newPost);

  const response = await axios.post(API_URL, newPost);
  return response.data;
};
