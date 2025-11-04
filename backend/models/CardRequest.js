const mongoose = require('mongoose');

const cardRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  cardCategory: { type: String, enum: ['Credit Card','Debit Card']},
  cardType: { type: String, required:true },
  cardLimit: { type: Number },
  cardExpiryDate: { type: Date },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  cardNumber: { type: String }, // Assigned upon approval
  cvv:{type:String},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CardRequest', cardRequestSchema);