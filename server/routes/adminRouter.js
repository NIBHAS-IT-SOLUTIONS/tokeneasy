const router = require('express').Router();

const {addAdmin}=require('../controllers/AdminControllers')
const {addHospital,getallHospitals,getHospitalbyID,AddStaff,updateStaff,deleteStaff} = require('../controllers/hospitalControllers')

router.post('/addhospital',addHospital)
router.get('/getallhospitals',getallHospitals)
router.post('/gethospitalbyid',getHospitalbyID)

router.post('/addstaff',AddStaff)
router.post('/updatestaff',updateStaff)
router.post('/deletestaff',deleteStaff)

router.post('/addadmin',addAdmin)



module.exports=router