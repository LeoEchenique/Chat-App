const User = require("../models/User");
const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, inputPassword) => {
  return await bcrypt.compare(password, inputPassword);
};

module.exports = {
  post: async (username, passwordTBhash, email) => {
    const password = await encryptPassword(passwordTBhash);

    try {
      let user = await User.create({
        username,
        email,
        password,
      });
      return user;
    } catch (error) {
      throw new Error("Username or Email already ocuppied");
    }
  },
};
