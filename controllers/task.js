import ErrorHandler from "../middlewares/error.js";
import Task from "../models/task.js";

const createNewTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const task = await Task.create({
            title, description, user: req.user
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
        });
    } catch (error) {
        next(error);
    }
}   

const getMyTasks = async (req, res) => {
    try {
        const userid = req.user._id;
        const tasks = await Task.find({ user: userid });

        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        next(error);
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task) {
            return next(new ErrorHandler("Aeiyoooo!!! Invalid ID", 404));
        }
        task.isCompleted = !task.isCompleted;
        await task.save();
        
        res.status(200).json({
            success: true,
            message: "Task updated",
            isCompleted: task.isCompleted,
        });
    } catch (error) {
        next(error);
    }
} 

const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task) {
            //return next(new Error("Aeiyooooo")); //throw an error inside next, Error is a javascript class and an error message can also be passed
            return next(new ErrorHandler("Aeiyooooo", 404));
        }
        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        next(error);
    }
} 

//whenevr we call next() in a callback function by passing error, errorHandler is executed


export { createNewTask, getMyTasks, updateTask, deleteTask }; 