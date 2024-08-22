const router = require('express').Router();


const {addHospital,getallHospitals,getHospitalbyID} = require('../controllers/hosptalControllers')

router.post('/addhospital',addHospital)
router.get('/getallhospitals',getallHospitals)
router.post('/gethospitalbyid',getHospitalbyID)



module.exports=router