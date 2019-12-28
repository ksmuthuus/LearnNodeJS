//jshint esversion:6


const express = require("express");
const path = require('path')
const bodyParser = require("body-parser");
const ejs = require("ejs");
const homeRouter = require('./routes/home')
const aboutRouter = require('./routes/about')
const contactRouter = require('./routes/contact')
const postRouter = require('./routes/post')
const compose = require('./routes/compose')
require('./startups/db')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/static', express.static("src/public"));
app.use('/', homeRouter)
app.use('/about', aboutRouter)
app.use('/contact', contactRouter)
app.use('/compose', compose.router)
app.use('/post', postRouter)



app.listen(3000, function () {
  console.log("Server started on port 3000");
});