import { Avatar, Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { useState } from "react";
import Input from "./Input";
import useStyles from "./styles";

const Auth = () => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignUp] = useState(false);

	const handleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword);

	const handleSubmit = () => {};

	const handleChange = () => {};

	const switchMode = () => {
		setIsSignUp(prevState => !prevState);
		setShowPassword(false);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.Avatar}>
					<LockOutlined />
				</Avatar>
				<Typography variant="h5">
					{isSignup ? "Sign up" : "Sign In"}
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
						<Button>{isSignup ? "Sign Up" : "Sign In"}</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Button onClick={switchMode}>{isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}</Button>
							</Grid>
						</Grid>
					</form>
				</Typography>
			</Paper>
		</Container>
	);
};

export default Auth;
