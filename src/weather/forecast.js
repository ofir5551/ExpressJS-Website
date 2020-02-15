const request = require('request');

const forecast = (latitude, longtitude, callback) => {
    const url = `https://api.darksky.net/forecast/bb5694d5b310bca9b767aef545e0113b/${latitude},${longtitude}?units=si`;

    request({ url, json: true }, (error, res) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (res.body.error) {
            callback(`Unable to find location!`, undefined);
        } else {
            const forecast = {
                summary: res.body.currently.summary,
                currentTemp: res.body.currently.temperature,
                highTemp: res.body.daily.data[0].temperatureHigh,
                lowTemp: res.body.daily.data[0].temperatureLow,
                rainChance: res.body.currently.precipProbability,
            };
            callback(undefined, forecast);
        }
    })
}

module.exports = forecast;