import express from "express"; //for creating routing
import bodyParser from "body-parser"; //for converting images/sending post requests?
import mongoose from "mongoose";
import cors from "cors"; //cross-origin requests?
import postRoutes from "./routes/posts.js";

// initialize app
const app = express();

// setting up body parser
app.use(express.json({ limit: "30mb", extended: "true" }));
app.use(express.urlencoded({ limit: "30mb", extended: "true" }));
//setting-up cors
app.use(cors());

//use express to connect router to our application
app.use("/posts", postRoutes); //every route inside postRoutes will start with /posts
//this should always come below app.use(cors())

//http://mongodb.com/cloud/atlas
const CONNECTION_URL = "mongodb+srv://chetan:chetan123@cluster0.3aezh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
	.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }) //second arg not required, just to avoid warnings
	.then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
	.catch(err => console.log(err.message));

mongoose.set("useFindAndModify", false); //just to avoid warnings
