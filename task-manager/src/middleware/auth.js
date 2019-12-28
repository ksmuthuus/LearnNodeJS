const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  try {
    const header = req.header('Authorization')
    const token = header && header.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token
    })
    if (!user)
      throw new Error('Invalid Token')
    req.user = user
    req.token = token
    next()
  } catch (err) {
    return res.status(500).send(err.message)
  }

}
module.exports = auth