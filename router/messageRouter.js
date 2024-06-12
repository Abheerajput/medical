const express = require('express');
const {sendMessage,getAllMessages }= require('../controllers/messageController.js');
const { isAdminAuthenticated } = require('../middlewares/auth.js')
const router = express.Router();

router.post("/send", sendMessage)
router.get("/getall",getAllMessages)
module.exports =router