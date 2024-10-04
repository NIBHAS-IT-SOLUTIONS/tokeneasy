const express = require("express");
let Patient = require("../models/PatientModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/token");
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");
const OPmodel = require("../models/OPmodel");
const otpGenerator = require("otp-generator");
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const servicesid = process.env.TWILIO_SERVICE_SID;

const { default: mongoose, Mongoose } = require("mongoose");
const Admin = require("../models/AdminModel");
const sendSMS = require("../utils/sendSMS");
const { log } = require("console");
const Booking = require("../models/BookingModel");
const BookingModel = require("../models/BookingModel");
module.exports = {
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body.patientdata;
      const patient = await Patient.findOne({ email: email });
      if (patient)
        return res.status(400).json({ msg: "Email Already Registered. " });

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newPatient = new Patient({
        username,
        email,
        password: passwordHash,
      });
      const savedPatient = await newPatient.save();
      const token = await new Token({
        userId: savedPatient._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      const url = `${process.env.BASE_URL}/quicktoken/api/patient/${savedPatient.id}/verify/${token.token}`;
      await sendEmail(savedPatient.email, "Verify Email", url);
      res.status(201).json({
        savedPatient,
        msg: "Registered Successfully An Email sent to your account please verify",
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const patient = await Patient.findOne({ email: email });
      if (!patient)
        return res.status(400).json({ msg: "User does not exist. " });

      const isMatch = await bcrypt.compare(password, patient.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credentials. " });

      const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET_KEY);
      delete patient.password;
      res.status(200).json({ token, patient });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  verifyEmail: async (req, res) => {
    var id = req.params.id;
    var tokn = req.params.token;
    try {
      //console.log(id,req.params.token)
      const patient = await Patient.findById(id);
      // console.log(patient)
      if (!patient) return res.status(400).send({ message: "Invalid link" });
      //

      const token = await Token.findOne({
        userId: patient._id,
        token: tokn,
      });
      if (!token) return res.status(400).send({ message: "Invalid link" });

      await Patient.findByIdAndUpdate(patient._id, { emailverified: true });
      var tokenid = token._id;
      await Token.findByIdAndDelete(tokenid);

      res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  addOPTicket: async (req, res) => {
    const { OPticketNo, UserID, HospitalID } = req.body.opticket;

    try {
      const newOP = new OPmodel({
        OPticketNo,
        UserID: new mongoose.Types.ObjectId(UserID),
        HospitalID: new mongoose.Types.ObjectId(HospitalID),
      });
      let op = await OPmodel.find({ OPticketNo, UserID, HospitalID });
      console.log();
      if (op.length > 0)
        return res
          .status(400)
          .json({ msg: "OP Ticket / MRD already Registered. " });

      const savedOP = await newOP.save();
      res
        .status(201)
        .json({ savedOP, msg: "OPtickNo / MRD No Added Successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  loginwithPhone: async (req, res) => {
    if (req.body.phonenumber) {
      try {
        var OTPGenerated = otpGenerator.generate(5, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        });
        console.log(OTPGenerated);
        //const {phonenumber}=req.body
        phonenumber = "+918086094884";

        const client = twilio(accountSid, authToken);

        async function createVerification() {
          const verification = await client.verify.v2
            .services(servicesid)
            .verifications.create({
              channel: "sms",
              FriendlyName: "Quick Token",
              customCode: OTPGenerated,
              to: phonenumber,
            });

          console.log(verification);
        }
        createVerification();
        res.status(201).json({ msg: "OTP Send to The Phone" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
    if (req.body.OTPentered) {
      try {
        const { OTPentered, phonenumber } = req.body.OTPentered;
        const client = twilio(accountSid, authToken);

        async function createVerificationCheck() {
          const verificationCheck = await client.verify.v2
            .services(servicesid)
            .verificationChecks.create({
              code: OTPentered,
              to: phonenumber,
            });
          if (verificationCheck.status === "approved") {
            const checkpatient = await Patient.find({
              phoneNumber: phonenumber,
            });
            if (checkpatient) {
              const token = jwt.sign(
                { id: checkpatient._id },
                process.env.JWT_SECRET_KEY
              );
              // res.status(200).json({ token, checkpatient });
              res.status(201).json({
                token,
                msg: verificationCheck.status,
                patientdata: checkpatient,
              });
            } else {
              const newPatient = new Patient({
                phoneNumber: phonenumber,
              });
              const savedPatient = await newPatient.save();
              const token = jwt.sign(
                { id: savedPatient._id },
                process.env.JWT_SECRET_KEY
              );
              res.status(201).json({
                token,
                msg: verificationCheck.status,
                patientdata: savedPatient,
              });
            }
          }
          res.status(401).json({ msg: verificationCheck.status });
        }

        createVerificationCheck();
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  },
  loginwithGoogle: async (req, res) => {
    const { username, email, googleId } = req.body;
    try {
      const checkpatient = await Patient.findOne({
        email: email,
      });
      if (checkpatient != null) {
        if (checkpatient.googleId == null) {
          const updatedPatient = await Patient.findByIdAndUpdate(
            checkpatient._id,
            { googleId, email },
            
            
          );
          console.log(updatedPatient);
        }
        const token = jwt.sign(
          { id: checkpatient._id },
          process.env.JWT_SECRET_KEY
        );
        // res.status(200).json({ token, checkpatient });
        res.status(201).json({
          token,
          patientdata: checkpatient,
        });
      } else {
        const newPatient = new Patient({
          username: username,
          email: email,
          googleId: googleId,
          emailverified: true,
        });
        const savedPatient = await newPatient.save();
        const token = jwt.sign(
          { id: savedPatient._id },
          process.env.JWT_SECRET_KEY
        );
        res.status(201).json({
          token,
          patientdata: savedPatient,
        });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  bookslot:async(req,res)=>{
   // Book a specific slot in a time slot
router.post('/book-slot', async (req, res) => {
  const { doctorId, slotIndex, day, slotId } = req.body;

  try {
    // Find the time slot by doctorId and day, and check if the specific slot is available
    const doctor = await Doctor.findOne({
      _id: doctorId,
      'availability.day': day,
      'availability.timeSlots._id': slotId,
      [`availability.timeSlots.$.slotStatus.${slotIndex}`]: false, // Ensure the slot is not booked
    });

    if (!doctor) {
      return res.status(400).json({ msg: 'Slot is unavailable or already booked.' });
    }

    // Update the slotStatus to mark it as booked and increment the bookedSlots count
    const updatedDoctor = await Doctor.findOneAndUpdate(
      {
        _id: doctorId,
        'availability.day': day,
        'availability.timeSlots._id': slotId,
      },
      {
        $set: {
          [`availability.$.timeSlots.$[slot].slotStatus.${slotIndex}`]: true, // Mark slot as booked
        },
        $inc: {
          'availability.$.timeSlots.$[slot].bookedSlots': 1, // Increment the bookedSlots count
        },
      },
      {
        arrayFilters: [{ 'slot._id': slotId }],
        new: true, // Return the updated document
      }
    );

    res.status(200).json({ msg: 'Slot booked successfully', doctor: updatedDoctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

  },
  getbookings:async(req,res)=>{
    const { patientId } = req.params;

  try {
    const bookings = await Booking.find({ patientId })
      .populate('doctorId', 'Doctorname specialization') // Populate doctor details
      .populate('patientId', 'name email') // Optionally populate patient details
      .sort({ date: 1 }); // Sort by appointment date

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this patient.' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
  }
};
