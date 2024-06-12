const mongoose = require('mongoose');
const validator = require('validator');
const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "first name must contain at least 3 character"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "last name must contain at least 3 character"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: [validator.isMobilePhone, "Please enter a valid phone number"],
        minLength: [10, "phone Number must contain at least 11 character"],
        maxLength: [14, "phone Number must contain at least 11 character"],
    },
    nic: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: [13, "Nic  must contain  13 digit"],
        maxLength: [30, "Nic  must contain  13 digit"],
    },
    dob: {
        type: Date,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    appointment_date: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    doctor: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true,
            minLength: [3, "last name must contain at least 3 character"]
        }
    },
    hasVisited:{
        type:Boolean,
        required: true,
        default:false
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required: true,
        ref:'Doctor'
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        required: true,
        ref:'Patient'
    },
    address:{
        type:String,
        required: true,
        minLength: [3, "address must contain at least 3 character"]
    },
    status:{
        type:String,
        required: true,
        enum:['Pending', 'Accepted', 'Rejected'],
        default:"Pending"
    }

});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;