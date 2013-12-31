var restify = require('restify');
var should = require('should');

before(function(done) {
  require('../app.js');
  done();
});

var client = restify.createStringClient({
  version: '*',
  url: 'http://localhost:8080'
});

describe('Hello World server:', function() {
  it('should send a 200 OK response with a nice greeting', function(done) {
    client.get('/', function(err, req, res, data) {
      should.not.exist(err);
      res.statusCode.should.eql(200);
      data.should.startWith('Hello, Docker!');
      done();
    });
  });
});
