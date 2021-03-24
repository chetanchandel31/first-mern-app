// reducers are functions that take state & actions and their returned value goes to store?
//action will come from actions getters?
//first arg represents global state in our store
//initial state doesn't HAVE to be an array
const reducer = (posts = [], action) => {
	switch (action.type) {
		case "FETCH_ALL":
			return action.payload;
		case "CREATE":
			return [...posts, action.payload];
		case "UPDATE":
		case "LIKE":
			return posts.map(post => (post._id === action.payload._id ? action.payload : post));
		case "DELETE":
			return posts.filter(post => post._id !== action.payload);
		default:
			return posts;
	}
};

export default reducer;
