const express = require("express");
const router = express.Router();
const compose = require('./compose')


router.get('/:postTitle', (req, res) => {
  const blogPosts = compose.blogPosts
  const findPost = req.params.postTitle
  const result = blogPosts.filter(post => post.title === findPost)
  if (!result || result.length === 0) {
    return res.render('notfound')
  }
  res.render('post', {
    title: result[0].title,
    body: result[0].body
  })
})

module.exports = router