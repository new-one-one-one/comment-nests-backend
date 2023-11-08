const mongoose = require('mongoose');
const logger = require('./logger');

function checkMongoDBConnection() {
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
}

module.exports = {
    checkMongoDBConnection
}
