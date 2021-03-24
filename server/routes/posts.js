import express from "express";
import { getPosts, createPosts, updatePosts, deletePost, likePost } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts); //handler => what to do when someone visits/makes GET request to localhost:5000/posts/ OR localhost:5000/posts
router.post("/", createPosts);
router.patch("/:id", updatePosts); //anything after localhost:5000/posts/abcxyz will be stored in id (like a variable?). accessible through URL's params
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);
export default router;
