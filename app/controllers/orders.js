var Order = require('../models/order');

module.exports = {

	me: function(req, res){
		Order.find({ _user: req.user._id }, function(err, orders){
			if (err) res.sendStatus(500);

			res.json(orders);
		});
	},

	create: function(req, res) {
		Order.create({
			_user: req.user._id,
			items: req.body.items,
			subTotal: req.body.subTotal,
	        discount_percent: req.body.discount_percent,
	        discount: req.body.discount,
	        total: req.body.total
		}, function(err, order){
			if (err) res.sendStatus(500);

			res.json(order);
		});
	}

}