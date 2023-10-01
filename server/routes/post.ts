import express from "express";
import {
  addPost,
  addLike,
  getPosts,
  addDislike,
  getTags,
  getPost,
} from "../controller/post.js";

const router = express.Router();

router.post("/", addPost);
router.get("/:postId", getPosts);

router.post("/:postId/like", addLike);
router.get("/:postId/tag", getTags);
// router.post("/disliked", addPost);
router.post("/:postId/dislike", addDislike);

router.get("/", getPosts);

// router.get("/", getPost);

export default router;
