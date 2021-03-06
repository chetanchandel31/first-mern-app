import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Navbar = () => {
	const classes = useStyles();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		const token = user?.token;

		//JWT...
		if (token) {
			const decodedToken = decode(token);
			// console.log(decodedToken);
			if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		}

		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	const logout = () => {
		dispatch({ type: "LOGOUT" });
		history.push("/");
		setUser(null);
	};

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<div className={classes.brandContainer}>
				<Typography className={classes.heading} component={Link} to="/" variant="h2" align="center">
					Memories
				</Typography>
				<img className={classes.image} src={memories} alt="icon" height="60" />
			</div>
			<Toolbar className={classes.toolbar}>
				{user?.result ? (
					<div className={classes.profile}>
						<Avatar className={classes.purple} src={user?.result?.imageUrl} alt={user.result.name}>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant="h6">
							{user.result.name}
						</Typography>
						<Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
							Logout
						</Button>
					</div>
				) : (
					<Button component={Link} to="/auth" variant="contained" color="primary">
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
