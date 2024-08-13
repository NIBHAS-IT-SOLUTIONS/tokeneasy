const express = require('express')

let Hospital=require('../models/HospitalModel')  

module.exports={
    addToken:async(req,res)=>{
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
}