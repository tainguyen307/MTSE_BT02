const rateLimit = require('express-rate-limit');
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 5, // Tối đa 5 lần thử login
    message: "Thử quá nhiều lần, vui lòng đợi 15 phút"
});

module.exports = { loginLimiter };