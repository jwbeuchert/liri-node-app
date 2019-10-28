// Require environment variable configuration
require('dotenv').config()
var Spotify = require('node-spotify-api');
// Import keys file file for module exports
var keys = require('./keys.js');
// Require data from File System npm pkg
var fs = require('fs');
// Access spotify keys information
var spotifyClient = new Spotify(keys.spotify);

// If no song input then default
function mySpotify(userInput) {
  var song = userInput;
  
  if(!song) {
    console.log("No song determined.");
    console.log("I will select one for you.");
    song = "The Sign by Ace of Base"
  }

    spotifyClient.search( { 
      type: 'track', 
      query: song 
    }, function(err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
  }

  // Return response.data
  console.log("\n--------------------------------\nArtist(s): " + data.tracks.items[0].artists[0].name); 
  console.log("The song's name: " + data.tracks.items[0].name);
  console.log("Preview URL: " + data.tracks.items[0].preview_url);
  console.log("The album that the song is from; " + data.tracks.items[0].album.name + "\n---------------\n");

// Add text to log.txt
fs.appendFileSync('log.txt', "\r\n" + "Song Search Log-----------------------" + "\r\n", 'utf8');
fs.appendFileSync('log.txt', "\r\n" + "Artist(s): " + data.tracks.items[0].artists[0].name + "\r\n", 'utf8');
fs.appendFileSync('log.txt', "\r\n" + "Song Name: " + data.tracks.items[0].name + "\r\n", 'utf8');
fs.appendFileSync('log.txt', "\r\n" + "Preview Link: " + data.tracks.items[0].preview_url + "\r\n", 'utf8');
fs.appendFileSync('log.txt', "\r\n" + "Album: " + data.tracks.items[0].album.name + "\r\n", 'utf8');
fs.appendFileSync('log.txt', "\r\n" + "---------------------------------------"  + "\r\n", 'utf8');
});
}

// Exporting function used in liri.js
module.exports = mySpotify;