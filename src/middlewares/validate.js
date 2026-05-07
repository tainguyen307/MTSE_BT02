const { body, validationResult } = require('express-validator');

const validateRegister = [
    body('email')
        .isEmail()
        .withMessage('Email không hợp lệ'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Mật khẩu tối thiểu 6 ký tự'),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({
                errors: errors.array()
            });
        }

        next();
    }
];

const validateLogin = [
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('password').notEmpty().withMessage('Mật khẩu không được để trống'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];
module.exports = {  validateLogin, validateRegister };