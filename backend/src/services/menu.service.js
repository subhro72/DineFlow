const MenuItem = require('../models/menuItem.model');
const ApiError = require('../utils/ApiError');


const getAllMenuItems = async () => {
    const menuItems = await MenuItem.find().sort({ createdAt: -1 });

    return menuItems;
};
const getMenuItemById = async (id) => {
    const menuItem = await MenuItem.findById(id);

    if (!menuItem) {
        throw new ApiError(404, "Menu item not found");
    }

    return menuItem;
};

const createMenuItem = async  ({
    name,
    description,
    category,
    price,
    availability,
    image,
}) => {
    const menuItem = await MenuItem.create({
        name,
        description,
        category,
        price,
        availability,
        image,
    });
    return menuItem;

}

const updateMenuItem = async (id, updateData) => {
    const menuItem = await MenuItem.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!menuItem) {
        throw new ApiError(404, "Menu item not found");
    }

    return menuItem;
};
const deleteMenuItem = async (id) => {
    const menuItem = await MenuItem.findByIdAndDelete(id);

    if (!menuItem) {
        throw new ApiError(404, "Menu item not found");
    }

    return menuItem;
};

module.exports ={
    getAllMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
};