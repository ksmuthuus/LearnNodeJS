const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {
  userOneId,
  userOne,
  setupDB
} = require('./fixtures/db')

let token = undefined
//Jest Lifecycle method
beforeEach(async () => {
  token = await setupDB()
})

test('Should SignUp User', async () => {
  const response = await request(app).post('/api/users').send({
    name: "MKS",
    email: "mks@grr.la",
    password: "Password",
    age: 35
  }).expect(201)

  //Assert user stored into DB
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  //Assert user object macthes input
  expect(response.body).toMatchObject({
    user: {
      name: "MKS",
      email: "mks@grr.la"
    },
    token: user.tokens[0].token
  })

  //Assert password in hashed
  expect(user.password).not.toBe('Password')
})

test('Should SignIn User', async () => {
  const response = await request(app).post('/api/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)

  //Assert user inserted into DB
  const user = await User.findById(userOneId)
  expect(user).not.toBeNull()

  //Assert second token in collection is returned
  expect(response.body.token).toBe(user.tokens[1].token)

})

test('Should Fail SignIn for non existing username', async () => {
  await request(app).post('/api/users/login').send({
    email: 'nonexistinguser@domain.com',
    password: userOne.password
  }).expect(400)
})

test('Should Fail SignIn for non wrong password', async () => {
  await request(app).post('/api/users/login').send({
    email: userOne.email,
    password: 'wrongpassword'
  }).expect(400)
})

test('Should Get User Profile', async () => {
  await request(app).get('/api/users/me')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200)
})

test('Should Not Get User Profile for non authenticated users', async () => {
  await request(app).get('/api/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user', async () => {
  const response = await request(app)
    .delete('/api/users/me')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200)

  //Assert if user deleted from DB
  const user = await User.findById(userOneId)
  expect(user).toBeNull()

})

test('Should not delete account for unauthenticate user', async () => {
  await request(app)
    .delete('/api/users/me')
    .send()
    .expect(401)
})

test('Should upload profile image', async () => {
  await request(app).post('/api/users/me/avatar')
    .set('Authorization', `Bearer ${token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)

  const user = await User.findById(userOneId)
  //Assett user not null
  expect(user).not.toBeNull()

  //Assert avatar is stored as buffer
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
  const response = await request(app).patch('/api/users/me')
    .send({
      name: 'MuthuKS'
    })
    .set('Authorization', `Bearer ${token}`)
    .expect(200)

  //Assert data updated
  const user = await User.findById(userOneId)
  expect(user.name).toBe('MuthuKS')

})

test('Should not update invalid user fields', async () => {
  await request(app).patch('/api/users/me')
    .send({
      location: 'cityname'
    })
    .set('Authorization', `Bearer ${token}`)
    .expect(400)

})