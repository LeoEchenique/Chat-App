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
      let tbFound = await User.findOne({
        $or: [{ username }, { email },]
      })
      if (tbFound !== null) {
        if (tbFound.username === username && tbFound.email === email) throw new Error("Username and Email already taken");
        if (tbFound.email === email) throw new Error("Email already taken");
        if (tbFound.username === username) throw new Error("Username already taken");
      }
      let user = await User.create({
        username,
        email,
        password,
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
