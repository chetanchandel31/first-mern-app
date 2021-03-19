// reducers are functions that take state & actions and their returned value goes to store?
//action will come from actions getters?
//initial state doesn't HAVE to be an array
const reducer = (posts = [], action) => {
	switch (action.type) {
		case "FETCH_ALL":
			return action.payload;
		case "CREATE":
			return [...posts, action.payload];
		default:
			return posts;
	}
};

export default reducer;
