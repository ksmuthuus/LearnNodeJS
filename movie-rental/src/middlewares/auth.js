const jwt = require('jsonwebtoken')

module.exports = function auth(req, res, next) {
  const token = req.header('x-auth-token')
  if (!token) {
    return res.status(401).send({
      message: 'Access denied! Missing Auth Token header: x-auth-token'
    })
  }

  try {
    const decoded = jwt.verify(token, 'MyPrivateKey')
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).send({
      message: 'Invalid Auth Token'
    })
  }
}