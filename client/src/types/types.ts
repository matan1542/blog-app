export type Post = {
  postId?: string;
  authorId?: string;
  authorName: string;
  title: string;
  content: string;
  tags: string[];
  creationDate: string;
  likedUsers?: number;
  dislikedUsers?: number;
};

export type User = {
  name: string;
  username: string;
  password: string;
  email: string;
  favoriteTags: string[];
  likesArticlesIds: string[];
  dislikedUsersIds: string[];
};


export type newUser = {
  name: string;
  username: string;
  password: string;
  email: string;
};