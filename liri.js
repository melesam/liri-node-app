
// Grab data from key.js and store in a variable
var keys = require('./keys.js');


// require packages
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');


// function that displays tweets from twitter - WORKS!
var getMyTweets = function() {

	var client = new Twitter(keys.twitterKeys);
	 
	var params = {screen_name: 'melesa'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);

	    // loop thru each tweet and print the position, created at, and tweet
	    for(var i=0; i<tweets.length; i++) {
	    	console.log(tweets[i].created_at);
	    	console.log(' ');
	    	console.log(tweets[i].text);
	    }
	  }
	});
}


// function that displays artists names from spotify
var getArtistNames = function(artist) {
	return artist.name;
}

// function that displays songs from spotify - ISNT WORKING!
var getMySpotify = function(songName) {

	spotify.search({ type: 'track', query: 'songName' }, function(err, data) {
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    }

	 // loop thru songs and pull out all the desired attributes 
	    var songs = data.tracks.items;
	    for(var i=0; i<songs.length; i++) {
	    	console.log(i);
	    	console.log('artist(s): ' + songs[i].artists.map(
	    		getArtistNames));
	    	console.log('song name: ' + songs[i].name);
	    	console.log('preview song: ' + songs[i].name);
	    	console.log('album: ' + songs[i].album.name);
	    } 
	});
}


// function that displays a given movie's attributes from omdb - ISNT WORKING!
var getMyMovie = function(movieName) {

	request('http://www.omdbapi.com/?t=' + movieName + '&40e9cece', function (error, response, body) {

	  if(!error && response.statusCode ==200) {

	  	var jsonData = JSON.parse(body);

	  	console.log('Title: ' + jsonData.Title);
	  	console.log('Year: ' + jsonData.Year);
	  	console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating);
	  	console.log('Country: ' + jsonData.Country);
	  	console.log('Language: ' + jsonData.Language);
	  	console.log('Plot: ' + jsonData.Plot);
	  	console.log('Actors: ' + jsonData.Actors);
	  } 
	  
	});
}

// node file system package instructions to read the file random.txt - WORKS!
var doWhatSays = function() {

	fs.readFile('random.txt', 'utf8', (err, data) => {
	  if (err) throw err;

	  var dataArr = data.split(',');

	  if (dataArr.length == 2) {
	  	pick(dataArr[0], dataArr[1]);
	  } else if (dataArr.length == 1){
	  	pick(dataArr[0]);
	  }
	  
	});
}

// runs tweets, spotify songs, movie, and other random entries when the user requests 
// OR a message saying Liri doesnt know appears
var pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets':
			getMyTweets();
			break;
		case 'spotify-this-song':
			getMySpotify(functionData);
			break;
		case 'movie-this':
			getMyMovie(functionData);
		case 'do-what-it-says':
			doWhatSays();
			break;
		default:
		console.log('Liri does not know that');
	}
}

var runThis = function(input1, input2) {
	pick(input1, input2);
};

runThis(process.argv[2], process.argv[3]);




