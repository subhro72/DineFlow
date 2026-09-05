const authService = require('../services/auth.service')
const generateToken = require('../utils/generateToken')

const registerController = async( req, res) => {
    try{
    const {name, email, password, confirmPassword } = req.body;

    if(password !== confirmPassword){
        return res.status(400).json({
            message: "Passwords do not match"
        })
    }
    const user = await authService.registerUser({name, email, password})
    return res.status(201).json({message: "User registered successfully",
        user: {
            id: user._id,
            email: user.email,
            role: user.role
        }
    })
    }
    catch(error){
        return res.status(500).json({
          message: error.message || "Failed to register user"
        })
    }

}
const loginController = async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await authService.loginUser({email, password});
        const token = generateToken(user);
        return res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        })
    }
    catch(error){
        return res.status(500).json({
          message: error.message || "Failed to login user"
        })
    }
}


module.exports = {registerController, loginController}