// models/Hospital.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HospitalSchema = new Schema({
  HospitalName: {
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Hospital', HospitalSchema);
