
const Admin=require('../models/AdminModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
module.exports={
    addAdmin:async(req,res)=>{
        try{
            const {
                username,
                email,
                password
              } = req.body.admindata;
              const admin = await Admin.findOne({ email: email });
              if (admin) return res.status(400).json({ msg: "Email Already Registered. " });
    
              const salt = await bcrypt.genSalt();
              const passwordHash = await bcrypt.hash(password, salt);
          
              const newAdmin = new Admin({
                username,
                email,
                password: passwordHash,
                
              });
              const savedAdmin = await newAdmin.save();
              res.status(201).json({savedAdmin, msg: "Registered Successfully " });
            } catch (err) {
              res.status(500).json({ error: err.message });
            }
    },
    AdminLogin:async(req,res)=>{
        try {
            const { email, password } = req.body;
            const admin = await Admin.findOne({ email: email });
            if (!admin) return res.status(400).json({ msg: "Admin does not exist. " });
        
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
        
            const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY);
            delete admin.password;
            res.status(200).json({ token, admin });
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    },
    getAllAdmins:(req,res)=>{

    },
    getAdminByID:(req,res)=>{

    },
    updateAdmin:(req,res)=>{
        
    }

    
}