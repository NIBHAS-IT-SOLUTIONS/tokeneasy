const router = require('express').Router();
const { addDoctor,UpdateDoctor,deleteDoctor,adddoctorleave,doctoravailable,updateLeave,getLeaves } = require('../controllers/DoctorControllers')
let {signup,login,verifyEmail,addOPTicket,loginwithPhone,loginwithGoogle}=require('../controllers/patientControllers')
const Token = require("../models/token");
const sendEmail=require('../utils/sendMail')
const sendSMS=require('../utils/sendSMS')

router.post('/signup',signup)
router.post('/login',login)
router.post('/addopticket',addOPTicket)

router.post('/loginwithphone',loginwithPhone)
router.post('/loginwithgoogle',loginwithGoogle)


router.get("/:id/verify/:token/", verifyEmail);
router.get('/sendemail',sendEmail)
//router.get('/sendsms',sendSMS)

router.get('/getallhospitals')
router.get('/getallhospitalsbylocation/:location')

router.get('/getalldepartments')
router.get('/getdepartmentsbyhospitals/:hospitalid')

router.get('/getalldoctors')
router.get('/getalldoctorsbyhospital/:hospitalid')
router.get('/getdoctorsbydepartments/:departmentid')
router.get('/doctors/:id/available-dates',doctoravailable)












module.exports=router