class ErrorHandler extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export const errorMiddleware = (err,req,res,next)=>{
    
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    res.status(404).json({
        success: false,
        message: err.message
    })
}

export default ErrorHandler;