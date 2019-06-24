// require('dotenv').config();
// var code = require('./code.js');
// var spotify = new spotify(code.spotify);
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
            // This line is just to help us debug against the actual URL.
            return;
            
    case "spotify-this-song":
    case "movie-this":
    var movieName = process.argv.slice(3).join("+");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    if(movieName = undefined){
        var queryUrl = "http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(function(response){

            console.log(response.data);
            console.log(`Name: ${response.data.title}`);
            console.log(`Year: ${response.data.Year}`);
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
            console.log(response.data);

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