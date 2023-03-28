// Good practice is to separate all the api routes and all the callback functions
// This is called MVP architecture: Model, View, Controller
// keep all the api routes indise routes folder
// keep all the callback functions inside controllers folder
// keep the mongoose models inside models folder
// we will listen to server, connect to mongoDB inside server.js
// so our main file will be server.js
// keep all secret variables like port number, databse connection url, secret 
// key, passwords, etc inside .env file inside data folder
// create a .gitignore file and enter path of all the files that you don't want to upload to github


import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

//specify path to .env file
//dotenv.config.path = "./data/config.env"; //this is also correct syntax
dotenv.config({
    path: "./data/config.env",
});

//using Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use("/api/v1/users", userRouter);  // it means in all the user routes this prefix is added
//examples: if api route for getting all users is "/all", then it
// will be http://localhost:3000/users/all
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
    res.send("This is a demo Home Page while developing Backend");
});

//using Error Middleware
app.use(errorMiddleware);
