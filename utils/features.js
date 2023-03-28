import jwt from "jsonwebtoken";

export const sendCookie = (user, res, statusCode, message) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY);

    // our frontend and backend have different domain / url so after deployment
    // we must set sameSite attribute of cookie to none
    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 5 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
        success: true,
        message,
    });
}