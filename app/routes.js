var Home = require('./controllers/home');
var Auth = require('./controllers/auth');
var User = require('./controllers/users');
var Order = require('./controllers/orders');
var Developer = require('./controllers/developers');
var Filter = require('./filters');

module.exports = function(app){

	app.get('/', Home.index);

	app.post('/auth/github', Auth.github);
	app.post('/auth/login', Auth.login);

	app.get('/developers', Developer.index);
	app.get('/developers/:id', Developer.show);
	app.get('/developers/search/:q', Developer.search);

	app.get('/users/me', Filter.authenticated, User.me);
	app.post('/users', User.create);

	app.post('/orders', Filter.authenticated, Order.create);
	app.get('/orders/me', Filter.authenticated, Order.me);

	app.get('/discount-coupon/:coupon', function(req, res){
		var coupon = req.params.coupon;
		if (coupon === 'SHIPIT'){
			res.json({
				discount_percent: 10
			});
		} else {
			res.send(404);
		}
	})
	
}