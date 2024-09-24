// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products
// Fetch all products with optional search and category filters
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/:id
// Fetch a single product by ID
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// Middleware to get product by ID
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

module.exports = router;
