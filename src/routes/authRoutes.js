const express = require('express');
const router = express.Router();
const { loginController } = require('../controllers/authController');
const { loginLimiter } = require('../middlewares/rateLimiter');
const { validateLogin } = require('../middlewares/validate');
const { authorize } = require('../middlewares/authMiddleware');
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