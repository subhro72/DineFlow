const express = require('express')
const authRoutes = require('./routes/auth.routes')
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(express.json());


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("DineFlow Backend is running!");
});




// Error handling middleware
app.use(errorMiddleware);


module.exports = app;