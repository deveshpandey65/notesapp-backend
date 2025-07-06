// connections/server.js
console.log('Hello');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('../routes/authRoutes');
const noteRoutes = require('../routes/noteRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection (connect only once)
if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('✅ MongoDB connected'))
        .catch((err) => console.error('❌ MongoDB connection error:', err));
}

// ✅ All routes must be prefixed with /api
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// ✅ Optional health check
app.get('/api', (req, res) => {
    res.send('🚀 API working from Netlify!');
});

module.exports = { app };
