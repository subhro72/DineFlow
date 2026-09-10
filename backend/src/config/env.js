const dotenv = require('dotenv')
dotenv.config();


const env = {
    port: process.env.PORT || 3000,
    mongourl: process.env.MONGODB_URL,

    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",

    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
    }
}
console.log("JWT SECRET LOADED:", !!process.env.JWT_SECRET);

module.exports = env