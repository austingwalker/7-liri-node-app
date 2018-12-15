var dotenv = require("dotenv");
var Spotify = require('node-spotify-api');
var request = require("request");
var chalk = require("chalk");

dotenv.config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2]


var content = process.argv[3];
for(var i = 4; i < process.argv.length; i++){
    content += "+" + process.argv[i];
}

if(command === "movie-this"){

    var queryUrl = "http://www.omdbapi.com/?t=" + content + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    request(queryUrl, function(err, response, body){
        if(!err && response.statusCode === 200){

            console.log(chalk.black.bgCyan("Title") + ' ' + JSON.parse(body).Title);
            console.log(chalk.black.bgCyan("Year released:") + ' ' + JSON.parse(body).Year);
            console.log(chalk.black.bgCyan("IMDB rated this movie:") + ' ' + JSON.parse(body).imdbRating);
            console.log(chalk.black.bgCyan("Rotten Tomatoes rated this movie:") + ' ' + JSON.parse(body).Ratings[1].Source);
            console.log(chalk.black.bgCyan("Produced in:") + ' ' + JSON.parse(body).Country);
            console.log(chalk.black.bgCyan("Language:") + ' ' + JSON.parse(body).Language);
            console.log(chalk.black.bgCyan("Plot:") + ' ' + JSON.parse(body).Plot);
            console.log(chalk.black.bgCyan("Actors include:") + ' ' + JSON.parse(body).Actors);
        }
    })

}

if(command === "concert-this"){


    var queryUrl = "https://rest.bandsintown.com/artists/" + content + "/events?app_id=codingbootcamp"

    console.log(queryUrl);
    
    request(queryUrl, function(err, response, body){
        if(!err && response.statusCode === 200){
            debugger;

            var jsonData = JSON.parse(body);


            console.log(jsonData);
            
        }
    })

}


if(command === "spotify-this-song"){

    spotify.search({ type: 'track', query: content }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(JSON.stringify(data, null, 2)); 
      });

}

if(command === "do-what-it-says"){

}










