module.exports = function(ex, req, res, _next) {
  //Log the error
  res.status(500).send("Internal Error");
};
