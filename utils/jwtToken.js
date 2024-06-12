require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (user, message, statusCode, res) => {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    console.log("JWT_SECRET_KEY:", JWT_SECRET_KEY); 

    if (!JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined");
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES });

    const cookieName = user.role === "Admin" ? "AdminToken" : "PatientToken";

    res.status(statusCode)
        .cookie(cookieName, token, {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true,
        })
        .json({
            success: true,
            message: message,
            token: token,
            user:user
        });
};

module.exports = generateToken;

