const mongoose = require('mongoose');
const env = require('./env')

const connectDB = async () => {
    try {
        await mongoose.connect(env.mongourl);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}

module.exports = connectDB;