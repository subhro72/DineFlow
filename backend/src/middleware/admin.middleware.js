const admin = (req, res, next) => {
    //console.log("Admin Middleware - User details:", req.user);
    if (req.user.role !== "Admin") {
        console.log("Admin Middleware - Access denied for role:", req.user.role);
        return res.status(403).json({
            message: "Admin access required",
        });
    }

    next();
};

module.exports = admin;