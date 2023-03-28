// this is controller folder
// it will have the callback functions of all the api routes
// Also creating token is required both during login and new user register, so
// we have separate token generating code as well inside utils folder as features.js

import User from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

//Register New User
const registerNewUser =  async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
        return next(new ErrorHandler("User already registered", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name, email, password: hashedPassword
    });

    sendCookie(user, res, 201, "User created successfully");
}

//Login user
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email }).select("+password");   //initially when creating user model, password field is set to select:false, so it wont be accessed by default with User.find()
        if (!user) {
            return next(new ErrorHandler("Invalid Email or Password", 400));
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(new ErrorHandler("Invalid Email or Password", 400));
        }

        sendCookie(user, res, 200, `Welcome back, ${user.name}`);
    } catch (error) {
        next(error);
    }
}

//Logout User
const logoutUser = (req, res) => {
   res.status(200).cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true,
   })
   .json({
    success: true,
    message: "Logged out"
   });
}

//Get All Users
const getAllUsers = async (req, res) => {

    const users = await User.find({});
    res.json({
        success: true,
        users
    });
}
//Get Get My Profile Details
const getMyProfile = (req, res) => {
    
    res.status(200).json({
        success: true,
        user: req.user,
    });

}

export { getAllUsers, registerNewUser, getMyProfile, loginUser, logoutUser };


// const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY);

//     res.status(201).cookie("token", token, {
//         httpOnly: true,
//         maxAge: 5 * 60 * 1000,
//     }).json({
//         success: true,
//         message: "User created successfully",
//     });