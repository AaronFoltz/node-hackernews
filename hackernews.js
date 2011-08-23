var scraper = require('scraper');
var sys = require("sys");
var http = require("http");
var url = require("url");

function getPage(page, pageParam, callback) {
	
	// If Page is greater than 1, then get the next page
  	if( page > 1 ) {
    	var realURL = 'http://news.ycombinator.com' + pageParam;
	
		// Scrape the url for the "More" URL - the url to the next page
		scraper(realURL, function(err, $){
			// Get the last href with starting with /x?fnid
			var more = $('a[href^="/x?fnid"]').last();

			pageParam = more.attr("href");
			
			// Recursively get the next page using the current page param (/x?fnid)
			getPage(page-1, pageParam, callback);
		});
		
	// If we are at the base case, then return to the callback function
  	} else { 
	
		realURL = 'http://news.ycombinator.com' + pageParam;
		callback(realURL);
	}
}


function get (page, serverCallback) {
	var postArray = new Array();
	var pageParam = '';
	var realURL = 'http://news.ycombinator.com';
	
	console.log("Page: " + page);
	
	// Get the correct page URL
	getPage(page, pageParam, function(data){
		
		realURL = data;
		console.log("REALURL: " + realURL);
		
		// Scrape the final website
		scraper(realURL,function(err, $) {
		    if (err) {throw err;}

		    var posts = $('td.title, td.subtext');	
			var counter = 1;

			posts.each(function(){

				// Grab the rank of the post
				if(counter == 1){
					// Create a new array for this post
					post = new Object();
					post.rank = $(this).text();
					counter++;

				// Post title/URL
				} else if(counter == 2){
					post.titleURL = $(this).find("a").attr("href");
					post.title = $(this).text();
					counter++;

				// Subtext
				} else if(counter == 3){			
					// Get the points for the post
					post.points = $(this).find("span").text();

					// Get the user's name
					post.user = $(this).find("a[href^=user]").text();

					// Get the user's URL
					post.userURL = "http://news.ycombinator.com/" + $(this).find("a[href^=user]").attr("href");

					// Get the number of comments
					post.comments = $(this).find("a[href^=item]").text();

					// Get the comment URL
					post.commentsURL = "http://news.ycombinator.com/" + $(this).find("a[href^=item]").attr("href");

					// Regex to get the length of time ago
					var pattern=/\d\s[a-zA-Z]+\sago/i;

					// Grab the regex from the text
					post.timeAgo = pattern.exec($(this).text())[0];

					// Reset to the first post
					counter = 1;

					// Add each post to an array of posts
					postArray.push(post);
				}

			});

			// Send the array as a callback
			console.log(postArray);
			serverCallback(postArray);
		});
	});
}

var server = http.createServer(function (request, response) {
	console.log("Got a request");
	
	
	var urlParts = url.parse(request.url, true);
	
	// If using the /get pathname, then get the information
	if(urlParts.pathname == '/get'){
		
		// Gather the query
		var query = urlParts.query;
		
		console.log("URL: " +  urlParts.query.page +" "+ url.parse(request.url).pathname);
		
		// Call the get method
	    get(urlParts.query.page, function(body) {

			console.log(JSON.stringify(body, null, '\t'));

			// Handle the response 
	    	response.writeHead(200, {"Content-Type": "text/json"});
	      	response.write(JSON.stringify(body, null, '\t'));
			response.end();

	    });
	}
	
	
});

// Listen on the port described by the environment.  This allows it to run on Heroku
server.listen(process.env.PORT || 3000);
