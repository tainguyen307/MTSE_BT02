const express = require('express');
const router = express.Router();
const { loginController, registerController, verifyOTPController } = require('../controllers/authController');
const { loginLimiter, registerLimiter } = require('../middlewares/rateLimiter');
const { validateLogin, validateRegister } = require('../middlewares/validate');
const { authorize } = require('../middlewares/authMiddleware');

// Public route: Register
router.post('/register', registerLimiter, validateRegister, registerController);


// Public route: Verify OTP
router.post('/verify-otp', verifyOTPController);

// Public route: Login
router.post('/login', loginLimiter, validateLogin, loginController);

// Protected routes: Profile
router.get('/user/profile', authorize('user'), (req, res) => {
    res.json({ message: "Welcome to User Profile", user: req.user });
});

router.get('/admin/profile', authorize('admin'), (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard", admin: req.user });
});

module.exports = router;