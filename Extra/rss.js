var http = require('http');
var url = require('url');

http.createServer(function(request, response) {
    var feedUrl = 'http://feeds.feedburner.com/astronomycast.rss';
    var parsedUrl = url.parse(feedUrl);

    var client = http.createClient(80, parsedUrl.hostname);
    var request = client.request(parsedUrl.pathname, { 'host': parsedUrl.hostname });
    request.addListener('response', handle);
    request.end();

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('Done processing the request.');
}).listen(8124);

function handle(response) {
    if(response.statusCode !== 200)
        return;

    var responseBody = '';

    response.addListener('data', function(chunk) {
        responseBody += chunk;
    });

    response.addListener('end', function() {
        console.log('All data has been read.');
        console.log(responseBody);
    });
}