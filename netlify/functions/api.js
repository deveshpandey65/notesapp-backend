const serverless = require("serverless-http");
const cors = require("cors");
const { app } = require("../../connections/server");
console.log('Hii from api.js')
// Enable CORS
app.use(cors({ origin: "*", credentials: true }));

app.get("/", (req, res) => {
    res.send("API is working 🚀");
});
console.log('end')

// Export serverless handler
module.exports.handler = serverless(app);

















// const express = require('express');
// const serverless = require('serverless-http');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const authRoutes = require('../../routes/authRoutes');
// const noteRoutes = require('../../routes/noteRoutes');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({
//     origin: ['http://localhost:3000', 'https://notesapp.vercel.app']
// }));
// console.log('hii from server')
// let isConnected = false;
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     if (!isConnected) {
//         console.log('✅ MongoDB connected');
//         isConnected = true;
//     }
// }).catch(err => console.error('MongoDB error:', err));
// app.get('/',
//     (req, res) =>
//         {
//             res.send('Hello from serverless');
//             }
// )
// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/notes', noteRoutes);

// // Export as Netlify function
// module.exports.handler = serverless(app);
