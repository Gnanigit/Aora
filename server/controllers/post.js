import Post from "../models/post.js";
import sampleData from "./sampleData.js";

export const uploadPost = async (req, res) => {
  try {
    const result = await Post.insertMany(sampleData);
    console.log(result);
    res
      .status(201)
      .json({ message: "Sample data added successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Retrieve all Posts
export const getPosts = async (req, res) => {
  try {
    const Posts = await Post.find();

    return res.status(200).json(Posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLatestPosts = async (req, res) => {
  try {
    const Posts = await Post.find();

    return res.status(200).json(Posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchPosts = async (req, res) => {
  try {
    const { query } = req.query;

    // Exact match
    const exactMatches = await Post.find({
      title: { $regex: `^${query}$`, $options: "i" },
    });

    // Partial match
    const partialMatches = await Post.find({
      title: { $regex: query, $options: "i" },
    });

    let merged = exactMatches.concat(partialMatches);

    return res.status(200).json(merged);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const posts = await Post.find({ creator: userId });

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts for user:", err.message);
    res.status(500).json({ message: error.message });
  }
};
