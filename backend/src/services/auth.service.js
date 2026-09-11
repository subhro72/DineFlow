const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const ApiError = require("../utils/ApiError");
const isStrongPassword = (password) => {
    return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password)
    );
};

const registerUser = async ({ name, email, password, role }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    if (!isStrongPassword(password)) {
    throw new ApiError(
        400,
        "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number"
    );
}
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "User",
    });

    return user;
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    return user;
};

module.exports = {
    registerUser,
    loginUser,
};