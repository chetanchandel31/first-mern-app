import mongoose from "mongoose";

const postSchema = mongoose.Schema({
	title: String,
	message: String,
	creator: String,
	tags: [String], //because of this frontend can send tags as string but they are encapsulated in array inside database
	selectedFile: String,
	likes: {
		type: [String],
		default: [],
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

//turn schema to model
const PostMessage = mongoose.model("PostMessage", postSchema); //first arg can be named whatever we like

export default PostMessage; //will be able to run commands like find, create, update, delete on this model
