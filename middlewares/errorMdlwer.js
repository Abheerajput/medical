class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        console.log(`Error: ${message}, StatusCode: ${statusCode}`);
    }
}

const errorMdlwer = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    console.error(`Error: ${err.message}, StatusCode: ${err.statusCode}`);

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }
    if (err.name === "JsonWebTokenError") {
        const message = "JSON Web Token is invalid, try again!";
        err = new ErrorHandler(message, 400);
    }
    if (err.name === "TokenExpiredError") {
        const message = "JSON Web Token is expired, try again!";
        err = new ErrorHandler(message, 400);
    }
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}, try again!`;
        err = new ErrorHandler(message, 400);
    }

    const errorMessage = err.errors 
        ? Object.values(err.errors).map(error => error.message).join("")
        : err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    });
};

module.exports = { ErrorHandler, errorMdlwer };
