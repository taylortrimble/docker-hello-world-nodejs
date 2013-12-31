// Load the http module to create an http server.
var http = require('http');
var util = require('util');
var commands = {
  currGitBranch: 'git rev-parse --abbrev-ref HEAD',
  currGitCommitHash: 'git rev-parse --verify HEAD'
};

function getProcessStdout(command, callback) {
  require('child_process').exec(command, function(err, stdout, stderr) {
    if (err) callback(err, null);
    var output = stdout.replace(/^\s+|\s+$/g, '');
    callback(null, output);
  });
}

var branch = '';
var commitHash = '';
getProcessStdout(commands.currGitBranch, function(err, output) {
  branch = output;
});
getProcessStdout(commands.currGitCommitHash, function(err, output) {
  commitHash = output;
});

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  var text = ('Hello, Docker!\n' +
              util.format('Node version: %s\n', process.versions.node) +
              util.format('Git branch: %s\n', branch) +
              util.format('Git commit: %s\n', commitHash) +
              'Love, The New Tricks.\n');
  response.end(text);
});

var port = process.env.PORT || 3717;
server.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');
