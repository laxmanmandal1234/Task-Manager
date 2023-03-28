import mongoose from "mongoose";

//create user schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,   //this is the _id of the user in database
        ref: "User",        // this is the name of the collection
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

//create user mongoose model
const Task = mongoose.model('Task', taskSchema);

export default Task;