export type Post = {
  authorId: string;
  title: string;
  content: string;
  tags: string[];
  creationDate: string;
  amountOfLikes: number;
};
export type User = {
  name: string;
  username: string;
  password: string;
  email: string;
  birthdate: string;
  likesArticlesIds: string[];
};
