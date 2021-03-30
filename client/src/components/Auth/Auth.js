import { Avatar, Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { GoogleLogin } from "react-google-login";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Input from "./Input";
import useStyles from "./styles";
import Icon from "./icon";

const Auth = () => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignUp] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword);

	const handleSubmit = () => {};

	const handleChange = () => {};

	const switchMode = () => {
		setIsSignUp(prevState => !prevState);
		setShowPassword(false);
	};

	const googleSuccess = async res => {
		const result = res?.profileObj;
		const token = res?.tokenId;
		try {
			dispatch({ type: "AUTH", data: { result, token } });
			history.push("/");
		} catch (err) {
			console.log(err);
		}
	};

	const googleFailure = error => {
		console.log("Google sign in unsuccessful. Try again later.");
		console.log(error);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.Avatar}>
					<LockOutlined />
				</Avatar>
				<Typography variant="h5">{isSignup ? "Sign up" : "Sign In"}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
								<Input name="firstName" label="First Name" handleChange={handleChange} half />
							</>
						)}
						<Input name="email" label="Email Address" handleChange={handleChange} type="email" />
						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
					</Grid>

					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						{isSignup ? "Sign Up" : "Sign In"}
					</Button>
					<GoogleLogin
						clientId="491605978856-jfkugdpl483cobt610dcq2rej29sa13d.apps.googleusercontent.com"
						render={renderProps => (
							<Button
								className={classes.googleButton}
								color="primary"
								fullWidth
								variant="contained"
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
							>
								Google Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy="single_host_origin"
					/>
					<Grid container justify="flex-end">
						<Grid item>
							<Button onClick={switchMode}>{isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
