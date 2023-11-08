const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config()
app.use(bodyParser.json());

const logger = require("./helpers/logger");

/**
 * 
 * Testing out mongoDB connectins 
 */

mongoose.connect(process.env.MONGO_DB_STRING_URI);

mongoose.connection.on('connected', () => {
  logger.info('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('MongoDB connection disconnected through app termination');
    process.exit(0);
  });
});

(function() {
    // Checking if the User model is registered
    const userModel = mongoose.models.User;
    
    if (userModel) {
      logger.info('User model is registered in the database.');
    } else {
      logger.info('User model is not registered in the database.');
    }
    
})()

const PORT = process.env.PORT || 8000;

app.listen(PORT, (err) => {
    if(err) {
        logger.error(JSON.stringify(err))
        process.exit(0);
    }
    logger.info(`Server is running on port ${PORT}`);
});
