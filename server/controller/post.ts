import { Request, Response, NextFunction } from "express";
import { getCollection } from "../services/db.service";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { FeedbackPost, Post } from "../types/types";

export { getPosts, addPost, addLike, addDislike, getTags, getPost };
type filtersProps = { postId: string };
type queryFiltersProps = ({ postId }: filtersProps) => void;

const addLike = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const user = authHeader
    ? jwt.verify(authHeader, process.env.JWT_SECRET)
    : null;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const postId = req.params.postId as string; // Assuming you have the post ID in the request body

  if (!postId) {
    return res
      .status(400)
      .json({ message: "Post ID is required in the request body" });
  }

  const feedbackColl = await getCollection("post-feedback");
  // Find the feedback entry for the post
  const existingFeedback = (await feedbackColl.findOne({
    postId,
  })) as unknown as FeedbackPost;

  if (existingFeedback) {
    const likedUsers = existingFeedback.likedUsers || [];
    const dislikedUsers = existingFeedback.dislikedUsers || [];

    const userLikeIndex = likedUsers.indexOf(user.userId);
    const userDislikeIndex = dislikedUsers.indexOf(user.userId);

    if (userLikeIndex === -1) {
      if (userDislikeIndex !== -1) {
        dislikedUsers.splice(userDislikeIndex, 1);
      }
      // If the user hasn't liked the post, add their ID to the likedUsers array
      likedUsers.push(user.userId);
    } else {
      // If the user has already liked the post, remove their ID to "unlike" it
      likedUsers.splice(userLikeIndex, 1);
    }

    // Update the feedback entry with the modified likedUsers array
    await feedbackColl.updateOne(
      { postId },
      {
        $set: { likedUsers, dislikedUsers },
      }
    );
  }

  return res.status(200).json({ message: "Like updated successfully" });
};

const addDislike = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const user = authHeader
    ? jwt.verify(authHeader, process.env.JWT_SECRET)
    : null;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const postId = req.params.postId as string; // Assuming you have the post ID in the request body

  // res.status(200).json({ message: "Like updated successfully" });
  // return;
  if (!postId) {
    return res
      .status(400)
      .json({ message: "Post ID is required in the request body" });
  }

  const feedbackColl = await getCollection("post-feedback");
  // Find the feedback entry for the post
  const existingFeedback = (await feedbackColl.findOne({
    postId,
  })) as unknown as FeedbackPost;

  if (existingFeedback) {
    const dislikedUsers = existingFeedback.dislikedUsers || [];
    const likedUsers = existingFeedback.likedUsers || [];

    const userDislikeIndex = dislikedUsers.indexOf(user.userId);
    const userLikeIndex = likedUsers.indexOf(user.userId);

    if (userDislikeIndex === -1) {
      if (userLikeIndex !== -1) {
        likedUsers.splice(userLikeIndex, 1);
      }
      // If the user hasn't liked the post, add their ID to the dislikedUsers array
      dislikedUsers.push(user.userId);
    } else {
      // If the user has already liked the post, remove their ID to "unlike" it
      dislikedUsers.splice(userDislikeIndex, 1);
    }

    // Update the feedback entry with the modified likedUsers array
    await feedbackColl.updateOne(
      { postId },
      {
        $set: { dislikedUsers, likedUsers },
      }
    );
  }

  return res.status(200).json({ message: "Like updated successfully" });
};

const getPosts = async (req: Request, res: Response) => {
  let filters = queryFiltes(req.params as filtersProps);
  console.log("filters", filters);

  const authHeader = req.headers.authorization;
  const user = authHeader
    ? jwt.verify(authHeader, process.env.JWT_SECRET)
    : null;

  const isLiked = user
    ? {
        $cond: {
          if: {
            $in: [user.userId, "$feedbackInfo.likedUsers"], // Check if the user has disliked the post
          },
          then: true,
          else: false,
        },
      }
    : false;

  const isDisliked = user
    ? {
        $cond: {
          if: {
            $in: [user.userId, "$feedbackInfo.dislikedUsers"], // Check if the user has disliked the post
          },
          then: true,
          else: false,
        },
      }
    : false;

  const postsColl = await getCollection("posts");
  const posts = await postsColl
    .aggregate([
      {
        $match: filters, // Your filtering conditions go here
      },
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
        $lookup: {
          from: "post-feedback",
          localField: "postId",
          foreignField: "postId",
          as: "feedbackInfo",
        },
      },
      {
        $unwind: {
          path: "$feedbackInfo",
        },
      },
      {
        $addFields: {
          authorName: "$authorInfo.name",
          likedUsers: { $size: "$feedbackInfo.likedUsers" },
          dislikedUsers: { $size: "$feedbackInfo.dislikedUsers" },
          isLiked: isLiked,
          isDisliked: isDisliked,
        },
      },
      {
        $project: {
          feedbackInfo: 0,
          authorInfo: 0,
        },
      },
    ])
    .toArray();

  res.send(posts);
};

const addPost = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const user = jwt.verify(authHeader, process.env.JWT_SECRET);
  const id = new ObjectId();
  const newPost: Post = {
    _id: id,
    postId: id.toString(),
    authorId: user.userId,
    title: req.body.title,
    content: req.body.content,
    creationDate: req.body.creationDate,
    tags: req.body.tags || [],
    feedbackPostId: id.toString(),
  };

  const newPostFeedback: FeedbackPost = {
    _id: id,
    dislikedUsers: [],
    likedUsers: [],
    postId: id.toString(),
  };

  const postsColl = await getCollection("posts");
  const postsFeedbackColl = await getCollection("post-feedback");
  await postsColl.insertOne(newPost);
  await postsFeedbackColl.insertOne(newPostFeedback);
  res.status(200).send({});
};

const getTags = async (req: Request, res: Response) => {
  const postsColl = await getCollection("posts");
  const posts = (await postsColl.find({}).toArray()) as unknown as Post[];
  const tags = posts.reduce((acc, post) => {
    return [...acc, ...post.tags];
  }, []);
  const uniqueTags = [...new Set(tags)];
  res.send(uniqueTags);
};

const getPost = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const postsColl = await getCollection("posts");
  const post = await postsColl.findOne({ postId });
  res.send(post);
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

const queryFiltes: queryFiltersProps = ({ postId }) => {
  const filters = {};
  if (postId) {
    filters["postId"] = postId;
  }
  return filters;
};
