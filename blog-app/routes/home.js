const express = require("express");
const router = express.Router();
const compose = require('./compose')

const homeStartingContent = "இரண்டாயிரத்து ஐந்நூறு ஆண்டுகளுக்கும் மேல் பழமை வாய்ந்த இலக்கிய மரபைக் கொண்டுள்ள தமிழ் மொழி, தற்போது வழக்கில் இருக்கும் ஒரு சில செம்மொழிகளில் ஒன்றாகும்.  தமிழ், இந்தியாவில் பேசப்படும் மொழிகளில் மிக நீண்ட இலக்கிய, இலக்கண மரபுகளைக் கொண்டது. தமிழ் இலக்கியங்களில் சில 2500 ஆண்டுகளுக்கு மேல் பழமையானவை";
const blogPosts = compose.blogPosts

router.get('/', function (req, res) {
  res.render('home', {
    homeStartingContent,
    blogPosts
  })
});

module.exports = router