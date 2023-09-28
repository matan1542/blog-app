export type Post = {
  postId?: string;
  authorId?: string;
  authorName: string;
  title: string;
  content: string;
  tags: string[];
  creationDate: string;
  likedUsers?: string[];
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
