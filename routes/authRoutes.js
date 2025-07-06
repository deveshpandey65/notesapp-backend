// routes/authRoutes.js

const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { requestOTP, verifyOTP, SignUprequestOTP, SignUpverifyOTP, LoginrequestOTP, LoginverifyOTP } = require('../controllers/authController');

require('dotenv').config();
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


router.post('/user/verify', async (req, res) => {
    console.log('hii')
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('name email');

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ user });
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(401).json({ error: 'Invalid token' });
    }
});
// OTP routes
router.post('/signup/otp', SignUprequestOTP );
router.post('/signup/verify', SignUpverifyOTP);

router.post('/login/otp', LoginrequestOTP);
router.post('/login/verify', LoginverifyOTP);

// Google Login
router.post('/google', async (req, res) => {
    const { id_token } = req.body;

    if (!id_token) {
        return res.status(400).json({ error: 'No token provided' });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: google_id, email, name } = payload;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ name, email, google_id });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // ✅ Responding with token + user info
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        console.error('Google OAuth Error:', err);
        return res.status(401).json({ error: 'Invalid Google token' });
    }
});





module.exports = router;
