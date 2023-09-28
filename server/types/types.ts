import { ObjectId, UUID } from "mongodb";

export type Post = {
  _id: ObjectId;
  postId: string;
  authorId: string;
  title: string;
  content: string;
  tags: string[];
  creationDate: string;
  feedbackPostId: string;
};

export type User = {
  userId: string;
  name: string;
  username: string;
  password: string;
  email: string;
  favoriteTags: string[];
  likesArticlesIds: string[];
};

export type FeedbackPost = {
  _id: ObjectId;
  postId: string;
  likedUsers: string[];
  dislikedUsers: string[];
};
