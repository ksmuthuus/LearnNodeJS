const express = require("express");
const Post = require('../models/post')
const router = express.Router();

const blogPosts = []

router.get('/', function (req, res) {
  res.render('compose')
});

router.post('/', async function (req, res) {
  const blogPost = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  //blogPosts.push(blogPost)
  const post = new Post(blogPost)
  await post.save()
  res.redirect('/')
})

module.exports = {
  router,
  blogPosts
}