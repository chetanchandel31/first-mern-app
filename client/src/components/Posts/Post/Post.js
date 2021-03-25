import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import moment from "moment";
import { Delete, MoreHoriz, ThumbUpAlt } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, currentId, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	return (
		<Card className={classes.card}>
			<CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
			<div className={classes.overlay}>
				<Typography variant="h6">{post.creator}</Typography>
				<Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
			</div>
			<div className={classes.overlay2}>
				<Button style={{ color: "white" }} size="small" onClick={() => {}}>
					<MoreHoriz fontSize="default" onClick={() => setCurrentId(post._id)} />
				</Button>
			</div>
			<div className={classes.details}>
				<Typography variant="body2" color="textSecondary">
					{post.tags[0]
						.split(", ")
						.map(tag => {
							if (tag.charAt(0) !== "#") return `#${tag}`;
							return tag;
						})
						.join(", ")}
				</Typography>
			</div>
			<Typography className={classes.title} variant="h5" gutterBottom>
				{post.title}
			</Typography>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{post.message}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Button
					size="small"
					color="primary"
					onClick={() => {
						dispatch(likePost(post._id));
					}}
				>
					<ThumbUpAlt fontSize="small" />
					Like {post.likeCount}
				</Button>
				<Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
					<Delete fontSize="small" />
					Delete
				</Button>
			</CardActions>
		</Card>
	);
};

export default Post;
