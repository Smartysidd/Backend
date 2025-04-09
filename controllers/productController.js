const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, rating } = req.body;
    await Product.create(name, description, price, rating);
    res.status(201).json({ message: "Product added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, rating } = req.body;
    await Product.update(req.params.id, name, description, price, rating);
    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.delete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
