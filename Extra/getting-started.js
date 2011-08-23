var http = require('http');

/**
 * Creates the server for the pinpoint web service
 * @param {int} port: Port for the server to run on
 */
exports.createServer = function (port) {
  var server = http.createServer(function (request, response) {
    var data = '';
       
    request.on('data', function (chunk) {
      data += chunk;
    });
    
    response.writeHead(501, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'not implemented' }));
  });
  
  if (port) {
    server.listen(port);
  }
  
  return server;
};