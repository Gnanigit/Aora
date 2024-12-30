import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
      unique: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
