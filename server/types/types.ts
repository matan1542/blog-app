import { ObjectId, UUID } from "mongodb";

export type Post = {
  _id?: ObjectId;
  postId: string;
  authorId: string;
  title: string;
  content: string;
  tags: string[];
  creationDate: string;
  likedUsers: string[];
};
export type User = {
  name: string;
  username: string;
  password: string;
  email: string;
  favoriteTags: string[];
  birthdate: string;
  likesArticlesIds: string[];
};
