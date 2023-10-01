import express from "express";
import { addPost, getPosts } from "../controller/post.js";
import { login, signUp } from "../controller/user.js";

const router = express.Router();

router.post("/login", login);

router.get("/user", addPost);

router.post("/signup", signUp);

// router.get("/", getPost);

export default router;
