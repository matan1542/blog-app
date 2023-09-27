import express from "express";
import { addPost, getPosts } from "../controller/post.js";

const router = express.Router();

router.post("/", addPost);

router.get("/", getPosts);

// router.get("/", getPost);

export default router;
