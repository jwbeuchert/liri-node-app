// Require environment variable configuration
require('dotenv').config()
// Import keys file file for module exports
var keys = require('./keys.js');
// Require data from File System npm pkg
var fs = require('fs');
// Require Axios npm pkg for url query
var axios = require('axios');
//  Require data from moment npm pkg
var moment = require('moment');

function myConcert(userInput) {
  var artist = userInput;
    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.
    if(!artist) {
      console.log("Deep Purple - some of the best driving adrenaline pumping Hard Rocking Sounds");
      artist = "Deep Purple"
    }
    
  var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.concert.BIT;

  axios.get(url).then(
    function(response) {
      // Return response.data with moment
      console.log("Concert Venue: " + response.data[0].venue.name);
      console.log("Concert Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + "' " + response.data[0].venue.country);
      console.log("Concert Time: " + moment(response.data[0].datetime, 'YY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A'));
      console.log("---------------------------------------------------");

    // output data to a log.txt, append each command , does not overwrite file each time command is run
    fs.appendFileSync('concert.txt', "\r\n" + "Concert Search Log-----------------------" + "\r\n", 'utf8');
    fs.appendFileSync('concert.txt', "\r\n" +  "Name of Venue: " + response.data[0].venue.name  + "\r\n", 'utf8');
    fs.appendFileSync('concert.txt', "\r\n" + "Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + " " + response.data[0].venue.country + "\r\n", 'utf8');
    fs.appendFileSync('concert.txt', "\r\n" + "Date of Event: " + moment(response.data[0].datetime, 'YY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A') + "\r\n", 'utf8');
    fs.appendFileSync('concert.txt', "\r\n" + "---------------------------------------"  + "\r\n", 'utf8');
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
  
    console.log("Concert.txt was updated!");
};

// Exporting function used in liri.js
module.exports = myConcert;