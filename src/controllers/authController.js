const authService = require('../services/authService');

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

module.exports = { loginController };