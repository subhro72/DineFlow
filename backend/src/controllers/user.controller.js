const asyncHandler = require("../utils/asyncHandler");
const userService = require("../services/user.service");

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();

    res.status(200).json({
        success: true,
        users,
    });
});

const deleteUser = asyncHandler(async (req, res) => {
    await userService.deleteUser(req.params.id);

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});

module.exports = {
    getAllUsers,
    deleteUser,
};