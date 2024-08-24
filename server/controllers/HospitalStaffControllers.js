const HospitalStaff = require("../models/HospitalStaffModel");
const { default: mongoose, Mongoose } = require('mongoose');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
module.exports={

    loginStaff:async(req,res)=>{
        try {
            const { email, password } = req.body;
            const staff = await HospitalStaff.findOne({ email: email });
            if (!staff) return res.status(400).json({ msg: "Staff does not exist. " });
        
            const isMatch = await bcrypt.compare(password, staff.password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
        
            const token = jwt.sign({ id: staff._id }, process.env.JWT_SECRET_KEY);
            delete staff.password;
            res.status(200).json({ token, staff });
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    },
    AddStaff:async(req,res)=>{
        try{
            let {
                username,
                email,
                password,
                hospitalId
              } = req.body.staffdata;
            // hospitalId:new mongoose.Types.ObjectId(hospitalId)
              const staff = await HospitalStaff.findOne({ email: email });
              if (staff) return res.status(400).json({ msg: "Email Already Registered. " });
    
              const salt = await bcrypt.genSalt();
              const passwordHash = await bcrypt.hash(password, salt);
          
              const newstaff = new HospitalStaff({
                username,
                email,
                password: passwordHash,
                hospitalId
              });
              const savedstaff = await newstaff.save();
              res.status(201).json({savedstaff, msg: "Registered Successfully " });
            } catch (err) {
              res.status(500).json({ error: err.message });
            }
    },
    updateStaff:(req,res)=>{

    },
    deleteStaff:(req,res)=>{

    },
    

}