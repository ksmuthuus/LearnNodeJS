const jwt = require('jsonwebtoken')
const request = require('supertest')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const app = require('../../src/app')

const userOneId = mongoose.Types.ObjectId()
let token = undefined
const userOne = {
  _id: userOneId,
  name: 'Muthu',
  password: ':!?8$VYcF:VN9*[j',
  email: 'muthu@muthu.com',
  //tokens set here fails to save
}

const setupDB = async () => {
  await User.deleteMany()
  const user = new User(userOne)
  await user.save() //NOT WORKING for TOKENS Collection if defined in userOne
  return await user.generateAuthToken() //Workaround to store Auth token into the collection
}

module.exports = {
  userOneId,
  userOne,
  setupDB
}