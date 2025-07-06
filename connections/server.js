console.log('Hello');

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('../routes/authRoutes');
const noteRoutes = require('../routes/noteRoutes');
const connectDB = require('./db');
const cors = require('cors');
connectDB();
dotenv.config();

const app = express();
app.use(
    cors(
        {
            origin: ['*', 'http://localhost:3000', 'http://dnotesapp.vercel.app'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,

        }
    )
)
app.use(express.json());



// ✅ All routes must be prefixed with /api
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// ✅ Optional health check route
app.get('/api', (req, res) => {
    res.send('🚀 API working from Netlify!');
});

module.exports = { app };
