const jsonwebtoken = require("jsonwebtoken");
const { promisify } = require("util");

const jwt = {
  sign: promisify(jsonwebtoken.sign),
  verify: promisify(jsonwebtoken.verify),
};

module.exports = jwt;
