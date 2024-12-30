import express from "express";
import { getPosts } from "../controllers/post.js";
import { uploadPost } from "../controllers/post.js";
import { getLatestPosts } from "../controllers/post.js";

const PostRouter = express.Router();

PostRouter.get("/get-posts", getPosts);
PostRouter.get("/get-latest-posts", getLatestPosts);
PostRouter.post("/upload-post", uploadPost);

export default PostRouter;
