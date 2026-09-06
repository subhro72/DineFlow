const menuService = require("../services/menu.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");


// GET /api/menu-items
const getAllMenuItems = asyncHandler(async (req, res) => {
    const menuItems = await menuService.getAllMenuItems();

    res.status(200).json({
        success: true,
        menuItems,
    });
});


// GET /api/menu-items/:id
const getMenuItemById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const menuItem = await menuService.getMenuItemById(id);

    res.status(200).json({
        success: true,
        menuItem,
    });
});


// POST /api/menu-items
const createMenuItem = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        category,
        price,
        availability,
        image,
    } = req.body;

    if (!name || !description || !category || price === undefined) {
        throw new ApiError(400, "Required menu item fields are missing");
    }

    const menuItem = await menuService.createMenuItem({
        name,
        description,
        category,
        price,
        availability,
        image,
    });

    res.status(201).json({
        success: true,
        message: "Menu item created successfully",
        menuItem,
    });
});


// PUT /api/menu-items/:id
const updateMenuItem = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const menuItem = await menuService.updateMenuItem(
        id,
        req.body
    );

    res.status(200).json({
        success: true,
        message: "Menu item updated successfully",
        menuItem,
    });
});


// DELETE /api/menu-items/:id
const deleteMenuItem = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await menuService.deleteMenuItem(id);

    res.status(200).json({
        success: true,
        message: "Menu item deleted successfully",
    });
});


module.exports = {
    getAllMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
};