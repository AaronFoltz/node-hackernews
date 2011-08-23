# Node.js Wrapper API for HackerNews

## Dependencies
### [Scraper](https://github.com/mape/node-scraper)
* Install this module using `npm install scraper`
	

## How to use

### Gather the posts from the front page
[hackernews.aaronfoltz.com/get](http://hackernews.aaronfoltz.com/get)
OR
[http://falling-lightning-490.herokuapp.com/get](http://falling-lightning-490.herokuapp.com/)
### Gather the posts from the desired page  
[hackernews.aaronfoltz.com/get?page=#](http://hackernews.aaronfoltz.com/get)
OR [http://falling-lightning-490.herokuapp.com/get?page=#](http://falling-lightning-490.herokuapp.com/get?page=2)
Where # is the desired page number
	
* A pure JSON implementation of the front page information will be returned.  If you access this using a web browser, it will ask you to download a file containing the JSON.  If using this option, you will notice that the JSON is prettified using JSON.stringify using tabs.
	

At the moment, you can get the:

* Rank
* Title
* Link URL
* Points
* User
* User Profile URL
* Posted Time
* Number of comments
* Comment URL
	
# About me

Email me: [aaron@aaronfoltz.com](mailto:aaron@aaronfoltz.com)

Follow me: [@Aaron_Foltz](http://twitter.com/Aaron_Foltz)

Visit me: [Aaron Foltz](http://www.aaronfoltz.com)