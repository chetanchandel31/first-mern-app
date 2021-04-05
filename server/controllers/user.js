import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; //store user in browser for some period of time

import User from "../models/user.js";

export const signin = async (req, res) => {
	const { email, password } = req.body; //because these are the 2 fields on sigin form on front-end

	try {
		//check if user exists in database
		const existingUser = await User.findOne({ email }); //returns one document from collection?
		if (!existingUser) return res.status(404).json({ message: "user doesn't exist" });

		//check if (non-hashed?)password received from front-end matches (hashed)password in database
		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
		if (!isPasswordCorrect) return res.status(400).json({ message: "wrong password" }); //400 means "bad request"

		//create user's jwt to send to front-end if above conditions are met
		const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1h" });

		//send token and user's details to front-end
		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: "something went wrong" }); //500 means internal server error
	}
};

export const signup = async (req, res) => {
	const { firstName, lastName, email, password, confirmPassword } = req.body;

	try {
		//check if user exists in database
		const existingUser = await User.findOne({ email });
		if (existingUser) return res.status(400).json({ message: "this user already exists" });

		//check if password and confirmPassword match
		if (password !== confirmPassword) return res.status(400).json({ message: "passwords don't match" });

		//save the user's details in "users collection" with hashed password if above conditions are met
		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

		//create user's jwt to send to send to front-end
		const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" });

		//send token and user's details to front-end
		res.status(200).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: "something went wrong" });
	}
};
