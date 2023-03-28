import mongoose from "mongoose";

//we have kept the code for connecting to mongoDB inside a function and 
// this function will be called inside app.js

export const connectDatabase = async () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to database");
    }).catch((error) => {
        console.log("Error connecting", error);
    });
}

