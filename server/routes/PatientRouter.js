const router = require('express').Router();
let {signup,login,verifyEmail}=require('../controllers/patientControllers')
const Token = require("../models/token");
const sendEmail=require('../utils/sendMail')

router.post('/signup',signup)
router.post('/login',login)
router.get("/:id/verify/:token/", verifyEmail);
router.get('/sendemail',sendEmail)




module.exports=router