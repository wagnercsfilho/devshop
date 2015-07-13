var request = require('supertest');
var should = require('should');
var app = require('../app').app;

describe('developers', function () {
 it('should return a json', function (done) {
 	request(app)
 	.get('https://api.github.com/users')
 	.set('Accept', 'application/json')
 	.expect('Content-Type', /json/)
 	.expect(200, done);
 });
});