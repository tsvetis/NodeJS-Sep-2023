const mongoose = require("mongoose");
const { URL } = require("./../constants");

async function dbConnect() {
  await mongoose.connect(URL);
}

module.exports = dbConnect;
