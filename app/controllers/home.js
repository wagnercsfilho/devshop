var config = require('../config'); 

module.exports = {

	index: function (req, res) {
	  res.sendfile(config.app.root + '/public/index.html');
	}

}