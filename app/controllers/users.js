var jwt = require('../services/jwt');
var User = require('../models/user');

module.exports = {

	me: function(req, res){
		User.findById(req.user._id, function(err, user){
			if (err) res.sendStatus(500);

			if (!user){
				res.sendStatus(404);
			} else {
				res.json(user);
			}

		})
	},

	create: function(req, res) {
	  User.findOne({ email: req.body.email }, function(err, existingUser) {
	    if (existingUser) {
	      return res.status(409).send({ message: 'Email is already taken' });
	    }
	    var user = new User({
	      name: req.body.name,
	      email: req.body.email,
	      password: req.body.password,
	      username: req.body.username
	    });
	    user.save(function(newUser) {
	      res.send({ token: jwt.createJWT(newUser) });
	    });
	  });
	}

}