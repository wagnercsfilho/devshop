var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {

  	createJWT: function(user){

	  	var payload = {
		    sub: user,
		    iat: moment().unix(),
		    exp: moment().add(14, 'days').unix()
		}

	  	return jwt.encode(payload, 'secret');

	}

}
