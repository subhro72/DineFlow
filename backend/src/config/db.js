const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}

module.exports = connectDB;