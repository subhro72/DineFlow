const dotenv = require('dotenv')
dotenv.config();


const env = {
    port: process.env.PORT || 3000,
    mongourl: process.env.MONGODB_URL,

    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d"
}

module.exports = env