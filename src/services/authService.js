const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');

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

module.exports = { login };