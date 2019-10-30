const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const address = process.argv[2]

geocode(address, (error, data) => {
    if (error) {
        return console.log('Error', error)
    }

    weather(data, (error, response) => {
        if (error) {
            return console.log('Error', error)
        }
        console.log(response)
    })

})


