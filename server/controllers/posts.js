import PostMessage from "../models/postMessage.js"; //our model
import mongoose from "mongoose";
// export const getPosts = (req, res) => {
// 	res.send("it's working..");
// };

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find(); //array of all messages that we have "in our model?"

		res.status(200).json(postMessages); //explanation in imp-js
	} catch (err) {
		res.status(404).json({ messages: err.message });
	}
};

export const createPosts = async (req, res) => {
	//with POST requests we have access to req.body
	const post = req.body; //post will come from front-end
	const newPost = new PostMessage(post); //new model based on request we received from front-end?

	try {
		await newPost.save(); //Saves this document by inserting a new document into the database

		res.status(201).json(newPost);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

export const updatePosts = async (req, res) => {
	const { id: _id } = req.params;
	const post = req.body;

	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");
	try {
		const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true }); //third arg to receive the updated version of post after updating
		res.json(updatedPost);
	} catch (error) {
		res.json({ message: error.message });
	}
};
