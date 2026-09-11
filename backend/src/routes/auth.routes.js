const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware')
const admin = require("../middleware/admin.middleware");
const validate = require("../middleware/validate.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.validator");

router.post("/register",validate(registerSchema), authController.registerController);
router.post("/login", validate(loginSchema), authController.loginController);
router.get("/me", protect, (req, res) => {
    res.status(200).json({
        message: "You are authenticated",
        user: req.user,
    });
});
router.get("/admin-test", protect, admin, (req, res) => {
    res.status(200).json({
        message: "Welcome Admin",
    });
});

module.exports = router;
