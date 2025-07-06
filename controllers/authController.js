// controllers/authController.js
const User = require('../models/User');
const OTP = require('../models/OTP');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../utils/sendOTP');

exports.SignUprequestOTP = async (req, res) => {
    console.log('sending...')
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        return  res.status(400).json ({ message: 'User already exists' });
        
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({ email, otp, expiresAt: new Date(Date.now() + 10 * 60000) });
    await sendOTP(email, otp);
    res.json({ message: 'OTP sent to email' });
};


exports.SignUpverifyOTP = async (req, res) => {
    const { email, otp, name, dob } = req.body;

    try {
        const record = await OTP.findOne({ email, otp });

        if (!record || record.expiresAt < Date.now()) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // ✅ Create new user with name and dob
        user = await User.create({ email, name, dob });

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // ✅ Clean up used OTP
        await OTP.deleteMany({ email });

        // ✅ Send response
        res.json({
            message: 'Signup successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                dob: user.dob,
            },
        });
    } catch (err) {
        console.error('OTP verification failed:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.LoginrequestOTP = async (req, res) => {
    console.log('sending...')
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User does not exists' });

    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({ email, otp, expiresAt: new Date(Date.now() + 10 * 60000) });
    await sendOTP(email, otp);
    res.json({ message: 'OTP sent to email' });
};


exports.LoginverifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // 1. Validate OTP
        const record = await OTP.findOne({ email, otp });

        if (!record || record.expiresAt < Date.now()) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        // 2. Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        // 3. Generate JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 4. Clean up used OTP
        await OTP.deleteMany({ email });

        // 5. Send response
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                dob: user.dob,
            },
        });
    } catch (err) {
        console.error('OTP verification failed:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


