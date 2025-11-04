// const mongoose = require('mongoose');

// const TransactionSchema = new mongoose.Schema({
//   trans_date_trans_time: String,
//   cc_num: String,
//   merchant: String,
//   category: String,
//   amt: String,  // <-- important: stored as string if required by model
//   first: String,
//   last: String,
//   gender: String,
//   street: String,
//   city: String,
//   state: String,
//   zip: String,
//   lat: Number,
//   long: Number,
//   city_pop: Number,
//   job: String,
//   dob: String,
//   trans_num: String,
//   unix_time: Number,
//   merch_lat: Number,
//   merch_long: Number,
//   merch_zipcode: String,
//   is_fraud: Number,  // 0 or 1

//   // Optional prediction result
// //   prediction: {
// //     is_fraud: Number,
// //     confidence: {
// //       "0": Number,
// //       "1": Number
// //     }
// //   }
// });

// module.exports = mongoose.model('Transaction', TransactionSchema);
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  cardRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'CardRequest' }, // Reference to CardRequest
  cc_num: { type: String, required: true }, // Will be populated from CardRequest.cardNumber
  trans_date_trans_time: { type: String, required: true },
  merchant: { type: String, required: true },
  category: { type: String, required: true },
  amt: { type: String, required: true }, // Stored as string as per requirement
  first: { type: String, required: true },
  last: { type: String, required: true },
  gender: { type: String, required: true,enum: ['M', 'F'] }, // M or F  
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  city_pop: { type: Number, required: true },
  job: { type: String, required: true },
  dob: { type: String, required: true },
  trans_num: { type: String, required: true },
  unix_time: { type: Number, default: () => Math.floor(Date.now() / 1000) },
  merch_lat: { type: Number, required: true },
  merch_long: { type: Number, required: true },
  merch_zipcode: { type: String, required: true },
  is_fraud: { type: Number, enum: [0, 1], default: 0 }, // 0 or 1

  // Optional prediction result
  // prediction: {
  //   is_fraud: Number,
  //   confidence: {
  //     "0": Number,
  //     "1": Number
  //   }
  // }
});

module.exports = mongoose.model('Transaction', TransactionSchema);