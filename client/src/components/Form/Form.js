import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import FileBase from "react-file-base64"; //convert image to a base 64 string. more info at #imp-js
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
	const [postData, setPostData] = useState({ creator: "", title: "", message: "", tags: "", selectedFile: "" });
	const post = useSelector(state => (currentId ? state.posts.find(post => post._id === currentId) : null));
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		if (post) setPostData(post); //just a note, post will contain id and createdAt properties which aren't included in our initial state
	}, [post]);

	const handleSubmit = e => {
		e.preventDefault();
		// console.log("sending", postData);

		if (currentId) {
			dispatch(updatePost(currentId, postData));
		} else {
			dispatch(createPost(postData));
		}
		clear();
	};

	const clear = () => {
		setCurrentId(null);
		setPostData({ creator: "", title: "", message: "", tags: "", selectedFile: "" });
	};
	// Paper is like a div with whitish background
	//try to map textfields while re-factoring?
	return (
		<Paper className={classes.paper}>
			<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
				<Typography variant="h6">{currentId ? "Editing" : "Creating"} a memory</Typography>
				<TextField
					name="creator"
					variant="outlined"
					label="Creator"
					fullWidth
					value={postData.creator}
					onChange={({ target }) => setPostData(prevState => ({ ...prevState, creator: target.value }))}
				/>
				<TextField
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postData.title}
					onChange={({ target }) => setPostData(prevState => ({ ...prevState, title: target.value }))}
				/>
				<TextField
					name="message"
					variant="outlined"
					label="Message"
					fullWidth
					value={postData.message}
					onChange={({ target }) => setPostData(prevState => ({ ...prevState, message: target.value }))}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags"
					fullWidth
					value={postData.tags}
					onChange={({ target }) => setPostData(prevState => ({ ...prevState, tags: target.value.split(/[\s,]+/).join(" ") }))}
				/>
				<div className={classes.fileInput}>
					<FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
				</div>
				<Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
					Submit
				</Button>
				<Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
