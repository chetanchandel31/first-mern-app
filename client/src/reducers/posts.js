// reducers are functions that take state & actions and their returned value goes to store?
//action will come from actions getters?

const reducer = (posts = [], action) => {
	switch (action.type) {
		case "FETCH_ALL":
			return action.payload;
		case "CREATE":
			return posts;
		default:
			return posts;
	}
};

export default reducer;
