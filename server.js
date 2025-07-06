// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/authRoutes');
// const noteRoutes = require('./routes/noteRoutes');
// const cors = require('cors');

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors(
//     {
//         origin: ['http://localhost:3000'],
//     }
// ))


// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('MongoDB Connected'));

// app.use('/api/auth', authRoutes);
// app.use('/api/notes', noteRoutes);

// app.listen(process.env.PORT, () => {
//     console.log(`Server running on port ${process.env.PORT}`);
// });
