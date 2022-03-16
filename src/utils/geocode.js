const request = require("request");

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address + ".json?access_token=pk.eyJ1IjoibWVldGtvdGhpeWEiLCJhIjoiY2wwYmluOGwwMGp0MDNrbWlxdzNkNnBzYSJ9.5XX0XEbTwRbxpE3YQIZryw&limit=1"

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect with the server!", undefined);
        } else if(body.features.length === 0){
            callback("Unable to find location. Please try a different location.", undefined);
        } else{
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            });
        }
    })
}

module.exports = geocode;