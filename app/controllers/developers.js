var rest = require('restler');
var async = require('async');
var config = require('../config');
var cache = [];
module.exports = {

	index: function(req, res){
		var lastUser = req.query.since;
		var url;
		var devs = [];

		if (cache.length > 0){
			res.json(cache);
		} else {

			if (lastUser)
				url = 'https://api.github.com/users?since=' + lastUser;
			else
				url = 'https://api.github.com/users';


			rest.get(url, config.app.github).on('complete', function(results) {

				async.each(results,
					function(developer, callback){
						rest.get('https://api.github.com/users/'+developer.login, config.app.github).on('complete', function(result) {
							var dev = {};
							dev = developer;
							dev.details = result;
							dev.price = Math.round(((((result.public_repos + result.public_gists + result.followers + result.following) / 4) * 10)/3.16)).toFixed(2);
							devs.push(dev);
							callback();
						});
					},
					function(err){
						cache = devs;
						res.json(devs);
					}
					);

			});

		}
	},

	show: function(req, res){
		var username = req.params.id;

		rest.get('https://api.github.com/users/'+username, config.app.github).on('complete', function(result) {
			if (result instanceof Error) {
				console.log('Error:', result.message);
				this.retry(5000); 
			} else {
				result.price = Math.round(((((result.public_repos + result.public_gists + result.followers + result.following) / 4) * 10)/3.16)).toFixed(2);
				res.json(result);
			}
		});
	},

	search:  function(req, res){
		var q = req.params.q;
		var devs = [];

		rest.get('https://api.github.com/search/users?q='+q, config.app.github).on('complete', function(results) {
			async.each(results.items,
				function(developer, callback){
					rest.get('https://api.github.com/users/'+developer.login, config.app.github).on('complete', function(result) {
						var dev = {};
						dev = developer;
						dev.details = result;
						dev.price = Math.round(((((result.public_repos + result.public_gists + result.followers + result.following) / 4) * 10)/3.16)).toFixed(2);
						devs.push(dev);
						callback();
					});
				},
				function(err){
					res.json(devs);
				}
				);

		});
	}

}

