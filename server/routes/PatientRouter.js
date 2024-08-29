const router = require('express').Router();
let {signup,login,verifyEmail,addOPTicket,loginwithPhone}=require('../controllers/patientControllers')
const Token = require("../models/token");
const sendEmail=require('../utils/sendMail')
const sendSMS=require('../utils/sendSMS')

router.post('/signup',signup)
router.post('/login',login)
router.post('/addopticket',addOPTicket)

router.post('/loginwithphone',loginwithPhone)

router.get("/:id/verify/:token/", verifyEmail);
router.get('/sendemail',sendEmail)
//router.get('/sendsms',sendSMS)









module.exports=router