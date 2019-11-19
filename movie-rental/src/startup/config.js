const config = require("config");

module.exports = function () {
  if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: Missing JWT Private Key')
    process.exit(1)
  }
}