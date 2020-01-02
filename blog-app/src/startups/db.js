const mongoose = require('mongoose')

mongoose.connect("mongodb://mongo:27017/blogDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connection to MongoDB Successful!"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));