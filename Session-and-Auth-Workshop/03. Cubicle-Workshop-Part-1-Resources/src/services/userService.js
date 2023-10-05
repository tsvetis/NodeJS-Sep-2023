const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = (userData) => {
  return User.create(userData);
};

exports.login = async (username, password) => {
  const user = await User.findOne({ username });

  // validate username
  if (!user) {
    throw new Error("Invalid username or password!");
  }

  // validate password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid username or password!");
  }

  return user;
};
