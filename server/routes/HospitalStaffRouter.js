const router=require('express').Router()


const { addDoctor,UpdateDoctor,deleteDoctor,adddoctorleave,doctoravailable,updateLeave,getLeaves } = require('../controllers/DoctorControllers')
const {getHospitalbyID,UpdateHospitalByID,AddDepartment,UpdateDepartment,deleteDepartment,Addopdetails,updateopdetails,deleteopdetails} = require('../controllers/hospitalControllers')
const {AddStaff,updateStaff,deleteStaff,loginStaff}=require('../controllers/HospitalStaffControllers')

router.post('/gethospitalbyid',getHospitalbyID)
router.post('/updatehospital',UpdateHospitalByID)

router.post('/adddepartment',AddDepartment)
router.post('/updatedepartment',UpdateDepartment)
router.delete('/deletedepartment',deleteDepartment)

router.post('/adddoctor',addDoctor)
router.post('/updatedoctor',UpdateDoctor)
router.delete('/deletedoctor',deleteDoctor)

router.post('/doctors/:id/addleave',adddoctorleave)
router.get('/doctors/:id/getleaves',getLeaves)
router.put('/doctors/:id/leave/:leaveId',updateLeave)

router.get('/doctors/:id/available-dates',doctoravailable)

router.post('/addstaff',AddStaff)
router.post('/updatestaff',updateStaff)
router.post('/deletestaff',deleteStaff)

router.post('/stafflogin',loginStaff)

router.post('/addhospitalopdetails',Addopdetails)
router.post('/updatehospitalopdetails',updateopdetails)
//router.post('/deletehospitalopdetails',deleteopdetails)





module.exports=router