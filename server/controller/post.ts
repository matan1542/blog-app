import { Request, Response, NextFunction } from "express";
import { getCollection } from "../services/db.service";
import { ObjectId } from "mongodb";
import { Post } from "../types/types";

export { getPosts, addPost };

const getPosts = async (req: Request, res: Response) => {
  const postsColl = await getCollection("posts");
  const posts = await postsColl
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "userId",
          as: "authorInfo",
        },
      },
      {
        $unwind: "$authorInfo",
      },
      {
        $addFields: {
          authorName: "$authorInfo.name",
        },
      },
      {
        $project: {
          authorInfo: 0,
        },
      },
    ])
    .toArray();

  res.send(posts);
};

const addPost = async (req: Request, res: Response) => {
  const id = new ObjectId();
  const newPost: Post = {
    _id: id,
    postId: id.toString(),
    authorId: "0dcb8463-bc88-4288-bee0-baf260fd62d6",
    title: req.body.title,
    content: req.body.content,
    creationDate: req.body.creationDate,
    tags: req.body.tags || [],
    likedUsers: [],
  };

  const postsColl = await getCollection("posts");
  await postsColl.insertOne(newPost);
  res.status(200).send({});
};

// const getPost = (req, res, next) => {
//   fs.readFile("data/menu-items.json", "utf8", (err, data) => {
//     if (err) throw new Error(err);
//     const menuItems = JSON.parse(data);
//     let rootItem = null;
//     for (const item in menuItems) {
//       if (menuItems[item].isRoot) {
//         rootItem = menuItems[item];
//       }
//     }
//     if (rootItem?.children && Object.keys(rootItem?.children).length > 0) {
//       let childrens = {};
//       if (rootItem) {
//         for (const item in rootItem.children) {
//           childrens[item] = menuItems[item];
//         }
//         res.send({ parentId: null, childrens });
//       }
//     }
//   });
// };
