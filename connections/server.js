console.log('Hello');

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('../routes/authRoutes');
const noteRoutes = require('../routes/noteRoutes');
const connectDB = require('./db');
connectDB();
dotenv.config();

const app = express();
app.use(express.json());



// ✅ All routes must be prefixed with /api
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// ✅ Optional health check route
app.get('/api', (req, res) => {
    res.send('🚀 API working from Netlify!');
});

module.exports = { app };
