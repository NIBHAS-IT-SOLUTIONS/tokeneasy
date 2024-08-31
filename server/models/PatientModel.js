const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  username: { type: String,trim: true },
  password: { type: String},
  email: { type: String, unique: true },
  emailverified: { type: Boolean, default: false },
  phoneNumber: {
    type: String,
    unique: true,
  },
  googleId: {
    type: String,
    unique: true
  }
}, {
  timestamps: true,
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;