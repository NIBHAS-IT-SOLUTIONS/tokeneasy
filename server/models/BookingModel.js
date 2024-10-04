const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    startTime: {
      type: String, // or you can use Date if needed
      required: true,
    },
    endTime: {
      type: String, // or use Date
      required: true,
    },
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled', 'completed', 'rescheduled'],
    default: 'booked',
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
