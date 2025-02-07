const mongoose = require('mongoose');

const electricianSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialty: { type: String, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

module.exports = mongoose.model('Electrician', electricianSchema);
