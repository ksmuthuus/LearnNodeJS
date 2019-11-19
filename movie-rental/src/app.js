const express = require("express");

const app = express();
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/logging')
require('./startup/exception')
require('./startup/secure')






const port = process.env.NODE_PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});