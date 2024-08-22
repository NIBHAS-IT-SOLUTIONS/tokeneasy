// models/Hospital.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OPTicketSchema = new Schema({
  OPticketNo: {
    type: String,
    required: true
  },
  UserID:{
    type: mongoose.Schema.ObjectId,
    required: true
  },
  HospitalID: {
    type: mongoose.Schema.ObjectId,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('OPticket', OPTicketSchema);
