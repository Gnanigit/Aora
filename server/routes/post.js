import express from "express";
import {
  getPosts,
  searchPosts,
  getLatestPosts,
  uploadPost,
  getUserPosts,
  uploadPosts,
} from "../controllers/post.js";

const PostRouter = express.Router();

// GET request
PostRouter.get("/get-posts", getPosts);
PostRouter.get("/get-latest-posts", getLatestPosts);
PostRouter.get("/search-posts", searchPosts);
PostRouter.get("/get-user-posts", getUserPosts);

// POST request
PostRouter.post("/upload-post", uploadPost);
PostRouter.post("/upload-posts", uploadPosts);

export default PostRouter;
