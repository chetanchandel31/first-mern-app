import jwt from "jsonwebtoken";

//middleware => how to stop user from certain actions like liking post multiple times etc.
//middleware => what happens between a request for "liking post" etc. and the controllers (for like etc)

//after signing up or signing in user gets a jwt
//when he wants to do like a post middleware has to check if his token is valid and populate req.userId accordingly. this userId will be further used by controller to decide course of action

const auth = async (req, res, next) => {
	try {
		//access jwt from req & check if google's token or our own
		const token = req.headers.authorization.split(" ")[1];
		const isCustomAuth = token.length < 500;

		//store data from jwt
		let decodedData;

		//check if jwt is valid & use it's decoded data to populate req.userId (which will be further used by controller)
		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, "test");

			req.userId = decodedData?.id; //optional chaining because there might be no token in req
		} else {
			decodedData = jwt.verify(token);

			req.userId = decodedData?.sub; //sub is google's token's unique id for all users
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
