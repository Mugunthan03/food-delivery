const foodModel = require("../models/foodModel.js");
const fs = require('fs');

// Add food item 
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: 'Successfully Food added' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'error' });
    }
};

// Food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'error' });
    }
};

// Remove food
const removeFood = async(req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {}); // Delete image from folder

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Food removed' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'error' });
    }
};

module.exports = { addFood, listFood, removeFood };
