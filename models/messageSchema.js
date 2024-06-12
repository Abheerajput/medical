const mongoose = require('mongoose');
const validator = require('validator');

const messageSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
       minLength:[3,"first name must contain at least 3 character"]
    },
    lastName:{
        type: String,
        required: true,
        minLength:[3,"last name must contain at least 3 character"]
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    phone:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: [validator.isMobilePhone, "Please enter a valid phone number"],
        minLength:[10,"phone Number must contain at least 11 character"],
        maxLength:[14,"phone Number must contain at least 11 character"],
    },
    message: {
        type: String,
        required: true,
        trim: true,
        minLength:[10,"message must contain at least 10 character"],
        maxLength:[1000,"message must contain at least 1000 character"]
    },
   
});
const Message = mongoose.model('Message',messageSchema) ;
module.exports = Message;