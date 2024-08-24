// models/Hospital.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HospitalOPTSchema = new Schema({
  Price: {
    type: String,
    required: true
  },
    validity:{
    type: String,
    required: true
    },
  HospitalID: {
    type: mongoose.Schema.ObjectId,
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('HospitalOPT', HospitalOPTSchema);
