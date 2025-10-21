const express = require('express');
const router = express.Router();
const Order = require('../models/orders');

router.post('/', async (req, res) => {
  try {
    const newOrder = new Order({ items: req.body.items || [] });
    await newOrder.save();
    res.json({ message: 'Order placed!' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

module.exports = router;
