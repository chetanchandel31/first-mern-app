import axios from "axios";

// const url = "https://first-mern-project31.herokuapp.com/posts/";
//const url = "http://localhost:5000/posts/";

//create an axios instance
const API = axios.create({ baseURL: "http://localhost:5000" });

//a function that happens before each request
//populate request's headers for the middleware at back-end
API.interceptors.request.use(req => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
	}
	return req;
});

export const fetchPosts = () => API.get("/posts");
export const createPost = newPost => API.post("/posts", newPost);
export const likePost = id => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = id => API.delete(`/posts/${id}`);

export const signin = formData => API.post("/user/signin", formData);
export const signup = formData => API.post("/user/signup", formData);
