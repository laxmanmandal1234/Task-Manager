//to identify a callback as a errorHandler, the first argument must be error
// en error handler function is executed whenever next() of a callback function (here controller) is called by
// passing an error 

// export const errorMiddleware = (err, req, res, next) => {
//     err.message = err.message || "Internal Server Error";   //if no error message is passed, then default is Internal Server error
//     res.status(404).json({
//         success: false,
//         message: err.message,
//     });
// }


//creating own class for error handling

class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";   //if no error message is passed, then default is Internal Server error
    err.statusCode = err.statusCode || 500;
    
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}

export default ErrorHandler;