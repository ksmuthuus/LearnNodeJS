const winston = require("winston");
module.exports = function(ex, req, res, next) {
  //Log the error
  winston.error(ex.message, ex);
  res.status(500).send({
    message: "Internal Error"
  });
};
