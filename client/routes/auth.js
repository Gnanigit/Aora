import axios from "axios";
import { REACT_NATIVE_APP_SERVER_DOMAIN } from "@env";
const baseURL = REACT_NATIVE_APP_SERVER_DOMAIN;

export const signIn = async (email, password) => {
  try {
    console.log("Signing in...");
    const response = await axios.post(`${baseURL}/auth/sign-in`, {
      withCredentials: true,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (email, password, username) => {
  try {
    const response = await axios.post(`${baseURL}/auth/sign-up`, {
      withCredentials: true,
      email,
      password,
      username,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${baseURL}/auth/current-user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${baseURL}/posts/get-posts`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLatestPosts = async () => {
  try {
    const response = await axios.get(`${baseURL}/posts/get-latest-posts`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchPosts = async (query) => {
  try {
    const response = await axios.get(`${baseURL}/posts/search-posts`, {
      withCredentials: true,
      params: { query },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserPosts = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/posts/get-user-posts`, {
      withCredentials: true,
      params: { userId },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signout = async () => {
  try {
    const response = await axios.delete(`${baseURL}/auth/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const uploadPost = async (image) => {
  console.log("hello:", image);
  try {
    const response = await axios.post(`${baseURL}/posts/upload-posts`, {
      withCredentials: true,
      image,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
