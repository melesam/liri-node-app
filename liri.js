
var keys = require('./keys.js');
var request = require("request");
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require("node-spotify-api");


var twit = new Twitter(keys.twitter);
var spot = new Spotify(keys.spotify);


var input1 = process.argv[2];
var input2 = process.argv[3];


// User commands and input
function commandInput(command, userInput) {
	switch(command){
		case "do-what-it-says": 
		readRandom();
		break;
		case "my-tweets": 
		myTweets();
		break;
		case "spotify-this-song": 
		spotifySong(userInput);
		break;
		case "movie-this":
		movieInfo(userInput);
		break;

	}
};


commandInput(input1, input2);



// random.txt function
function randomFile() {
	fs.readFile("random.txt", function(err, data){
		if(err) {
			console.log(err);
		}

		var textInput = data.split("");
			console.log(textInput);

			input1 = textInput[0];
			input2 = textInput[1];

			commandInput(input1, input2);
	})
};


// function for Twitter
function myTweets() {
	var userName = input2;
	var param = {screen_name: userName};

	twit.get("statuses/user_timeline", param, function(err, tweet, response) {
		if(err) {
			console.log(err);
		}
		else {
			for (var i = 0; i < tweet.length; i++) {
				console.log(tweet[i].text);
				console.log("By: " + tweet[i].user.screen_name + "\n");			
			}
		}
	});
};



// Spotify function
function spotifySong() {
	song = input2;

	if(song === undefined) {
		song = "The Sign";
	}

	spot.search ({type: "track", query:song, limit: 5}, function(err, data) {
		if(err) {
			return console.log("error" + err);
		}
		for (var i = 0; i < data.tracks.items.length; i++) {
			console.log("Artist: " + data.tracks.items[i].artists[0].name);
			console.log("Song: " + data.tracks.items[i].name);
			console.log("Preview Link: " + data.tracks.items[i].external_urls.spotify);
			console.log("Album: " + data.tracks.items[i].album.name + "\n");

		}
	});
	
}



// omdb function
function movieInfo() {
	var movie = input2;

	if(movie === undefined) {
		movie = "Mr. Nobody";
	}

	var url = "http://www.omdbapi.com/?t=" +movie+ "&apikey=" +keys.omdb.api_key;

	request(url, function(err, response, body) {
		if (err) {
			console.log(err)
		}
		if (response.statusCode === 200) {

		var content = JSON.parse(body)

		console.log("The title for the movie is: " + content.Title);
		console.log("This movie was made in: " + content.Year);
		console.log("This movie was made in: " + content.Country);
		console.log("The IMDB rating of the movie is: " + content.Rating[0].Value);
		console.log("The Rotton Tomato rating for this movie is: " + content.Rating[1].Value);
		console.log("The plot of this movie is: " + content.Plot);
		console.log("The actors in this movie are: " + content.Actors);
		

		}
	})
}


