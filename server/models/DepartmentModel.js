const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const departmentSchema=new mongoose.Schema({
    DepartmentName:{
        type:String,
        required:true
    },
    hospitalId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Hospital',
        required: true
      }
},{timestamp:true})

module.exports =mongoose.model('Department',departmentSchema)