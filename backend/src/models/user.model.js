const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxLength: 35
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 5
        },
        role: {
            type: String,
            enum: ["Admin", "User"],
            default: "User"

        }
    
})

const User = new mongoose.model('User', userSchema);


module.exports = User