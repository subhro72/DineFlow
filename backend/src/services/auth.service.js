const bcrypt = require('bcrypt')
const User = require('../models/User.model');

const registerUser = async ({name, email, password}) => {
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            throw new Error("User already exists")
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "User"
        })
        return user;
    }

    catch(error){
        throw new Error(error.message)
    }
}
const loginUser = async({email, password}) =>{
    try{
        const user = await User.findOne({email});
        if(!user){
            throw new Error("User not found")

        }
        const isPasswordValid = bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            throw new Error("Invalid Password")
        }
        return user;

    }
    catch(error){
        throw new Error(error.message)
    }
}
module.exports = {registerUser, loginUser}