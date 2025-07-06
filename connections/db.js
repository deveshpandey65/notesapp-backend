const mongoose = require('mongoose');
require('dotenv').config();

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000; 

const connectDB = async (retries = MAX_RETRIES) => {
    console.log('🔌 Trying to connect to MongoDB...');
    while (retries > 0) {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log('✅ Connected to MongoDB');
            return;
        } catch (error) {
            console.error(`❌ MongoDB connection failed: ${error.message}`);
            retries--;

            if (retries === 0) {
                console.error('❌ All MongoDB connection attempts failed. Exiting...');
                process.exit(1);
            }

            console.log(`🔁 Retrying in ${RETRY_DELAY_MS / 1000} seconds... (${retries} retries left)`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
        }
    }
};

connectDB();

module.exports = connectDB;
