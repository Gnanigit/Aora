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
