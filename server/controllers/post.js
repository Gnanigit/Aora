import Post from "../models/post.js";
import sampleData from "./sampleData.js";
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
    console.log("Search Query:", query);

    // Exact match
    const exactMatches = await Post.find({
      title: { $regex: `^${query}$`, $options: "i" },
    });

    // Partial match
    const partialMatches = await Post.find({
      title: { $regex: query, $options: "i" },
    });

    return res.status(200).json({ exactMatches, partialMatches });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ message: error.message });
  }
};

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
