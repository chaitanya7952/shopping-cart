const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add to cart: basic stock decrement (id in body)
router.post('/add-to-cart', async (req, res) => {
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ error: 'productId required' });
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  if (product.stock <= 0) return res.status(409).json({ error: 'Out of stock' });
  product.stock -= 1;
  await product.save();
  res.json({ ok: true, product });
});

module.exports = router;
