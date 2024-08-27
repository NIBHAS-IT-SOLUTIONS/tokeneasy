const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimeSlotSchema = new Schema({
  OPType: {
    type: String,
    required: true,
    enum: [
      "Morning OP",
      "Evening OP",
      "Special OP",
    ],
  },
  startTime: {
    type: String, // e.g., "09:00 AM"
    required: true,
  },
  endTime: {
    type: String, // e.g., "12:00 PM"
    required: true,
  },
  slots:{
    type:Number,
    required:true
  }
});

const AvailabilitySchema = new Schema({
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  timeSlots: [TimeSlotSchema], // Multiple time slots for a single day
});

const LeaveSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  MorningOP: Boolean, // Overrides default start time
  EveningOP: Boolean, // Overrides default end time
  onLeave: {
    type: Boolean,
    default: true,
  },
  notes: String, // Any specific notes for this day
});

const DoctorSchema = new Schema(
  {
    Doctorname: {
      type: String,
      required: true,
    },
    Department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    contactInfo: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },

    availability: [AvailabilitySchema],
    leave: [LeaveSchema], // New schema for managing attendance
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", DoctorSchema);
