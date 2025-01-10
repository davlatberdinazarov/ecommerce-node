const User = require('../models/userModel')

class UserService {
    static async getAllUsers() {
        return await User.find({})
    }

    static async getUserById(id) {
        return await User.findById(id)
    }
}

module.exports = UserService