// models/Hospital.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HospitalOPTSchema = new Schema({
  Price: {
    type: Number,
    required: true
  },
    validity:{
    type: Number,
    required: true
    },
  HospitalID: {
    type: mongoose.Schema.ObjectId,
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('HospitalOPT', HospitalOPTSchema);
