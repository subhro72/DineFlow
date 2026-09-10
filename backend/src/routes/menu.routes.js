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
const upload = require("../middleware/upload.middleware");

const router = express.Router();


// Public routes
router.get("/", getAllMenuItems);

router.get("/:id", getMenuItemById);


// Admin-only routes
router.post(
    "/",
    protect,
    admin,
    upload.single("image"),
    createMenuItem
);

router.put(
    "/:id",
    protect,
    admin,
    upload.single("image"),
    updateMenuItem
);

router.delete("/:id", protect, admin, deleteMenuItem);


module.exports = router;