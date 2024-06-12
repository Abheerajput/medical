const express = require("express");

const {isAdminAuthenticated,isPatientAuthenticated} = require("../middlewares/auth.js")
const {patientRegister,login,addNewAdmin,getAllDoctors ,getUserDetails,logoutAdmin,logoutPatient,addNewDoctor}= require("../controllers/userController.js")

const router = express.Router();

router.post("/patient/register", patientRegister)
router.post("/login", login)
router.post("/admin",isAdminAuthenticated,addNewAdmin)
router.get("/doctor",getAllDoctors)
router.get("/admin/me",isAdminAuthenticated,getUserDetails)
router.get("/patient/me",isPatientAuthenticated,getUserDetails)
router.get("/admin/logout",isAdminAuthenticated,logoutAdmin)
router.get("/patient/logout",isPatientAuthenticated,logoutPatient)
router.post("/add/doctor",isAdminAuthenticated,addNewDoctor)

module.exports =router