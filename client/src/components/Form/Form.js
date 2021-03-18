import { Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./styles";

const Form = () => {
	const [postData, setPostData] = useState({ creator: "", title: "", message: "", tags: "", selectedFile: "" });

	const classes = useStyles();

	const handleSubmit = () => {};
	// paper is like a div with whitish background
	return (
		<Paper className={classes.paper}>
			<form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
				<Typography variant="h6">Creating a memory</Typography>
				<TextField
					name="creator"
					variant="outlined"
					label="Creator"
					fullWidth
					value={postData.creator}
					onChange={({ target }) => setPostData(prevState => setPostData({ ...prevState, creator: target.value }))}
				/>
				<TextField
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postData.title}
					onChange={({ target }) => setPostData(prevState => setPostData({ ...prevState, title: target.value }))}
				/>
				<TextField
					name="message"
					variant="outlined"
					label="Message"
					fullWidth
					value={postData.message}
					onChange={({ target }) => setPostData(prevState => setPostData({ ...prevState, message: target.value }))}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags"
					fullWidth
					value={postData.tags}
					onChange={({ target }) => setPostData(prevState => setPostData({ ...prevState, tags: target.value }))}
				/>
			</form>
		</Paper>
	);
};

export default Form;
