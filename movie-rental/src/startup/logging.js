const winston = require("winston");
require('winston-mongodb')
const morgan = require("morgan");

//if (app.get("env") !== "production") app.use(morgan("tiny"));

winston.add(new winston.transports.File({
  filename: "log.txt"
}));

winston.add(new winston.transports.MongoDB({
  db: 'mongodb://localhost:27017/MovieRental',
  level: 'error'
}))