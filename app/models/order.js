var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  _user: { type: String, ref: 'User' },
  items: [ mongoose.Schema.Types.Mixed ],
  subTotal: Number,
  discount_percent: Number,
  discount: Number,
  total: Number
});

module.exports = mongoose.model('Order', orderSchema);
