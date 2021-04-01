import express from "express";
import { signin, signup } from "../controllers/user.js";

const router = express.Router();

//not "creating" a user during sign in but GET requests don't have a body therefore using POST
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
