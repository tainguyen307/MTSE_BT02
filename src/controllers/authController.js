const authService = require('../services/authService');

const registerController = async (req, res) => {

    try {

        const result =
            await authService.register(req.body);

        return res.status(201).json({
            status: 'success',
            data: result
        });

    } catch (error) {

        return res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};


const verifyOTPController = async (
    req,
    res
) => {

    try {

        const {
            email,
            otp
        } = req.body;

        const result =
            await authService.verifyOTP(
                email,
                otp
            );

        return res.status(200).json({
            status: 'success',
            data: result
        });

    } catch (error) {

        return res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        
        return res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = { loginController, registerController, verifyOTPController};