const { extractErrorMsgs } = require("../utils/errorHandle");

module.exports = (err, req, res, next) => {
  const errorMessages = extractErrorMsgs(err);
  res.render("404", { errorMessages });
};
