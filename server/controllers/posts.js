import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find(); //array of all messages that we have "in our model?"

		res.status(200).json(postMessages); //explanation in imp-js
	} catch (err) {
		res.status(404).json({ messages: err.message });
	}
};

// export const getPosts = (req, res) => {
// 	res.send("it's working..");
// };

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
