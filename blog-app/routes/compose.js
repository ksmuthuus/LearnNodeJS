const express = require("express");

const router = express.Router();

const blogPosts = []

router.get('/', function (req, res) {
  res.render('compose')
});

router.post('/', function (req, res) {
  const blogPost = {
    title: req.body.postTitle,
    body: req.body.postBody
  }
  blogPosts.push(blogPost)
  res.redirect('/')
})

module.exports = {
  router,
  blogPosts
}