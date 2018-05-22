# NotSiri
A node.js app that is not Siri

## Overview
This project is a command-line node.js app that takes in parameters and returns data from various API's.

NotSiri is a node.js app that, when given various commands, will return the results of an npm api request.

`node liri.js spotify-this-song <song to look up>`
`node liri.js movie-this <movie to look up>`
`node liri.js my-tweets`
`node liri.js do-what-it-says`



## Running the App
The App has 4 main functions. It can return your most recent 20 tweets, log essential details about different Spotify songs, return details about movies, and execute any of the before-mentioned functions by reading input from a text file.

## Requirements
To run this project, you will need:

1. To initialize npm to create a package.json file

2. To install the following npm packages: 
	- twitter
	- node-spotify-API
	- request
	- DotEnv
	
3. A .env file that contains the following:

	### Spotify API keys
	- SPOTIFY_ID=your-spotify-id
	- SPOTIFY_SECRET=your-spotify-secret

	### Twitter API keys
	- TWITTER_CONSUMER_KEY=your-twitter-consumer-key
	- TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
	- TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
	- TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

## Running the app
To use this app run one of the following commands:

* `node liri.js my-tweets`
	- This will show @Finkus McHoagy's last 20 tweets and when they were created at in your terminal/bash window.
	- These happen to be a list of some of the best NPR host/reporter names.

* `node liri.js spotify-this-song "<name of song>"`
	- This will show 20 results related to your requested song in your terminal/bash window. Each result will display the song's name, artist(s), album, and a preview link to the song on Spotify.
	- If no song is entered into the terminal window, the search will default to looking up This Is America by Childish Gambino.

* `node liri.js movie-this`
	- This will output the following information about the movie to your terminal/bash window: Title, Year released, IMDB rating, Rotten Tomatoes rating, Country where movie was produced, Language, Plot, and Featured Actors.
	- If no movie is entered into the terminal, the command will return information about "A Quiet Place".
	
* `node liri.js do-what-it-says`
	- This will take the text inside of random.txt and use it to call one of NotSiri's commands. (In this case, it will spotify-this-song for This Is America by Childish Gambino.)
	- Feel free to change the text in that document to test out the feature for other commands.
	
* Lastly, NotSiri will log the results of each command in the file "log.txt" so you can view your search history.