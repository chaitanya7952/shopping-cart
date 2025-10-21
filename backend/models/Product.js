const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ImageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 20 },
});

module.exports = mongoose.model('Product', productSchema);
