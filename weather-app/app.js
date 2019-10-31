const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const address = process.argv[2]

geocode(address, (error, geodata) => {
    if (error) {
        return console.log('Error', error)
    }

    weather(geodata, (error, response) => {
        if (error) {
            return console.log('Error', error)
        }
        console.log(response)
    })

})


