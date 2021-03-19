import axios from "axios";

const url = "http://localhost:5000/posts/"; //having https instead of http here was causing an issue

export const fetchPosts = () => axios.get(url);

export const createPost = newPost => axios.post(url, newPost);
