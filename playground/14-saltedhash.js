const bcrypt = require("bcryptjs");

async function run() {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash("Password1", salt);
  console.log("Salt: ", salt);
  console.log("Hased: ", hashed);
}

run();
