const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");


const userOne = {
  _id: mongoose.Types.ObjectId(),
  name: "user1",
  password: ":!?8$VYcF:VN9*[j",
  email: "user1@taskapp.io"
  //tokens set here fails to save
};


const userTwo = {
  _id: mongoose.Types.ObjectId(),
  name: "user2",
  password: ":!?8$VYcF:VN9*[j",
  email: "user2@taskapp.io"
  //tokens set here fails to save
};


const userThree = {
  _id: mongoose.Types.ObjectId(),
  name: "user3",
  password: ":!?8$VYcF:VN9*[j",
  email: "user3@taskapp.io"
  //tokens set here fails to save
};

const taskOne = {
  _id: mongoose.Types.ObjectId(),
  description: 'First Task',
  owner: userOne._id
}

const taskTwo = {
  _id: mongoose.Types.ObjectId(),
  description: 'Second Task',
  completed: true,
  owner: userOne._id
}

const taskThree = {
  _id: mongoose.Types.ObjectId(),
  description: 'Third Task',
  owner: userTwo._id
}

const setupDB = async () => {
  //Clear All Records
  await User.deleteMany();
  await Task.deleteMany();

  //Load User Seed Data
  let user = new User(userOne);
  await user.save(); //NOT WORKING for TOKENS Collection if defined in userOne
  await user.generateAuthToken(); //Workaround to store Auth token into the collection

  user = new User(userTwo);
  await user.save(); //NOT WORKING for TOKENS Collection if defined in userOne
  await user.generateAuthToken(); //Workaround to store Auth token into the collection

  user = new User(userThree);
  await user.save(); //NOT WORKING for TOKENS Collection if defined in userOne
  await user.generateAuthToken(); //Workaround to store Auth token into the collection

  //Load Task Seed Data
  await new Task(taskOne).save()
  await new Task(taskTwo).save()
  await new Task(taskThree).save()
};

const getUserToken = async id => {
  const user = await User.findById(id);
  return user.tokens[0].token;
};

module.exports = {
  userOne,
  userTwo,
  taskThree,
  setupDB,
  getUserToken
};