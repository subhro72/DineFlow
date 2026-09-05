const authService = require('../services/auth.service')
const generateToken = require('../utils/generateToken')
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const registerController = asyncHandler(async(req, res) => {
     const {name, email, password, confirmPassword } = req.body;

    if(password !== confirmPassword){
        return res.status(400).json({
            message: "Passwords do not match"
        })
    }
    const user = await authService.registerUser({name, email, password})
    return res.status(201).json({success: true,
        message: "User registered successfully",
        user: {
            id: user._id,
            email: user.email,
            role: user.role
        }
    })
})
const loginController = asyncHandler(async (req, res) => {
     const {email, password} = req.body
        const user = await authService.loginUser({email, password});
        const token = generateToken(user);
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        })
})
    


module.exports = {registerController, loginController}