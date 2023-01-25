var jwt = require("jsonwebtoken");

const isTokenValid = (id) => {
  return jwt.verify(id, process.env.JWT_KEY);
};

const sign = (id) => jwt.sign(id, process.env.JWT_KEY);

module.exports = {
  isTokenValid,
  sign,
};
