const express = require('express')

let Hospital=require('../models/HospitalModel');  
const DepartmentModel = require('../models/DepartmentModel');
const { default: mongoose, Mongoose } = require('mongoose');

module.exports={
    addHospital:async(req,res)=>{
        try{const {HospitalName,location,address,phone,email}=req.body.hospital 
        const cats = await Hospital.findOne({ HospitalName: HospitalName,location:location });
          if (cats) return res.status(400).json({ msg: "Hospital Already Exists. " });
        const newHospital = new Hospital({
            HospitalName,
            location,
            address,      
            phone,
            email
          });
         
          const savedHospital = await newHospital.save();
          res.status(201).json({savedHospital, msg: "Hospital Added Successfully" });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
    },
    getallHospitals:async (req,res)=>{

        
        try{


            const Hospitals=await Hospital.find()
            if(Hospitals.length<1) return res.status(400).json({ msg: "No Hospitals Found" });
            res.status(201).json(Hospitals);
        }
        catch(err){
            res.status(500).json({ error: err.message });
        }  
    },

    getHospitalbyID:async(req,res)=>{
        let hospitalID=req.body.hospitalID
        //console.log(hospitalID);
        
        try{
            const Hospitals=await Hospital.findById(hospitalID)
            if(Hospitals==null) return res.status(400).json({ msg: "No Hospitals Found" });
            res.status(201).json(Hospitals);
        }
        catch(err){
            res.status(500).json({ error: err.message });
        }  
    }
    ,
    UpdateHospitalByID:(req,res)=>{

    },
    AddDepartment:async(req,res)=>{
            let {hospitalId,DepartmentName}=req.body.Department
            hospitalId=new mongoose.Types.ObjectId(hospitalId)
            try{
                const dept=new DepartmentModel({
                    DepartmentName,
                    hospitalId
                })
                const checkdept=await DepartmentModel.find({DepartmentName,hospitalId})
                if (checkdept.length>0) return res.status(400).json({ msg: "Department Already Exists. " });
                const newdept=await dept.save()
                res.status(201).json({newdept, msg: "Department Added Successfully" });
            }
            catch(err){
                res.status(500).json({ error: err.message });
            }
    },
    UpdateDepartment:(req,res)=>{

    },
    deleteDepartment:(req,res)=>{

    },
    AddStaff:(req,res)=>{
        
    },
    updateStaff:(req,res)=>{

    },
    deleteStaff:(req,res)=>{

    }

}