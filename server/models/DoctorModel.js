const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    
const TimeSlotSchema = new Schema({
  startTime: {
    type: String,  // e.g., "09:00 AM"
    required: true
  },
  endTime: {
    type: String,  // e.g., "12:00 PM"
    required: true
  },
  breakTimes: [{
    start: String,  // e.g., "10:30 AM"
    end: String    // e.g., "10:45 AM"
  }]
});

const AvailabilitySchema = new Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  timeSlots: [TimeSlotSchema]  // Multiple time slots for a single day
});
    
    const AttendanceSchema = new Schema({
      date: {
        type: Date,
        required: true
      },
      startTime: String,  // Overrides default start time
      endTime: String,  // Overrides default end time
      isPresent: {
        type: Boolean,
        default: true
      },
      notes: String  // Any specific notes for this day
    });
    
    const DoctorSchema = new Schema({
      Doctorname: {
        type: String,
        required: true
      },
      Department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
      },
      hospitalId: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
      },
      contactInfo: {
        type: String,
        required: true
      },
      Specialization: {
        type: String,
        required: true
      },
      
      availability: [AvailabilitySchema],
      attendance: [AttendanceSchema]  // New schema for managing attendance
    },{ timestamps: true });
    
    module.exports = mongoose.model('Doctor', DoctorSchema);
    