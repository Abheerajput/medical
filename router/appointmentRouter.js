const express = require("express");
const router = express.Router();
const {isPatientAuthenticated,isAdminAuthenticated} = require("../middlewares/auth.js")
const {postAppointment, getAllAppointment,updateAppointmentStatus,deleteAppointment} = require("../controllers/appointmentControllers.js")
router.post("/post",isPatientAuthenticated, postAppointment)
router.get("/getall",isAdminAuthenticated, getAllAppointment)
router.put("/update/:id",isAdminAuthenticated,updateAppointmentStatus)
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointment)



module.exports =router