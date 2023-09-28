import axios from "axios";
import { Post } from "../types/types";

const API_URL = "http://localhost:3000/api/posts";

export { getPosts, createPost, likePost, dislikePost };

const likePost = async (postId: string) => {
  const token = localStorage.getItem("jwtToken");
  axios.defaults.headers.common["Authorization"] = token;
  const response = await axios.post(`${API_URL}/${postId}/like`);
  return response.data;
};

const dislikePost = async (postId: string) => {
  const token = localStorage.getItem("jwtToken");
  axios.defaults.headers.common["Authorization"] = token;
  const response = await axios.post(`${API_URL}/${postId}/dislike`);
  return response.data;
};

const getPosts = async () => {
  const token = localStorage.getItem("jwtToken");
  axios.defaults.headers.common["Authorization"] = token;
  const response = await axios.get(API_URL);
  return response.data;
};

const createPost = async (newPost: Post) => {
  const response = await axios.post(API_URL, newPost);
  return response.data;
};
