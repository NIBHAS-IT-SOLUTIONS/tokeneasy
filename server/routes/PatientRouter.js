const router = require('express').Router();
const { doctoravailable,getdoctorsbydepartment,getdoctorsbyHospital,slotavailaility } = require('../controllers/DoctorControllers')
let {signup,login,verifyEmail,addOPTicket,loginwithPhone,loginwithGoogle,bookslot,getbookings}=require('../controllers/patientControllers')
const {getHospitalbyLocation,getHospitalbyID,getallHospitals,getallLocations,getalldepartmentByHospital} = require('../controllers/hospitalControllers')
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

router.get('/getallhospitals',getallHospitals)
router.get('/getalllocations',getallLocations)
router.post('/getallhospitalsbylocation',getHospitalbyLocation)
router.post('/gethospitalbyid',getHospitalbyID)



router.get('/getalldepartments')
router.post('/getdepartmentsbyhospitals/',getalldepartmentByHospital)



router.get('/getalldoctors')
router.post('/getalldoctorsbyhospital/',getdoctorsbyHospital)
router.post('/getdoctorsbydepartments/',getdoctorsbydepartment)
router.get('/doctors/:id/available-dates',doctoravailable)
router.get('/doctors/:doctorId/availability/:date')
router.post('/bookings',bookslot)
router.get('/:patientId/bookings',getbookings)

router.get('/doctor/:doctorId/availability', slotavailaility);/*{
  "doctorId": "64f58c8f94307e001c344567",
  "slotIndex": 34, // 0-based index, so 34 represents the 35th slot
  "day": "Monday",
  "slotId": "64f58d1f94307e001c344568"
}
*/ 
  











module.exports=router