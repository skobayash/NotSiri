require("dotenv").config();
var request = require("request");

// VARIABLE PATHWAYS
var fs = require("fs")
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

// GLOBAL VARIABLES
var req = process.argv[2];
var q = process.argv[3]
// var query = q.split(' ').join('+');


/* SWITCH STATEMENT */
switch (req) {
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        omdbThis();
        break;
    case "my-tweets":
        tweetThis();
        break;
}


/* MAIN COMPONENTS */

// 1. SPOTIFY API
function spotifyThis () { 
  var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });

  spotify.search({ type: 'track', query: q }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else if (!q) {
      return console.log("nope")
    }

    for (var i = 0; i < data.tracks.items.length; i++){
      console.log("Artist: " + data.tracks.items[i].artists[0].name)
      console.log("Song: " + data.tracks.items[i].name)
      console.log("Album: " + data.tracks.items[i].album.name)
      console.log("Listen on Spotify: " + data.tracks.items[i].external_urls.spotify)
      console.log("----------------------------------------")
    
  }
  });
}



// 2. OMDB API
function omdbThis() {
  var queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=" + process.env.OMDB_KEY;

  request(queryUrl, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("Plot Summary: " + JSON.parse(body).Plot);
      console.log("----------------------------------------")
    }
  });
}

// 997227706038145030

function tweetThis () {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
  
  var params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets.lists);
    }
  });
}