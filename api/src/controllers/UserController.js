const User = require("../models/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (inputPassword, password) => {
  return await bcrypt.compare(inputPassword, password);
};
const logUser = async (name, password) => {
  //"isActive" should be a virtual?
  // need to update "isActive" prop to true
  let user = await User.findOne({ "profile.username": name });
  if (!user) throw new Error("Username doesn't exist");
  let { avatar, username, email, isActive } = user.profile;
  let payload = {
    id: user._id,
    avatar,
    username,
    email,
    isActive,
  };
  let isPassword = await comparePassword(password, user.profile.password);
  if (isPassword) {
    user.profile.isActive = true;
    user.save();
    let token = jwt.sign(payload, process.env.JWT_KEY);
    return token;
  } else throw new Error("Incorrect password");
};

const postUser = async (username, passwordTBhash, email) => {
  const password = await encryptPassword(passwordTBhash);
  try {
    let tbFound = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (tbFound !== null) {
      if (
        tbFound.profile.username === username &&
        tbFound.profile.email === email
      )
        throw new Error("Username and Email already taken");
      if (tbFound.profile.email === email)
        throw new Error("Email already taken");
      if (tbFound.profile.username === username)
        throw new Error("Username already taken");
    }
    let user = await User.create({
      profile: {
        username: username,
        email,
        password,
      },
    });
    let logged = await logUser(user.profile.username, passwordTBhash);
    return logged;
  } catch (error) {
    throw new Error(error.message);
  }
};

const putUserAvatar = async (avatar, id) => {
  let user = await User.findOneAndUpdate(
    { _id: id },
    { $set: { "profile.avatar": avatar }, "profile.isActive": true },
    {
      new: true,
    }
  );

  return user.profile;
};
const getById = async (id) => {
  let user = await User.findOne(
    { _id: id }
    // {
    //   "profile.password": 1, // this second object now is like the properties that you only want to retrieve
    //   _id: 0,
    // }
  );
  return user;
};

module.exports = {
  postUser,
  putUserAvatar,
  getById,
  logUser,
};
