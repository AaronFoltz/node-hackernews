var http = require('http');
http.createServer(function (request, response) {
	var respondTime = Math.floor(Math.random()*1000);
	setTimeout(function() {
		var scraper = require('scraper');
		var links = '';
		scraper("http://news.ycombinator.com", function(err, $) {
			if (err) {
				console.log(err);
				return;
			}
			var posts = $('td.title, td.subtext');	
			var counter = 1;

			posts.each(function(){

				// Grab the rank of the post
				if(counter == 1){
					// Create a new array for this post
					post = new Object();
					post.rank = $(this).text();
					counter++;
					links += $(this).text();

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
			return postArray;
		});
		
		response.writeHead(200, {'Content-Type': 'text/json'});
		response.end('<html><head><title>Page has  links</title></head><body><div id="time"></div>'+links+'</body></html>\n');
	}, respondTime);
}).listen(8486);