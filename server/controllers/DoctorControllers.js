const DoctorModel = require("../models/DoctorModel");
const Doctor = require("../models/DoctorModel");
const moment = require('moment');
module.exports = {
  addDoctor: async (req, res) => {
    const {
      Doctorname,
      specialization,
      hospitalId, 
      Department,
      contactInfo,
      availability,
    } = req.body.DoctorDetails;

    try {
      const newDoctor = new DoctorModel({
        Doctorname,
        specialization,
        Department,
        hospitalId,
        contactInfo,
        availability,
      });
      const checkdoctor = await DoctorModel.find({
        Doctorname,
        Department,
        contactInfo,
      });
     if(checkdoctor.length>0) return res.status(400).json({ msg: "Doctor Already Added " });
      const savedDoctor = await newDoctor.save();
      res.status(201).json(savedDoctor);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  UpdateDoctor: (req, res) => {},
  deleteDoctor: (req, res) => {},
  getdoctorsbyHospital:async(req,res)=>{
    const  hospitalId  = req.body.hospitalId;
    try {
      // Find doctors by hospitalId
      const doctors = await Doctor.find({ hospitalId }).select('Doctorname specialization contactInfo availability');
  
      if (doctors.length < 1) {
        return res.status(400).json({ msg: "No Doctors Found in this Hospital" });
      }
  
      res.status(200).json(doctors);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getdoctorsbydepartment:async (req, res) => {
      const  departmentId  = req.body.departmentId;
    
      try {
        // Find doctors by departmentId
        const doctors = await DoctorModel.find({Department:departmentId }).select('Doctorname specialization contactInfo availability');
    
        if (doctors.length < 1) {
          return res.status(400).json({ msg: "No Doctors Found in this Department" });
        }
    
        res.status(200).json(doctors);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  },
  adddoctorleave: async (req, res) => {
    const { id } = req.params;
    const { date, onLeave, MorningOP, EveningOP, notes } =
      req.body.doctorleave;

    try {
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        return res.status(404).json({ error: "Doctor not found" });
      }
      // Add the attendance record
      const newLeave = {
        date: new Date(date),
        onLeave,
        MorningOP,
        EveningOP,
        notes,
      };  
      doctor.leave.push(newLeave);
      await doctor.save();
      res.status(200).json(doctor);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateLeave:async (req, res) => {
    const { id, leaveId } = req.params;
    const { MorningOP, EveningOP, notes,onLeave } = req.body.updateleave;
  
    try {
      // Find the doctor by ID
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
  
      // Find the leave record in the doctor's leave array
      const leave = doctor.leave.id(leaveId);
      if (!leave) {
        return res.status(404).json({ error: 'Leave record not found' });
      }
  
      // Update the leave record
      leave.onLeave = onLeave !== undefined ? onLeave : leave.onLeave;
      leave.MorningOP = MorningOP !== undefined ? MorningOP : leave.MorningOP;
      leave.EveningOP = EveningOP !== undefined ? EveningOP : leave.EveningOP;
      leave.notes = notes !== undefined ? notes : leave.notes;
  
      await doctor.save();
  
      res.status(200).json(leave);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }}
    ,
    getLeaves:async(req,res)=>{
      const { id } = req.params;

  try {
    // Find the doctor by ID
    const doctor = await Doctor.findById(id).exec();
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Get the leave records
    const leaveRecords = doctor.leave.map(leave => ({
      date: moment(leave.date).format('YYYY-MM-DD'),
      MorningOP: leave.MorningOP,
      EveningOP: leave.EveningOP,
      onLeave: leave.onLeave,
      notes: leave.notes || ''
    }));

    // Sort leave records by date
    leaveRecords.sort((a, b) => moment(a.date).diff(moment(b.date)));

    res.status(200).json(leaveRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
    },
  doctoravailable: async (req, res) => {
    const { id } = req.params;

    try {
      // Find the doctor by ID
      const doctor = await Doctor.findById(id).exec();
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
  
      // Get availability and leave records
      const availability = doctor.availability;
      const leaves = doctor.leave;
  
      // Generate dates for the next 15 days
      const today = moment().startOf('day');
      const endDate = moment().add(15, 'days').endOf('day');
      let availableDates = [];
  
      for (let date = today.clone(); date.isBefore(endDate); date.add(1, 'days')) {
        const dayOfWeek = date.format('dddd'); // Get the day of the week (e.g., "Monday")
  
        // Check if the day is in the doctor's availability
        const avail = availability.find(a => a.day === dayOfWeek);
        if (!avail) continue;
  
        // Check if the doctor is on leave for this date
        const leave = leaves.find(leave => {
          const leaveDate = moment(leave.date).startOf('day');
          return leaveDate.isSame(date, 'day');
        });
  
        if (leave) {
          // If the doctor is on leave for the morning OP
          if ((leave.MorningOP ==true && leave.onLeave==false)) {
            // Only include dates with evening OP slots
            if (avail.timeSlots.some(slot => slot.OPType === 'Evening OP')) {
              availableDates.push({
                date: date.format('YYYY-MM-DD'),
                timeSlots: avail.timeSlots.filter(slot => slot.OPType === 'Evening OP')
              });
            }
          } else if ((leave.EveningOP ==true && leave.onLeave==false)) {
            // If the doctor is on leave for the evening OP
            // Only include dates with morning OP slots
            if (avail.timeSlots.some(slot => slot.OPType === 'Morning OP')) {
              availableDates.push({
                date: date.format('YYYY-MM-DD'),
                timeSlots: avail.timeSlots.filter(slot => slot.OPType === 'Morning OP')
              });
            }
          }
        } else {
          // If no leave record, include all available OP slots
          availableDates.push({
            date: date.format('YYYY-MM-DD'),
            timeSlots: avail.timeSlots
          });
        }
      }
  
      // Sort available dates in ascending order
      availableDates.sort((a, b) => moment(a.date).diff(moment(b.date)));
  
      res.status(200).json(availableDates);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  slotavailaility:async(req,res)=>{
    const { doctorId } = req.params;
  const { day, slotId } = req.query;

  try {
    const doctor = await Doctor.findOne(
      { _id: doctorId, 'availability.day': day, 'availability.timeSlots._id': slotId },
      { 'availability.$': 1 }
    );

    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor not found or no availability for the day' });
    }

    const availability = doctor.availability[0];
    const timeSlot = availability.timeSlots.id(slotId);
    const availableSlots = timeSlot.totalSlots - timeSlot.bookedSlots;

    res.status(200).json({
      day: availability.day,
      OPType: timeSlot.OPType,
      startTime: timeSlot.startTime,
      endTime: timeSlot.endTime,
      totalSlots: timeSlot.totalSlots,
      bookedSlots: timeSlot.bookedSlots,
      slotStatus: timeSlot.slotStatus, // Returns the array of slot statuses
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
  },
  
};
