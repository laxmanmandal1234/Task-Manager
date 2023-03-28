import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Login first",
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //here we have extracted user id by decoding the token from the cookies
    //beacuse token was created initially in the cookies using the user id
    const user = await User.findById({_id: decoded._id});
    req.user = user;
    next();
}