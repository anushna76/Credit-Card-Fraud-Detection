const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
   bankName: { type: String,enum:['SBI Bank','ICICI Bank','BOB Bank','Axis Bank','Canara Bank','Indian Bank'] },
  gender: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  lat: { type: Number }, // Captured at runtime
  long: { type: Number }, // Captured at runtime
  city_pop: { type: Number, required: true },
  job: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String,select:false, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);