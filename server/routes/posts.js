import express from "express";
import { getPosts, createPosts } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts); //handler => what to do when someone visits/makes GET request to localhost:5000/posts/ OR localhost:5000/posts
router.post("/", createPosts);

export default router;
