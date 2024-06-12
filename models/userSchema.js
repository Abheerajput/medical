const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name must contain at least 3 characters"],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name must contain at least 3 characters"],
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be at least 6 characters long"],
        select: false,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Admin", "Doctor", "Patient"],
    },
    doctorDepartment: {
        type: String,
        required: function () {
            return this.role === "Doctor";
        },
    },
    docAvatar: {
        type:String,
        // public_id: String,
        // url: String,
      },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
