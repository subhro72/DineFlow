const express = require("express");

const {
    getAllMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
} = require("../controllers/menu.controller");

const { protect } = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

const router = express.Router();


// Public routes
router.get("/", getAllMenuItems);

router.get("/:id", getMenuItemById);


// Admin-only routes
router.post("/", protect, admin, createMenuItem);

router.put("/:id", protect, admin, updateMenuItem);

router.delete("/:id", protect, admin, deleteMenuItem);


module.exports = router;