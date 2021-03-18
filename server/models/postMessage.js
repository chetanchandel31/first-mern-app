import mongoose from "mongoose";

const postSchema = mongoose.Schema({
	title: String,
	message: String,
	creator: String,
	tags: [String],
	selectedFile: String,
	likeCount: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

//turn schema to model
const PostMessage = mongoose.model("PostMessage", postSchema); //first arg can be named whatever we like

export default PostMessage; //will be able to run commands like find, create, update, delete on this model
