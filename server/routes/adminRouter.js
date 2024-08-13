const router = require('express').Router();


let {addHospital,getallHospitals,getHospitalbyID}=require('../controllers/hosptalControllers')

router.post('/addhospital',addHospital)
router.get('/getallhospitals',getallHospitals)
router.post('/gethospitalbyid',getHospitalbyID)


module.exports=router