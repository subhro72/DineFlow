const express = require('express')
const authRoutes = require('./routes/auth.routes')
const menuRoutes = require('./routes/menu.routes')
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("DineFlow Backend is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/menu-items", menuRoutes)



// Error handling middleware
app.use(errorMiddleware);


module.exports = app;