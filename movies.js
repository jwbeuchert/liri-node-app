// Require environment variable configuration
require('dotenv').config()
// Import keys file for module exports
var keys = require('./keys.js');
// Require data from File System npm pkg
var fs = require('fs');
// Require Axios npm pkg for url query
var axios = require("axios");

function myMovie(userInput) {
  var movie = userInput;
  // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.
  if(!movie) {
    console.log("If you haven't watched 'Mr. Nobody', then you should.");
    console.log("It's on Netflix!");
    movie = "Mr. Nobody"
  }

var url = "https://www.omdbapi.com/?t=" + movie + "&apikey=" + keys.movies.OMDB;

// Return desired information
axios.get(url).then(
  function (response) {
    // return response data
    console.log(response.data);
    console.log("------------------------------\n");
    console.log("Title of the movie: " + response.data.Title);
    console.log("Year the movie came out: " + response.data.Year);
    console.log("IMDB Rating of the movie: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[0].Value);
    console.log("Country where the movie was produced: " + response.data.Country);
    console.log("Language of the movie: " + response.data.Language);
    console.log("Plot of the movie: " + response.data.Plot);
    console.log("Actors in the movie: " + response.data.Actors);
    console.log("--------------------------\n")

  // Add text to log.txt 
    fs.appendFileSync('movies.txt', "\r\n" + "Movie Search Log-----------------------" + "\r\n", 'utf8');
    fs.appendFileSync('movies.txt', "\r\n" + "Title: " + response.data.Title  + "\r\n", 'utf8');
    fs.appendFileSync('movies.txt', "\r\n" + "Year: " + response.data.Year  + "\r\n", 'utf8');
    fs.appendFileSync('movies.txt', "\r\n" + "IMDB Rating: " + response.data.imdbRating  + "\r\n", 'utf8');
    fs.appendFileSync('movies.txt', "\r\n" + "Rotten Tomatoes: " + response.data.Ratings[0].Value  + "\r\n", 'utf8');
    fs.appendFileSync('movies.txt', "\r\n" + "Country: " + response.data.Country  + "\r\n", 'utf8');
    fs.appendFileSync('movies.txt', "\r\n" + "Language: " + response.data.Language  + "\r\n", 'utf8');
    fs.appendFileSync('movies.txt', "\r\n" + "Plot: " + response.data.Plot  + "\r\n", 'utf8');
    fs.appendFileSync('movies.txt', "\r\n" + "Actors: " + response.data.Actors  + "\r\n", 'utf8');
    fs.appendFileSync('movies.txt', "\r\n" + "---------------------------------------"  + "\r\n", 'utf8');
  })

  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  })
};
// Exporting function used in liri.js
module.exports = myMovie;