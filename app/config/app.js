var path = require('path');

module.exports = {

    // Root path of server
    root: path.normalize(__dirname + '/../..'),

    // Server port
    port: process.env.PORT || 3000,


    github : {
		 username: 'devshoptest',
		 password: 'devshoptest2015'
    },

    githubClientSecret: 'e98ed405f8628ada143bbde4ada6d67a431b55d0',
    accessTokenUrl: 'https://github.com/login/oauth/access_token'

};