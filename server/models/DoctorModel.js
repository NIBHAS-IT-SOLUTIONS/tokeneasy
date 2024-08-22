const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    hospitalId: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      specialization: {
        type: String,
        required: true
      },
      contactInfo: {
        type: String,
        required: true
      }
    }, { timestamps: true });
    
    module.exports = mongoose.model('Doctor', DoctorSchema);
