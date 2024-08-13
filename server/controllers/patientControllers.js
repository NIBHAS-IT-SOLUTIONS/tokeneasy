const express = require('express')
let Patient = require('../models/PatientModel');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Token = require("../models/token");
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");

module.exports = {
    signup: async (req, res) => {
        try{
        const {
            username,
            email,
            password
          } = req.body.patientdata;
          const patient = await Patient.findOne({ email: email });
          if (patient) return res.status(400).json({ msg: "Email Already Registered. " });

          const salt = await bcrypt.genSalt();
          const passwordHash = await bcrypt.hash(password, salt);
      
          const newPatient = new Patient({
            username,
            email,
            password: passwordHash,
            
          });
          const savedPatient = await newPatient.save();
          const token = await new Token({
            userId: savedPatient._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
          const url = `${process.env.BASE_URL}/quicktoken/api/patient/${savedPatient.id}/verify/${token.token}`;
          await sendEmail(savedPatient.email, "Verify Email", url);
          res.status(201).json({savedPatient, msg: "Registered Successfully An Email sent to your account please verify" });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
    },
    login: async(req,res) => {

        try {
            const { email, password } = req.body;
            const patient = await Patient.findOne({ email: email });
            if (!patient) return res.status(400).json({ msg: "User does not exist. " });
        
            const isMatch = await bcrypt.compare(password, patient.password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
        
            const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET_KEY);
            delete patient.password;
            res.status(200).json({ token, patient });
          } catch (err) {
            res.status(500).json({ error: err.message });
          }

    },
    verifyEmail:async(req,res)=>{
      
     var id=req.params.id
     var tokn=req.params.token
        try {
          //console.log(id,req.params.token)
          const patient = await Patient.findById(id);
         // console.log(patient)
          if (!patient) return res.status(400).send({ message: "Invalid link" });
          //
          
          const token = await Token.findOne({
            userId: patient._id,
            token: tokn,
          });
          if (!token) return res.status(400).send({ message: "Invalid link" });
      
          await Patient.findByIdAndUpdate(patient._id,{verified:true})
          var tokenid=token._id
          await Token.findByIdAndDelete(tokenid);
      
          res.status(200).send({ message: "Email verified successfully" });
        } catch (error) {
          res.status(500).send({ message: "Internal Server Error" });
        }
      }
    
}