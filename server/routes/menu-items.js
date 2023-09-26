import express from "express";
import {
  addItem,
  addPost,
  deleteItem,
  getItems,
  getPosts,
  getRootItems,
  updateItem,
} from "../controller/menu-items.js";

const router = express.Router();

router.post("/", addPost);

router.get("/", getPosts);

router.get("/", getPost);

// router.put("/", updateItem);

// router.delete("/", deleteItem);

export default router;
