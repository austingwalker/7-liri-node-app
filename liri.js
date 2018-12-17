var dotenv = require("dotenv");
var Spotify = require('node-spotify-api');
var request = require("request");
var chalk = require("chalk");
var fs = require("fs");

dotenv.config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2]


var content = process.argv[3];
for(var i = 4; i < process.argv.length; i++){
    content += "+" + process.argv[i];
}

switch (command){
    case "movie-this":
    movieThis();
    break;

    case "concert-this":
    concertThis();
    break;

    case "spotify-this-song":
    spotifyThis();
    break

    case "do-what-it-says":
    doWhatItSays();
    break;

    default:
    console.log("I don't know how to do that");
    break;


}

function movieThis(){

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


//********** Need an api key **********  */
function concertThis(){


    var queryUrl = "https://rest.bandsintown.com/artists/" + content + "/events?app_id=*NEEDKEY*"

    console.log(queryUrl);
    
    request(queryUrl, function(err, response, body){
        if(!err && response.statusCode === 200){
            debugger;

            var jsonData = JSON.parse(body);


            console.log(jsonData.venue);
            console.log(jsonData.address);
            console.log(jsonData.date);
            
        }
    })

}


function spotifyThis(){

    spotify.search({ type: 'track', limit: '3', query: content }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);

          
        }

        var songs = data.tracks.items;

        for (var i = 0; i < songs.length; i++) {
          
          console.log("\n")
          console.log(chalk.black.bgCyan("Artist:") + " " + songs[i].album.artists[0].name);
          console.log(chalk.black.bgCyan("Song name:") + " " + " "  + songs[i].name);
          console.log(chalk.black.bgCyan("Preview song:") + " " + songs[i].preview_url);
          console.log(chalk.black.bgCyan("Album:") + " " + songs[i].album.name);     
          console.log("-----------------------------------");
        }

        

   
    
      });

}

function doWhatItSays(){

    fs.readFile("random.txt", "utf8", function(err, data){
        if (err){
            return console.log(err);
        }

        var paramSong = data;

       var parsedData = paramSong.split(",");

       command2 = parsedData[0];
       content2 = parsedData[1];

       command = command2;
       content = content2

       spotifyThis();

    })

}










