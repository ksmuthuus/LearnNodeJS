require("express-async-errors");
const winston = require('winston')

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