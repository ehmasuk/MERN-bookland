const slugify = require("slugify");
const categoriesModel = require("../models/categoriesModel");
const productsModel = require("../models/productsModel");

const getAllCategories = async (req, res) => {
    
    try {
        const catgories = await categoriesModel.find({});

        return res.status(200).json(catgories);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }

};
const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(404).json({ message: "Name is required" });
    }
    const alreadyExist = await categoriesModel.findOne({ name });
    if (alreadyExist) {
        return res.status(404).json({ message: "Name already exist" });
    }
    const slug = slugify(name, { lower: true, trim: true, replacement: "-" });

    try {
        await categoriesModel.create({ name, slug });
        return res.status(200).json({ message: "Category created succesfully" });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};
const deleteCategory = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(404).json({ message: "Id not found" });
    }
    try {
        await categoriesModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

module.exports = { getAllCategories, createCategory, deleteCategory };
