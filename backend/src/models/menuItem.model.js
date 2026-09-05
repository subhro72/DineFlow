const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            enum: ["Starter", "Main Course", "Dessert", "Beverage"],
            required: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        availability: {
            type: Boolean,
            default: true,
        },

        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;