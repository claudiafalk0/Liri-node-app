require('dotenv').config();
var code = require('./code.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(code.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');

function bandsintown (){
    var artist = process.argv.slice(3).join('+');
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=8745cdf1-18ef-4afc-ba8b-e904f5604e2c";

    axios.get(queryUrl).then(function(response){
        console.log(response.data[0].venue.name);
        console.log(response.data[0].venue.city);
        console.log(response.data[0].venue.country);
        var time = response.data[0].datetime;
        var timePretty = moment(time).format("MM/DD/YYYY");
        console.log(timePretty);
    
    }).catch(function(error){
        if (error.response){
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request){
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        };
        console.log(error.config);
    });
};

function spotifysearch(){
    var search = process.argv.slice(3).join(" ");
    if(!search){
        spotify.search({type: 'track', query: 'The Sign'}, function(err,data){
            if(err){
                console.log('Error occured: ' + err);
                return;
            }
            console.log(data.tracks.items[19].name);
            console.log(data.tracks.items[19].artists[0].name);
            console.log(data.tracks.items[19].album.name);
            console.log(data.tracks.items[19].artists[0].href);
            return;
        });
    }else{

        spotify.search({type: 'track', query: search}, function(err,data){
            if(err){
                console.log('Error occurred: ' + err);
                return;
            }
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].artists[0].name);
            console.log(data.tracks.items[0].album.name);
            console.log(data.tracks.items[0].artists[0].href);
            
        });
    };
};

function omdb(){
    var movieName = process.argv.slice(3).join("+");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    if(!movieName && process.argv[2] === "movie-this"){
        var queryUrl = "http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(function(response){
            console.log(`Name: ${response.data.Title}`);
            console.log(`Year: ${response.data.Year}`);
            console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
            console.log(`Country Produced: ${response.data.Country}`);
            console.log(`Language: ${response.data.Language}`);
            console.log(`Plot: ${response.data.Plot}`);
            console.log(`Actors: ${response.data.Actors}`);
        }).catch(function(error){
            if (error.response){
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request){
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
        return;
    }else{
        axios.get(queryUrl).then(function(response){
            console.log(`Name: ${response.data.Title}`);
            console.log(`Year: ${response.data.Year}`);
            console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
            console.log(`Country Produced: ${response.data.Country}`);
            console.log(`Language: ${response.data.Language}`);
            console.log(`Plot: ${response.data.Plot}`);
            console.log(`Actors: ${response.data.Actors}`);

        }).catch(function(error){
            if (error.response){
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request){
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
    };
};

function doWhatItSays(){
    fs.readFile('random.txt', 'utf8', function(error,data){
        if(error) return console.log(error);
        var dataArr = data.split(", ");
        var object = dataArr[0];
        var song = dataArr[1];
if(object === 'spotify-this-song'){

    spotify.search({type: 'track', query: song}, function(err,data){
        if(err){
            console.log('Error occurred: ' + err);
            return;
        }
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].artists[0].href);
        return;
        
    });  
};
    });
    };

switch (process.argv[2]){
    case "concert-this":
            bandsintown();
            return;         
    case "spotify-this-song":
        spotifysearch();
        return;
    case "movie-this":
        omdb();
        return;
    case "do-what-it-says":
        doWhatItSays();
        return;          

    };