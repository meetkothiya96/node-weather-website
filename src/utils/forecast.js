const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherbit.io/v2.0/current?lat='+ latitude +'&lon=' + longitude + '&key=5783d724211e409c9bb909d9b6b5809b&units=I';
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect with the server.", undefined);
        } else if(body.error){
            callback("Unable to find location!", undefined);
        } else{
            callback(undefined,"It is currently "+ body.data[0].temp +" degree and "+ body.data[0].precip + " % chance of rain.");
        }
    })
}

module.exports = forecast;