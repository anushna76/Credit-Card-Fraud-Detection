const prediction = require('../Controllers/predict.js');
const express = require('express');
const axios = require('axios');
const router=express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/BankAdmin');
const Account = require('../models/Account');
const CardRequest = require('../models/CardRequest');
const DepositRequest = require('../models/DepositRequest');
const Transaction = require('../models/TransactionDetails');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const getGeolocation = require('../Utils/geolocation');


// User Routes
router.post('/predict',prediction)

router.get('/users/profile', auth, async (req, res) => {
  try {
    // 1. Get user (without password)
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2. Get user's account(s)
    const accounts = await Account.find({ userId: user._id });

    // 3. Get user's card requests (populate account info)
    const cardRequests = await CardRequest.find({ userId: user._id }).populate('accountId');

    // 4. Respond with all info
    res.json({
      user,
      accounts,
      cardRequests
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get Bank Admin Profile
router.get('/admin/profile', adminAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const userRequests = await User.find({ status: { $ne: 'approved' }, bankName: admin.bankName });
    const cardRequests = await CardRequest.find({ status: { $ne: 'approved' } }).populate('userId').populate('accountId');
    const depositRequests = await DepositRequest.find({ status: { $ne: 'approved' } }).populate('userId').populate('accountId');
    const useraccount = await Account.find({ bankName: req.admin.bankName }).populate('userId');

    res.json({
      admin,
      userRequests,
      cardRequests,
      depositRequests,
      useraccount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});





// User Routes
// 1. User Registration
router.post('/users/register', async (req, res) => {
  try {
    const { first, last, gender, bankName,street, city, state, zip, city_pop, job, dob, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const ip = req.ip;
    const { lat, long } = getGeolocation(ip);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      first,
      last,
      bankName,
      gender,
      street,
      city,
      state,
      zip,
      lat,
      long,
      city_pop,
      job,
      dob,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'User registered, awaiting admin approval' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// 2. User Login
router.post('/users/login', async (req, res) => {
  try {
    const { email, password, bankName } = req.body;
    if (!email || !password || !bankName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email, bankName }).select('+password');
    if (!user || !user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.status !== 'approved') {
      return res.status(403).json({ message: 'Account not approved yet' });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: false },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        first: user.first,
        last: user.last,
        bankName: user.bankName
      }
    });
  } catch (error) {
    console.log("server err", error);
    res.status(500).json({ message: 'Server error', error });
  }
});
// 3. Request Credit/Debit Card
router.post('/users/request-card', auth, async (req, res) => {
  try {
    const { cardType,  cardCategory } = req.body;
    const userId = req.user.id;

    const account = await Account.findOne({ userId });
    if (!account) return res.status(400).json({ message: 'No account found for user' });

    const cardRequest = new CardRequest({
      userId,
      accountId: account._id,
      cardType,
      cardCategory,
      // cardLimit: 1000, // Default limit, can be changed by admin
      // cardExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    });

    await cardRequest.save();
    res.status(201).json({ message: 'Card request submitted, awaiting admin approval' });
  } catch (error) {
    console.error('Card request error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// 4. Deposit Amount (Request to Admin)
router.post('/users/deposit', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    const account = await Account.findOne({ userId });
    if (!account) return res.status(400).json({ message: 'No account found for user' });

    const depositRequest = new DepositRequest({
      userId,
      accountId: account._id,
      amount,
    });

    await depositRequest.save();
    res.status(201).json({ message: 'Deposit request submitted, awaiting admin approval' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/users/buy', auth, async (req, res) => {
  try {
    console.log('REQ.BODY:', req.body);

    const { cardNumber, cvv, amt, merchant, category, merch_zipcode } = req.body;
    const userId = req.user.id;

    // Check for missing fields
    if (!amt || !merchant || !category || !merch_zipcode || !cvv || !cardNumber) {
      console.error('Missing field(s):', { amt, merchant, category, merch_zipcode, cvv, cardNumber });
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate CVV
    if (!/^\d{3,4}$/.test(cvv)) {
      console.error('Invalid CVV:', cvv);
      return res.status(400).json({ message: 'Invalid CVV: Must be 3 or 4 digits' });
    }

    // Validate card number
    if (!/^\d{16}$/.test(cardNumber)) {
      console.error('Invalid card number:', cardNumber);
      return res.status(400).json({ message: 'Invalid card number: Must be 16 digits' });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // Find account
    const account = await Account.findOne({ userId });
    if (!account) {
      console.error('Account not found for user:', userId);
      return res.status(400).json({ message: 'No account found for user' });
    }

    // Find approved card request and validate card number
    const cardRequest = await CardRequest.findOne({ userId,  cardNumber });
    if (!cardRequest) {
      console.error('No approved card found or card number does not match:', { userId, cardNumber });
      return res.status(400).json({ message: 'No approved card found or card number does not match' });
    }

    // Validate amount
    const amtNumber = parseFloat(amt);
    if (isNaN(amtNumber)) {
      console.error('Invalid amount:', amt);
      return res.status(400).json({ message: 'Invalid amount' });
    }
    if (account.balance < amtNumber) {
      console.error('Insufficient balance:', { balance: account.balance, amtNumber });
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Fetch user location at runtime
    let user_lat, user_long, merch_lat, merch_long;
    try {
      const geoResponse = await axios.get('https://geolocation-db.com/json/');
      user_lat = geoResponse.data.latitude;
      user_long = geoResponse.data.longitude;
      console.log('User Location:', { user_lat, user_long });
    } catch (geoError) {
      console.error('Geolocation error:', geoError.message);
      return res.status(503).json({ message: 'Unable to fetch user location' });
    }

    // Fetch merchant location based on merch_zipcode
    try {
      const geocodingResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${merch_zipcode}&key=${process.env.OPENCAGE_API_KEY}`
      );
      if (geocodingResponse.data.results.length > 0) {
        merch_lat = geocodingResponse.data.results[0].geometry.lat;
        merch_long = geocodingResponse.data.results[0].geometry.lng;
        console.log('Merchant Location:', { merch_lat, merch_long });
      } else {
        console.error('Invalid merchant zip code:', merch_zipcode);
        return res.status(400).json({ message: 'Invalid merchant zip code' });
      }
    } catch (geoError) {
      console.error('Geocoding error:', geoError.message);
      return res.status(503).json({ message: 'Unable to fetch merchant location' });
    }

    // Generate transaction
    const trans_num = Math.random().toString(36).substring(2, 15);
    const trans_date_trans_time = new Date().toLocaleString('en-IN', { 
                                  timeZone: 'Asia/Kolkata', 
                                  year: 'numeric', 
                                  month: '2-digit', 
                                  day: '2-digit', 
                                  hour: '2-digit', 
                                  minute: '2-digit', 
                                  second: '2-digit', 
                                  hour12: false 
                                  }).replace(/(\d+)\/(\d+)\/(\d+),/, '$3-$2-$1')
    const transaction = new Transaction({
      cc_num: cardNumber,
      trans_date_trans_time,
      merchant,
      category,
      amt: amt.toString(),
      first: user.first,
      last: user.last,
      gender: user.gender,
      street: user.street,
      city: user.city,
      state: user.state,
      zip: user.zip,
      lat: user_lat,
      long: user_long,
      city_pop: user.city_pop,
      job: user.job,
      dob: user.dob.toISOString().split('T')[0],
      trans_num,
      merch_lat,
      merch_long,
      merch_zipcode,
    });
    // console.log('Transaction:', transaction);
    // Call the predict function for fraud detection
    try {
      const predictionResult = await axios.post('http://localhost:8080/predict', {
        amt: transaction.amt,
        // trans_date_trans_time: transaction.trans_date_trans_time,
        trans_date_trans_time,
        cc_num: transaction.cc_num,
        merchant: transaction.merchant,
        category: transaction.category,
        amt: transaction.amt,
        first: transaction.first,
        last: transaction.last,
        gender: transaction.gender,
        street: transaction.street,
        city: transaction.city,
        state: transaction.state,
        zip: transaction.zip,
        lat: transaction.lat,
        long: transaction.long,
        city_pop: transaction.city_pop,
        job: transaction.job,
        dob: transaction.dob,
        trans_num: transaction.trans_num,
        unix_time: Math.floor(new Date(trans_date_trans_time).getTime() / 1000),
        merch_lat: transaction.merch_lat,
        merch_long: transaction.merch_long,
        merch_zipcode: transaction.merch_zipcode,
      });
       

      const { is_fraud, confidence } = predictionResult.data;
      transaction.is_fraud = is_fraud;
      transaction.prediction = {
        is_fraud,
        confidence,
      };




    } catch (predictionError) {
      console.error('Prediction error:', predictionError.message);
      return res.status(503).json({ message: 'Fraud detection service unavailable' });
    }

  //  Save transaction
    await transaction.save();
   

  // Update balance if not fraud
  
//   console.log('!amtNumber:', amtNumber, 'account.balance before:', account.balance);
  if (transaction.is_fraud === 0 || transaction.is_fraud === "0" || transaction.is_fraud === false) {
  // console.log('2amtNumber:', amtNumber, 'account.balance before:', account.balance);
 account.balance = parseFloat(account.balance) - parseFloat(amtNumber);
  await account.save();
  
}

    res.json({ message: 'Transaction completed', transaction });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});



// });

// Admin Routes
router.post('/admin/register', async (req, res) => {
  try {
    const { email, password, bankName } = req.body;
    if (!email || !password || !bankName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingAdmin = await Admin.findOne({ email });
    const existingBankAdmin = await Admin.findOne({ bankName });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists for this bank ' });
    }
    if(bankName && existingBankAdmin) {
      return res.status(400).json({ message: 'Bank already exists  please contact admin ' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      email,
      password: hashedPassword,
      bankName,
    });

    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});
// 1. Admin Login
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password, bankName } = req.body;
    if (!email || !password || !bankName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Use .select('+password') to get the password field
    const admin = await Admin.findOne({ email, bankName }).select('+password');
    if (!admin || !admin.password) {
      console.log('admin not found', { email, bankName });
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret not set in environment' });
    }

    const token = jwt.sign(
      { id: admin._id, isAdmin: true, bankName: admin.bankName },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token, admin: { id: admin._id, email: admin.email, bankName: admin.bankName } });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});
// 2. Approve/Reject User Account
router.put('/admin/approve-account/:userId', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.status = status;
    await user.save();

    if (status === 'approved') {
      const accountNumber = `ACC${Math.floor(100000 + Math.random() * 900000)}`;
      const account = new Account({
        userId: user._id,
        accountNumber,
        bankName: req.admin.bankName,
      });
      await account.save();
    }

    res.json({ message: `User account ${status}` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// 3. Approve/Reject Card Request
router.put('/admin/approve-card/:requestId', adminAuth, async (req, res) => {
  try {
    const { status,cardLimit,cvv,cardExpiryDate } = req.body;
    const cardRequest = await CardRequest.findById(req.params.requestId);
    if (!cardRequest) return res.status(404).json({ message: 'Card request not found' });

    const account = await Account.findById(cardRequest.accountId);
    if (account.bankName !== req.admin.bankName) return res.status(403).json({ message: 'Unauthorized' });

    if (cardRequest.cardType === 'credit') {
      const user = await User.findById(cardRequest.userId);
      if (user.job === 'Unemployed') return res.status(400).json({ message: 'User not eligible for credit card' });
    }

    cardRequest.status = status;
    cardRequest.cardLimit = cardLimit;
    cardRequest.cardExpiryDate=cardExpiryDate
    if (status === 'approved') {
     if (status === 'approved') {
  // Generate a 16-digit card number
  cardRequest.cardNumber = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
  // Generate a 3-digit CVV
  cardRequest.cvv = Math.floor(100 + Math.random() * 900).toString();
}
    }
    await cardRequest.save();

    res.json({ message: `Card request ${status}`, cardNumber: cardRequest.cardNumber });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// 4. Approve/Reject Deposit Request
router.put('/admin/approve-deposit/:requestId', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const depositRequest = await DepositRequest.findById(req.params.requestId);
    if (!depositRequest) return res.status(404).json({ message: 'Deposit request not found' });

    const account = await Account.findById(depositRequest.accountId);
    if (account.bankName !== req.admin.bankName) return res.status(403).json({ message: 'Unauthorized' });

    depositRequest.status = status;
    if (status === 'approved') {
      account.balance += depositRequest.amount;
      await account.save();
    }
    await depositRequest.save();

    res.json({ message: `Deposit request ${status}` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// 5. View Transactions and Fraud Detection Results
router.get('/admin/transactions', adminAuth, async (req, res) => {
  try {
    const transactions = await Transaction.find({})
      // .populate('userId', 'first last email')
      // .populate('accountId', 'accountNumber bankName');
    
    // const bankTransactions = transactions.filter(tx => tx.accountId.bankName === req.admin.bankName);
    // res.json(bankTransactions);
  //   transactions.forEach(tx => {
  // if (!tx.accountId) {
  //   console.warn('Transaction missing accountId:', tx._id);
  // }
  res.json(transactions);
  //   });          
  } catch (error) {
    console.log('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});



// logout

router.post('/users/logout', auth, (req, res) => {
  res.json({ message: 'User logged out successfully' });
});

// Admin Logout (stateless, client should remove token)
router.post('/admin/logout', adminAuth, (req, res) => {
  res.json({ message: 'Admin logged out successfully' });
});
module.exports = router;