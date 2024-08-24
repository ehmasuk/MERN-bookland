const productsModel = require("../models/productsModel");
const slugify = require("slugify");
const reviewsModel = require("../models/reviewsModel");
const getAllProducts = async (req, res) => {
    const pageNumber = req.query.page || 1;
    const pagePerProduct = req.query.limit || 10;
    const pageSort = req.query.sort ? { [req.query.sort]: -1 } : {};

    const filter = {};

    if (req.query.category) {
        filter.categories = { $in: req.query.category?.split(",") };
    }
    if (req.query.search) {
        filter.name = { $regex: req.query.search, $options: "i" };
    }

    try {
        const products = await productsModel
            .find(filter)
            .sort(pageSort)
            .skip((pageNumber - 1) * pagePerProduct)
            .limit(pagePerProduct);

        const total = await productsModel.countDocuments()

        return res.status(200).json({ total, page: pageNumber, limit: pagePerProduct, filter, data: products });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const getSingleProduct = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(404).json({ message: "Id not found" });
    }
    try {
        const product = await productsModel.findById(id);

        const { ...data } = product._doc;

        const reviews = await reviewsModel.find({ productId: id });

        let avrRating = 0;

        if (reviews.length > 0) {
            avrRating =
                reviews.reduce((acc, rev) => {
                    acc = acc + Number(rev.rating);
                    return acc;
                }, 0) / reviews.length;
        }

        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }

        return res.status(200).json({ ...data, reviews, rating: avrRating.toFixed(1) });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, description, categories, price, oldPrice, author, publisher, language, image, colors } = req.body;

    if (!name || !description || !price || !author || !image) {
        return res.status(404).json({ message: "name,description,categories,price,author,image required" });
    }

    const slug = slugify(name, { lower: true, trim: true, replacement: "-" });

    try {
        await productsModel.create({
            name,
            description,
            categories,
            price,
            oldPrice,
            author,
            publisher,
            language,
            image,
            colors,
            slug,
        });
        return res.status(200).json({ message: "Product created successfully" });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(404).json({ message: "Id not found" });
    }
    try {
        await productsModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};
const updateProduct = async (req, res) => {
    return res.send("products");
};

module.exports = { getAllProducts, createProduct, deleteProduct, updateProduct, getSingleProduct };
