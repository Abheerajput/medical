const express = require('express');
const {config} = require("dotenv");
const cors = require("cors");
const cloudinary = require('cloudinary').v2;

const {errorMdlwer} = require("./middlewares/errorMdlwer.js")
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const dbConnection = require('./database/dbConnection.js');
const app = express();
const appointmentRouter =  require('./router/appointmentRouter.js')
const messageRouter = require('./router/messageRouter.js')
const userRouter =  require('./router/userRouter.js')
require('dotenv').config();
config({path:"./config.env"})
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,

});
console.log("MONGO_URI:", process.env.MONGO_URI);

console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);



app.use(cors({
    origin: function (origin, callback) {
      callback(null, true); 
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE',],
    credentials: true 
  }));

  

app.use(cookieParser());
app.use(express.json());
app.use (express.urlencoded({extended:true}));
app.use(fileUpload({

    useTempFiles:true,
    tempFileDir: '/tmp/'
}));

app.use("/api/auth/message",messageRouter)
app.use("/api/auth/user",userRouter)
app.use("/api/auth/appointment",appointmentRouter)

dbConnection();

app.use(errorMdlwer)
module.exports = app;