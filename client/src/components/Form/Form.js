import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./styles";
import FileBase from "react-file-base64"; //convert image to a base 64 string. more info at #imp-js

const Form = () => {
	const [postData, setPostData] = useState({ creator: "", title: "", message: "", tags: "", selectedFile: "" });

	const classes = useStyles();

	const handleSubmit = () => {};

	const clear = () => {};

	// Paper is like a div with whitish background
	//try to map textfields while re-factoring?
	return (
		<Paper className={classes.paper}>
			<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
				<Typography variant="h6">Creating a memory</Typography>
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
					onChange={({ target }) => setPostData(prevState => ({ ...prevState, tags: target.value }))}
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
