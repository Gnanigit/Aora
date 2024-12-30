import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { createAvatar } from "@dicebear/avatars";
import * as sprites from "@dicebear/avatars-identicon-sprites";
export async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User does not exist. ");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password.");
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).send(user);
  } catch (err) {
    throw new Error(err);
  }
}

export const createUser = async (req, res) => {
  const { email, password, username } = req.body;
  console.log(email);

  try {
    // Hash the user's password
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate a unique avatar using DiceBear
    const avatarSvg = createAvatar(sprites, {
      seed: username || email, // Use username or email as seed
      radius: 50, // Optional: Customize avatar properties
    });

    const avatarBase64 = Buffer.from(avatarSvg).toString("base64"); // Convert SVG to base64

    // Create a new user account with the avatar
    const newAccount = new User({
      email,
      password: passwordHash,
      username,
      avatar: `data:image/svg+xml;base64,${avatarBase64}`, // Store avatar in base64 format
    });

    // Save the user to the database
    const newUser = await newAccount.save();

    return res.status(200).send(newUser);
  } catch (error) {
    console.error("Error creating user: ", error);
    return res.status(500).send({ error: "Error creating user" });
  }
};

export const getCurrentUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token found" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById({ _id: verified.userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(403).json({ message: "Invalid token" });
  }
};