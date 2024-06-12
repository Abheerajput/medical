const express = require("express")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
require('dotenv').config();
const { ErrorHandler, errorMdlwer } = require("../middlewares/errorMdlwer.js");
const cloudinary = require('cloudinary').v2;
require('dotenv').config(); 
const User = require("../models/userSchema.js")
const catchAsyncErrors =require("../middlewares/catchAsyncErrors.js")
const generateToken = require("../utils/jwtToken.js")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY

});

const patientRegister = catchAsyncErrors(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role,
    } = req.body;

    if(!firstName|| !lastName|| !email|| !phone ||!password ||!gender||!dob||!nic|| !role)
        {
        return next(new ErrorHandler("All fill Full Form",400));
    }
    let  user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("Email already exists",400))
    }
    user= await User.create({firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role,});
        generateToken( user,"user Registered",200,res)
       
})

const login = catchAsyncErrors(async(req,res,next)=>{
    const {email,password,confirmPassword,role} = req.body;
    if(!email|| !password|| !confirmPassword|| !role)
        {return next(new ErrorHandler("please provide All Details",400))}
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password and confirm Password did not match",400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("invalid email or Password   ",400))
    }
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid email or Password   ",400))
    }
    if(role !== user.role){
        console.log(`Expected role: ${role}, Found role: ${user.role}`); 
        return next(new ErrorHandler(" user with this role not found  ",400))
    }
    generateToken( user,"user logged in successfully",200,res)

});

const addNewAdmin = catchAsyncErrors(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
      
    } = req.body;
    if(!firstName|| !lastName|| !email|| !phone ||!password ||!gender||!dob||!nic)
        {
        return next(new ErrorHandler("please fill Full Form",400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role}Admin with this email is already exits try with another email`))
    }
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role:"Admin"
    });
    res.status(200).json({
        success:true,
        message:"New Admin Registered"
    })

})

const getAllDoctors = catchAsyncErrors(async(req,res,next)=>{
    const doctors = await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors
    });
});

const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user
    });
})

const logoutAdmin = catchAsyncErrors(async(req,res,next)=>{

    res.status(200).cookie("AdminToken","",{
        expires:new Date(Date.now()),
        httpOnly:true
    }).json({
        success:true,
        message:"Admin Logged out successfully"
    });
})

const logoutPatient = catchAsyncErrors(async(req,res,next)=>{

    res.status(200).cookie("PatientToken","",{
        expires:new Date(Date.now()),
        httpOnly:true
    }).json({
        success:true,
        message:"Pateint Logged out successfully"
    });
})

const addNewDoctor = catchAsyncErrors(async (req, res, next) => {

  
 
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            gender,
            dob,
            nic,
            docAvatar,
            doctorDepartment
        } = req.body;

        if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic  || !doctorDepartment) {
            return next(new ErrorHandler("Please fill the full form", 410));
        }

        const isRegistered = await User.findOne({ email });
        if (isRegistered) {
            return next(new ErrorHandler(`User with this email already exists. Try with another email`, 400));
        }

        

        const doctor = await User.create({
            firstName,
            lastName,
            email,
            phone,
            password,
            gender,
            dob,
            nic,
            role: "Doctor",
            docAvatar,

            doctorDepartment,
        });

        res.status(200).json({
            success: true,
            message: "New Doctor Registered",
            doctor
        });
    } catch (error) {
        console.error(`Error during doctor registration: ${error.message}`);
        next(new ErrorHandler(error.message, 500));
    }
});






module.exports= {patientRegister,login,addNewAdmin,getAllDoctors,getUserDetails,logoutAdmin,logoutPatient,addNewDoctor};
