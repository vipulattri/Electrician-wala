const express = require('express');
const Electrician = require('../models/Electrician');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Register Electrician
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, specialty, location, phoneNumber } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newElectrician = new Electrician({
    firstName, lastName, email, password: hashedPassword, specialty, location, phoneNumber
  });
  
  try {
    await newElectrician.save();
    res.status(201).json({ message: 'Electrician registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering electrician', error: err });
  }
});

// Login Electrician
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const electrician = await Electrician.findOne({ email });

  if (!electrician) return res.status(400).json({ message: 'Electrician not found' });

  const isPasswordValid = await bcrypt.compare(password, electrician.password);
  if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: electrician._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

// Get Electricians in the area
router.get('/find', async (req, res) => {
  const { location } = req.query;
  const electricians = await Electrician.find({ location: new RegExp(location, 'i') });
  res.json(electricians);
});

module.exports = router;
