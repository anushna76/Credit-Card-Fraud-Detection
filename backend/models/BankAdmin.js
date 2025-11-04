const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  bankName: { type: String,enum:['SBI Bank','ICICI Bank','BOB Bank','Axis Bank','Canara Bank','Indian Bank'] },
  email: { type: String, required: true, unique: true },
  password: { type: String, select:false,required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Admin', adminSchema);