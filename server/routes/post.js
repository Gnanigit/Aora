import express from "express";
import {
  getPosts,
  searchPosts,
  getLatestPosts,
  uploadPost,
} from "../controllers/post.js";

const PostRouter = express.Router();

PostRouter.get("/get-posts", getPosts);
PostRouter.get("/get-latest-posts", getLatestPosts);
PostRouter.get("/search-posts", searchPosts);
PostRouter.post("/upload-post", uploadPost);

export default PostRouter;
