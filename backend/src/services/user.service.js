const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

const getAllUsers = async () => {
    const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

    return users;
};

const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};

module.exports = {
    getAllUsers,
    deleteUser,
};