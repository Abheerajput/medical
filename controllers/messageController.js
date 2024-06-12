const Message = require("../models/messageSchema.js")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js")
const ErrorHandler  = require("../middlewares/errorMdlwer.js")
const sendMessage =catchAsyncErrors( async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;
    if (!firstName || !lastName || !email || !phone || !message) {
        return next (new ErrorHandler("please fill full form",400));
        // return res.status(400).json({
        //     success: false,
        //     message: "Please fill all the fields",
        // })
    }
    await Message.create({ firstName, lastName, email, phone, message });
    res.status(200).json({
        success: true,
        message: "Message sent successfully",
    })

}
)

const  getAllMessages = catchAsyncErrors(async(req,res,next)=>{
    const message = await Message.find();
    res.status(200).
    json({
success:true,
message,
    })
   
})

module.exports= {sendMessage,getAllMessages };