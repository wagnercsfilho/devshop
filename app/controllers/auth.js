var request = require('request');
var qs = require('querystring');
var jwt = require('../services/jwt');
var User = require('../models/user');
var config = require('../config'); 

module.exports = {

	github: function(req, res) {
		var accessTokenUrl = config.app.accessTokenUrl;
		var userApiUrl = 'https://api.github.com/user';
		var params = {
			code: req.body.code,
			client_id: req.body.clientId,
			client_secret: config.app.githubClientSecret,
			redirect_uri: req.body.redirectUri
		};


		request.get({ url: accessTokenUrl, qs: params }, function(err, response, accessToken) {
			accessToken = qs.parse(accessToken);
			var headers = { 'User-Agent': 'Satellizer' };

			request.get({ url: userApiUrl, qs: accessToken, headers: headers, json: true }, function(err, response, profile) {
				User.findOne({ github: profile.id }, function(err, existingUser) {
					if (existingUser) {
						var token = jwt.createJWT(existingUser);
						return res.send({ token: token });
					} else {
						var user = new User();
						user.github = profile.id;
						user.token = accessToken;
						user.picture = profile.avatar_url;
						user.name = profile.name;
						user.username = profile.login;
						user.email = profile.email;
						user.save(function(err, newUser) {
							var token = jwt.createJWT(newUser);
							res.send({ token: token });
						});
					}
				});

			});
		});
	},

	login: function(req, res) {
	  User.findOne({ email: req.body.email }, '+password', function(err, user) {
	    if (!user) {
	      return res.status(401).send({ message: 'Wrong email and/or password' });
	    }
	    user.comparePassword(req.body.password, function(err, isMatch) {
	      if (!isMatch) {
	        return res.status(401).send({ message: 'Wrong email and/or password' });
	      }
	      res.send({ token: jwt.createJWT(user) });
	    });
	  });
	}
	

}

