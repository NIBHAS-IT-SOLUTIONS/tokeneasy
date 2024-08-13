const express = require('express')

let Hospital=require('../models/HospitalModel')  


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
        res.json({mesage:"hai"})
    }
     
}