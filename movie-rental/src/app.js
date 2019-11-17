require("express-async-errors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const winston = require("winston");
require('winston-mongodb')
const app = express();
require('./startup/routes')(app)
require('./startup/db')()


//Uncaught exceptions from sync context
// process.on('uncaughtException', (ex) => {
//   winston.error(ex.message, ex)
// })

winston.exceptions.handle(new winston.transports.File({
  filename: 'unhandledExceptions.txt'
}))

//Unhandled Promises from async context
process.on('unhandledRejection', (ex) => {
  winston.error(ex.message, ex)
  process.exit(1)
  //throw ex;
})

winston.add(new winston.transports.File({
  filename: "log.txt"
}));

winston.add(new winston.transports.MongoDB({
  db: 'mongodb://localhost:27017/MovieRental',
  level: 'error'
}))


// if (!config.get('jwtPrivateKey')) {
//     console.log('FATAL ERROR: Missing JWT Private Key')
//     process.exit(1)
// }



//app.use(helmet());

if (app.get("env") !== "production") app.use(morgan("tiny"));

const port = process.env.NODE_PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});