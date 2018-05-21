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

// In case forget to put query in quotes in terminal
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

// Append data to log.text
function writeToLog() {
    fs.appendFile("log.txt", logData, function(err) {
        if (err) {
            return console.log(err);
        }
    });
}


/* 1. SPOTIFY API */
function spotifyThis () { 

    // If empty string, default to
    if (!q) {  
        q = "The Sign Ace of Base";
    }

    // User authentification    
    var spotify = new Spotify({     
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    // Search Spotify
    spotify.search({ type: 'track', query: q }, function(err, data) {
        if (err) {  // Return error
            return console.log('Error occurred: ' + err);
        } else { 

            // Log spotify components
            for (var i = 0; i < data.tracks.items.length; i++){
            console.log("Artist: " + data.tracks.items[i].artists[0].name)
            console.log("Song: " + data.tracks.items[i].name)
            console.log("Album: " + data.tracks.items[i].album.name)
            console.log("Listen on Spotify: " + data.tracks.items[i].external_urls.spotify)
            console.log("---")

            // Data to append to log.txt file
            logData = "Artist: " + data.tracks.items[i].artists[0].name + "\n" 
                    + "Song: " + data.tracks.items[i].name + "\n" 
                    + "Album: " + data.tracks.items[i].album.name + "\n" 
                    + "Listen on Spotify: " + data.tracks.items[i].external_urls.spotify + "\n"
                    + "---" + "\n";
            
            // Append logData
            writeToLog();

            }
        }
    });
}



/* 2. OMDB API */
function omdbThis () {

    if (!q) {    // Return error
        q = "Mr.+Nobody";
    }

    // Constructing query
    var queryUrl = "http://www.omdbapi.com/?t=" + q + "&y=&tomatoes=true&plot=short&apikey=" + process.env.OMDB_KEY;

    // npm HTTP request
    request(queryUrl, function(error, response, body) {

        //Log movie components
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Plot Summary: " + JSON.parse(body).Plot);
            console.log("-------------------------------------------------");
        
            // Data to append to log.txt file
            logData = "Title: " + JSON.parse(body).Title + "\n"
            + "Release Year: " + JSON.parse(body).Year + "\n" 
            + "IMDb Rating: " + JSON.parse(body).imdbRating  + "\n" 
            + "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n"
            + "Country: " + JSON.parse(body).Country + "\n" 
            + "Actors: " + JSON.parse(body).Actors  + "\n" 
            + "Plot Summary: " + JSON.parse(body).Plot + "\n" 
            + "-------------------------------------------------" + "\n";

            // Append logdata
            writeToLog();

        }
    });
};



/* 3. TWITTER */
function tweetThis () {
    var client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
    
    var params = {user_id: '997227706038145030'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
     
        // log tweets
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);

                // Data to append to log.txt file
                logData = tweets[i].text + "\n"; 

                // Append logData
                writeToLog();

            }
        }
    });
    console.log("-------------------------------------------------")
}

/* 4. DO WHAT IT SAYS */
function doThis () {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        
        // Reassign q & req variables to data from random.txt
        var output = data.split(",");
        q = output[1];
        req = output[0];
        
        // New switch case for new q & req values
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