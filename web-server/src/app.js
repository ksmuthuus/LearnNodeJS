const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//Configure paths
const staticDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Configure handlebar engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Configure static filepath
app.use(express.static(staticDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        author: 'Muthu'
    })
})

app.get('/help', (req, res) => {
    res.render('Help', {
        title: 'Help',
        author: 'Muthu',
        content: 'this is a help content'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Muthu'
    })
})

app.get('/weather', (req, res) => {
    res.send({ location: 'Madurai', forecast: { temp: '12' } })
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})