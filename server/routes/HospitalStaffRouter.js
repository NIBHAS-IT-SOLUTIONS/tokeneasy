const router=require('express').Router()


const { addDoctor,UpdateDoctor,deleteDoctor } = require('../controllers/DoctorControllers')
const {getHospitalbyID,UpdateHospitalByID,AddDepartment,UpdateDepartment,deleteDepartment,AddStaff,updateStaff,deleteStaff} = require('../controllers/hospitalControllers')


router.post('/gethospitalbyid',getHospitalbyID)
router.post('/updatehospital',UpdateHospitalByID)

router.post('/adddepartment',AddDepartment)
router.post('/updatedepartment',UpdateDepartment)
router.delete('/deletedepartment',deleteDepartment)

router.post('/adddoctor',addDoctor)
router.post('/updatedoctor',UpdateDoctor)
router.delete('/deletedoctor',deleteDoctor)

router.post('/addstaff',AddStaff)
router.post('/updatestaff',updateStaff)
router.post('/deletestaff',deleteStaff)




module.exports=router