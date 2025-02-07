const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors package
const bodyParser = require('body-parser');
const electricianRoutes = require('./routes/electricianRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/electrician', electricianRoutes);
app.use('/api/user', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
