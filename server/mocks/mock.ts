import { ObjectId } from "mongodb";
import { Post, User } from "../types/types";

export { postsMockData, usersMockData };
const postsMockData: Post[] = [
  {
    _id: new ObjectId("b3813e27-2311-48e9-9e93-8c5c14133ec5"),
    postId: "b3813e27-2311-48e9-9e93-8c5c14133ec5",
    authorId: "8ce35d83-795c-4a43-8591-0ee2db93992d",
    title: "basketball",
    content: "asfasfdskfnsdjkfsndbfjksdbfjkhsdbfscdjkbfsjkbfdj",
    tags: ["basketball", "sports"],
    creationDate: "2022-05-05T00:00:00.000Z",
    likedUsers: ["0dcb8463-bc88-4288-bee0-baf260fd62d6"],
  },
  {
    _id: new ObjectId("f5ab781f-928c-4849-b2ad-128fb13dc8da"),
    postId: "f5ab781f-928c-4849-b2ad-128fb13dc8da",
    authorId: "0dcb8463-bc88-4288-bee0-baf260fd62d6",
    title: "soccer",
    content: "123123124234234",
    tags: ["soccer", "sports"],
    creationDate: "2022-05-05T00:00:00.000Z",
    likedUsers: [],
  },

  {
    _id: new ObjectId("0e9b77b3-5453-49b6-8113-1755f844155f"),
    postId: "0e9b77b3-5453-49b6-8113-1755f844155f",
    authorId: "8ce35d83-795c-4a43-8591-0ee2db93992d",
    title: "wix life",
    content: "about to finish kickstarting wix",
    tags: ["wix", "web"],
    creationDate: "2022-05-05T00:00:00.000Z",
    likedUsers: [
      "8ce35d83-795c-4a43-8591-0ee2db93992d",
      "0dcb8463-bc88-4288-bee0-baf260fd62d6",
    ],
  },
];
const usersMockData = [
  {
    _id: "8ce35d83-795c-4a43-8591-0ee2db93992d",
    name: "omer weintroub",
    username: "omerwix123",
    password: "omerwix!123",
    email: "omerwe@wix.com",
    birthdate: "2022-05-05T00:00:00.000Z",
    favoriteTags: ["wix", "web"],
    likesArticlesIds: [
      "b3813e27-2311-48e9-9e93-8c5c14133ec5",
      "0e9b77b3-5453-49b6-8113-1755f844155f",
    ],
  },
  {
    _id: "0dcb8463-bc88-4288-bee0-baf260fd62d6",
    name: "matan lasry",
    username: "matanwix123",
    password: "matanwix!321",
    email: "matanls@wix.com",
    favoriteTags: ["wix", "web"],
    birthdate: "2022-05-05T00:00:00.000Z",
    likesArticlesIds: ["0e9b77b3-5453-49b6-8113-1755f844155f"],
  },
];
