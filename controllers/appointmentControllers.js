const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const {ErrorHandler} = require("../middlewares/errorMdlwer");
const Appointment = require("../models/appointmentSchema.js");
const User = require("../models/userSchema");

const postAppointment = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address,
    } = req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctor_firstName ||
        !doctor_lastName ||
        !address
    ) {
        return next(new ErrorHandler("Please fill the full form!", 405));
    }

    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department
    });

    if (isConflict.length === 0) {
        return next(new ErrorHandler("Doctor not found", 404));
    }

    if (isConflict.length > 1) {
        return next(new ErrorHandler("Doctor conflict, please contact through email or phone", 404));
    }

    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;

    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName
        },
        hasVisited,
        address,
        patientId,
        doctorId
    });

    res.status(201).json({
        success: true,
        message: "Appointment created successfully",
        data: appointment
    });
});


const getAllAppointment= catchAsyncErrors(async(req,res,next)=>{
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        data: appointments
    })
})


const updateAppointmentStatus = catchAsyncErrors(async(req,res,next)=>{
    const appointment = await Appointment.findById(req.params._id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(_id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    // appointment.status = req.body.status;
    // await appointment.save();
    res.status(200).json({
        success: true,
        message: "Appointment status updated successfully",
        data: appointment
    })
})

const deleteAppointment = catchAsyncErrors(async(req,res,next)=>{
    const appointment = await Appointment.findById(req.params.id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
        success: true,
        message: "Appointment deleted successfully",
        data: appointment
    })
})
module.exports = { postAppointment ,getAllAppointment,updateAppointmentStatus,deleteAppointment};
