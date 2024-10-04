const express = require('express')

let Hospital=require('../models/HospitalModel');  
const DepartmentModel = require('../models/DepartmentModel');
const { default: mongoose, Mongoose } = require('mongoose');
const HospitalOPModel = require('../models/HospitalOPModel');

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
    
    getallLocations:async (req,res)=>{

        
        try {
    // Use distinct to get unique locations
    const uniqueLocations = await Hospital.distinct('location');

    if (uniqueLocations.length < 1) {
      return res.status(400).json({ msg: "No Hospital Locations Found" });
    }

    res.status(200).json(uniqueLocations);
  } catch (err) {
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
    },

    getHospitalbyLocation:async(req,res)=>{
        let location=req.body.location
        console.log(location);
        
        try{
            const Hospitals=await Hospital.find({location:location})
            if(Hospitals.length<1) return res.status(400).json({ msg: "No Hospitals Found" });
            res.status(201).json(Hospitals);
        }
        catch(err){
            res.status(500).json({ error: err.message });
        }  }
    ,
    UpdateHospitalByID:(req,res)=>{

    },
    deleteHospitalByID:(req,res)=>{
        
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
    getalldepartmentByHospital:async(req,res)=>{
       const  hospitalId=req.body.hospitalId
       try {
        // Find departments by hospitalId and select only the departmentName field
        const departments = await DepartmentModel.find({ hospitalId }).select('DepartmentName -_id');
    
        if (departments.length < 1) {
          return res.status(400).json({ msg: "No Departments Found for this Hospital" });
        }
    
        // Map the result to return an array of department names
        const departmentNames = departments.map(dept => dept.DepartmentName);
    
        res.status(200).json(departmentNames);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    
    },
    Addopdetails:async(req,res)=>{
        let {hospitalId,Price,validity}=req.body.HospitalOP
        HospitalID=new mongoose.Types.ObjectId(hospitalId)
        try{
            const opdetails=new HospitalOPModel({
                Price,
                HospitalID,
                validity
            })
            const checkopdetails=await HospitalOPModel.find({HospitalID})
            if (checkopdetails.length>0) return res.status(400).json({ msg: "OPDetails Already Exists. " });
            const newopdetails=await opdetails.save()
            res.status(201).json({newopdetails, msg: "OP Details Added Successfully" });
        }
        catch(err){
            res.status(500).json({ error: err.message });
        }

    },
    updateopdetails:async(req,res)=>{
        
    }
   

}