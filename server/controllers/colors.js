const colorsModel = require('../models/colorsModel')

const getAllColors = async (req, res) => {
    try {
        const colors = await colorsModel.find({});

        return res.status(200).json(colors);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};
const createColor = async (req, res) => {
    const { name,code } = req.body;
    if (!name || !code) {
        return res.status(404).json({ message: "Name and code is required" });
    }
    const alreadyExist = await colorsModel.findOne({ name });
    if (alreadyExist) {
        return res.status(404).json({ message: "Name already exist" });
    }
    

    try {
        await colorsModel.create({ name, code });
        return res.status(200).json({ message: "Color created succesfully" });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};
const deleteColor = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(404).json({ message: "Id not found" });
    }
    try {
        await colorsModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Color deleted successfully" });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

module.exports = { getAllColors, createColor, deleteColor };
