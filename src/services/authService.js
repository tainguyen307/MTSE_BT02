const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { generateToken } = require('../utils/jwtUtils');
const userRepository = require('../repositories/userRepository');

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


const sendOTP = async (email, otp) => {

    const transporter = nodemailer.createTransport({
        service: 'yahoo',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'OTP Xác thực tài khoản',
        html: `
            <h2>OTP Code</h2>
            <h1>${otp}</h1>
            <p>OTP sẽ hết hạn sau 5 phút</p>
        `
    });
};

const register = async ({
    email,
    password
}) => {

    const existingUser =
        await userRepository.findByEmail(email);

    if (existingUser) {
        throw new Error('Email already exists');
    }

    const otp = generateOTP();

    const otpExpire =
        Date.now() + 5 * 60 * 1000;

    await userRepository.createUser({
        email,
        password,
        otp,
        otpExpire
    });

    await sendOTP(email, otp);

    return {
        message:
            'Register successful. Please verify OTP.'
    };
};


const verifyOTP = async (
    email,
    otp
) => {

    const user =
        await userRepository.findByEmail(email);

    if (!user) {
        throw new Error('User not found');
    }

    if (user.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    if (user.otpExpire < Date.now()) {
        throw new Error('OTP expired');
    }

    await userRepository.updateUser(email, {
        isVerified: true,
        otp: null,
        otpExpire: null
    });

    return {
        message: 'Verify successful'
    };
};

const login = async (email, password) => {
    const user = await User.findOne({ email }).lean();
    if (!user) throw new Error('Email hoặc mật khẩu không chính xác');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Email hoặc mật khẩu không chính xác');

    // Sử dụng hàm từ utils cực kỳ gọn
    const token = generateToken({ 
        id: user._id, 
        role: user.role 
    });

    const redirectUrl = user.role === 'admin' ? '/admin/profile' : '/user/profile';

    return {
        token,
        role: user.role,
        redirectUrl
    };
};

module.exports = { login, register, verifyOTP };