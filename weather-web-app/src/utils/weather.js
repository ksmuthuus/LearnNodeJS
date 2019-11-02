const request = require('request')

const accessToken = ''
const weather = (lat, lang, callback) => {
    const url = `https://api.darksky.net/forecast/${accessToken}/${lat},${lang}`
    request({
        uri: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to source service!', undefined)
        } else if (response.error) {
            callback('Unable to fetch weather', undefined)
        } else {
            const data = {
                summary: response.body.hourly.summary,
                temp: response.body.currently.temperature,
                rain: response.body.currently.precipProbability
            }
            callback(undefined, data)
        }
    })
}


module.exports = weather