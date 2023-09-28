import express from "express";
import { addPost, addLike, getPosts, addDislike } from "../controller/post.js";

const router = express.Router();

router.post("/", addPost);

router.post("/:postId/like", addLike);
// router.post("/disliked", addPost);
router.post("/:postId/dislike", addDislike);

router.get("/", getPosts);

// router.get("/", getPost);

export default router;
