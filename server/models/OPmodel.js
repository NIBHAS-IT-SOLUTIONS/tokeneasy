// models/Hospital.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HospitalSchema = new Schema({
  OPticketNo: {
    type: String,
    required: true
  },
  UserID:{
    type: String,
    required: true
  },
  HospitalID: {
    type: String,
    required: true
  },
  contactInfo: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Hospital', HospitalSchema);
