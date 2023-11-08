const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config()
app.use(bodyParser.json());

/**
 * 
 * Testing out mongoDB connectins 
 */

mongoose.connect(process.env.MONGO_DB_STRING_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection disconnected through app termination');
    process.exit(0);
  });
});

(function() {
    // Checking if the User model is registered
    const userModel = mongoose.models.User;
    
    if (userModel) {
      console.log('User model is registered in the database.');
    } else {
      console.log('User model is not registered in the database.');
    }
    
})()

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
