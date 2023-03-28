// In the routes folder, we keep all the api routes like routes for creating 
// new user, route for getting all users, routs to create posts, etc.
// We will have different files inside routes folder for routes related to different features like 
// routes related to users, routes related to products, routes relatd to post, messages, etc
// Then, export each router defined inside all files inside routes folder and 
// import all inside app.js to connect these routers with the app


import express from "express";
import { getAllUsers, getMyProfile, loginUser, logoutUser, registerNewUser } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", registerNewUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/all", getAllUsers);

//dynamic routing
//example if url id localhost:3000/userid/1245, then
//req.params = {id:1245}. this is an object
//Tips: Always keep dynaimc route at the last in your code
router.get("/profile", isAuthenticated, getMyProfile);

export default router;