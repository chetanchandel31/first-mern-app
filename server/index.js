import express from "express"; //for creating routing
import bodyParser from "body-parser"; //for converting images/sending post requests?
import mongoose from "mongoose";
import cors from "cors"; //cross-origin requests? to access something outside our server from our server
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";

// initialize app
const app = express();
dotenv.config();

// setting up body parser
app.use(express.json({ limit: "30mb", extended: "true" })); //allows us to parse JSON because server will be sending and receiving JSON
app.use(express.urlencoded({ limit: "30mb", extended: "true" })); //might be for url encoded ids?
//setting-up cors
app.use(cors());

//use express to connect router to our application
app.use("/posts", postRoutes); //every route inside postRoutes will start with ROOT_URL/posts
//this should always come below app.use(cors())

//http://mongodb.com/cloud/atlas
// const CONNECTION_URL = "mongodb+srv://chetan:chetan123@cluster0.3aezh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }) //second arg not required, just to avoid warnings
	.then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
	.catch(err => console.log(err.message));

mongoose.set("useFindAndModify", false); //just to avoid warnings
