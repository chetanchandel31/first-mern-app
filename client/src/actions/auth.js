import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signin = (formData, history) => async dispatch => {
	try {
		//log in the user
		const { data } = await api.signin(formData);

		dispatch({ type: AUTH, data });
		history.push("/");
	} catch (error) {
		console.log(error);
		console.log(formData);
	}
};

export const signup = (formData, history) => async dispatch => {
	try {
		//sign up the user
		const { data } = await api.signup(formData);

		dispatch({ type: AUTH, data });
		history.push("/");
	} catch (error) {
		console.log(error.message);
		console.log(formData);
	}
};
