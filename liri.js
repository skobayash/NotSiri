require("dotenv").config();
var request = require("request");

// VARIABLE PATHWAYS
var fs = require("fs")
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
const omdb = require('omdbapi')

// GLOBAL VARIABLES
var req = process.argv[2];
var logData;
var q = "";
var movieq = "";

for (i = 3; i < process.argv.length; i++) {
	q += (" " + process.argv[i]);
}





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
    case "do-what-it-says":
        doThis();
        break;
}


/* MAIN COMPONENTS */

// 1. SPOTIFY API

function spotifyThis () { 

    if (!q) {
        q = "The Sign Ace of Base";
    }

    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    spotify.search({ type: 'track', query: q }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            for (var i = 0; i < data.tracks.items.length; i++){
            console.log("Artist: " + data.tracks.items[i].artists[0].name)
            console.log("Song: " + data.tracks.items[i].name)
            console.log("Album: " + data.tracks.items[i].album.name)
            console.log("Listen on Spotify: " + data.tracks.items[i].external_urls.spotify)
            console.log("---")

            logData = "Artist: " + data.tracks.items[i].artists[0].name + "\n" 
                    + "Song: " + data.tracks.items[i].name + "\n" 
                    + "Album: " + data.tracks.items[i].album.name + "\n" 
                    + "Listen on Spotify: " + data.tracks.items[i].external_urls.spotify + "\n"
                    + "---" + "\n";
           
            fs.appendFile("log.txt", logData, function(err) {
                if (err) {
                    return console.log(err);
                }
            });


            }
        }
    });

}



// 2. OMDB API
function omdbThis () {

    if (!q) {
        q = "Mr.+Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + q + "&y=&tomatoes=true&plot=short&apikey=" + process.env.OMDB_KEY;

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Plot Summary: " + JSON.parse(body).Plot);
            console.log("-------------------------------------------------");
        
            logData = "Title: " + JSON.parse(body).Title + "\n"
            + "Release Year: " + JSON.parse(body).Year + "\n" 
            + "IMDb Rating: " + JSON.parse(body).imdbRating  + "\n" 
            + "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n"
            + "Country: " + JSON.parse(body).Country + "\n" 
            + "Actors: " + JSON.parse(body).Actors  + "\n" 
            + "Plot Summary: " + JSON.parse(body).Plot + "\n" 
            + "-------------------------------------------------" + "\n";

            fs.appendFile("log.txt", logData, function(err) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    });
};




// 3. TWITTER
function tweetThis () {
    var client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
    
    var params = {user_id: '997227706038145030'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);

            logData = tweets[i].text + "\n";

            fs.appendFile("log.txt", logData, function(err) {
                if (err) {
                    return console.log(err);
                }
            });


        }
      }
    });
    console.log("-------------------------------------------------")
}

// 4. Do What It Says
function doThis () {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        
        var output = data.split(",");
        q = output[1];
        req = output[0];
        
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
    })
}