const User = require("../models/User");

exports.register = (userData) => {
  return User.create(userData);
};
