const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const address = process.argv[2]

if (!address) {
    return console.log('Address is required')
}

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


