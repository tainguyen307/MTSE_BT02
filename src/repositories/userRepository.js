const User = require('../models/user');

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({ email });
    }
    // Nơi xử lý các câu lệnh aggregate phức tạp
    async getAdminDashboardStats() {
        return await User.aggregate([ ... ]); 
    }
}

module.exports = new UserRepository();