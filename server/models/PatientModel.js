const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    username: { type: String, trim: true },
    password: { type: String },
    email: { type: String,unique:false},
    emailverified: { type: Boolean, default: false },
    phoneNumber: {
      type: String,
      unique:false
    },
    googleId: {
      type: String,
      unique:false
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
