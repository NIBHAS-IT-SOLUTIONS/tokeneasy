const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  username: { type: String, required: true,trim: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  verified: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;