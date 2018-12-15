var dotenv = require("dotenv");
var Spotify = require('node-spotify-api');

dotenv.config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2]


var content = process.argv[3];
for(var i = 4; i < process.argv.length; i++){
    content += " " + process.argv[i];
}

spotify.search({ type: 'track', query: content }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(JSON.stringify(data, null, 2)); 
  });



