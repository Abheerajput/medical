const User = require("../models/userSchema");
const jwt = require("jsonwebtoken")

const catchAsyncErrors = require("./catchAsyncErrors");
const { ErrorHandler } = require("./errorMdlwer");

const isAdminAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.AdminToken
    if(!token){
        return next(new ErrorHandler("Admin Not Authenticated ",401));
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id);

    if(req.user.role !== "Admin"){
        return next(new ErrorHandler(`${req.user.role}You are not authorized to perform this action`,403));
    }
    next();
})
const isPatientAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.PatientToken
    if(!token){
        return next(new ErrorHandler("Patient Not Authenticated ",402));
       
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id);

    if(req.user.role !== "Patient"){
        return next(new ErrorHandler(`${req.user.role}You are not authorized to perform this action`,403));
    }
    next();
})
module.exports = {isAdminAuthenticated,isPatientAuthenticated};