require('dotenv').config();
var code = require('./code.js');
var spotify = new spotify(code.spotify);
var axios = require('axios');
var moment = require('moment');



switch (process.argv[2]){
    case "concert-this":
            var artist = process.argv.slice(3).join('+');
            var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=8745cdf1-18ef-4afc-ba8b-e904f5604e2c";

            axios.get(queryUrl).then(function(response){
                console.log(response.data[0].venue.name);
                console.log(response.data[0].venue.city);
                console.log(response.data[0].venue.country);
                var time = response.data[0].datetime;
                timePretty = moment(time).format("MM/DD/YYYY");
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
                }
                console.log(error.config);
            })
            return;
            
    case "spotify-this-song":
        var search = process.argv.slice(3).join("+");
        spotify.get({type: 'track', query: search}, function(err,data){
            if(err){
                console.log('Error occurred: ' + err);
                return;
            }
        }).then(function(response){
            console.log(response.data);
        })
        console.log(response.data)
    case "movie-this":
    var movieName = process.argv.slice(3).join("+");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    if(!movieName){
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
        return;
    }
    case "do-what-it-says":
}