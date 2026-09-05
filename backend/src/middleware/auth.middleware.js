const jwt = require("jsonwebtoken");
const env = require("../config/env");

const protect = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message: "Authentication Required"
            })
        }
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, env.jwtSecret);
        req.user = decoded;
        next();
    }
    catch(error){
        return res.status(500).json({
            message: error.message || "Failed to authenticate token"
        })
    }
}

module.exports = {protect}