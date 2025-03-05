const Product = require("../models/productModel");
const mongoose = require("mongoose");

// GET /products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve products" });
    }
};

// POST /products
const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create({ ...req.body });
        res.status(201).json(newProduct);
    } catch (error) {
        res
            .status(400)
            .json({ message: "Failed to create product", error: error.message });
    }
};

// GET /products/:productId
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve product" });
    }
};

// PUT /products/:productId
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            { ...req.body },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: "Failed to update product", error: error.message });
    }
};

// DELETE /products/:productId
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product" });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
