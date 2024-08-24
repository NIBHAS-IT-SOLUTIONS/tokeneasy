const router = require('express').Router();

const {addAdmin,AdminLogin}=require('../controllers/AdminControllers')
const {addHospital,getallHospitals,getHospitalbyID,UpdateHospitalByID,deleteHospitalByID,} = require('../controllers/hospitalControllers')
const {AddStaff,updateStaff,deleteStaff}=require('../controllers/HospitalStaffControllers')


router.post('/addhospital',addHospital)
router.get('/getallhospitals',getallHospitals)
router.post('/gethospitalbyid',getHospitalbyID)
router.post('/updatehospitalbyid',UpdateHospitalByID)
router.post('/deletehospitalbyid',deleteHospitalByID)

router.post('/addstaff',AddStaff)
router.post('/updatestaff',updateStaff)
router.post('/deletestaff',deleteStaff)

router.post('/addadmin',addAdmin)
router.post('/adminlogin',AdminLogin)



module.exports=router