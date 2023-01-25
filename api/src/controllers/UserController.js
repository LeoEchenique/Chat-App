const User = require("../models/User");
const { encryptPassword, comparePassword } = require("../utils/bcrypt");
const { isTokenValid, sign } = require("../utils/jwt");

const logUser = async (name, password, id) => {
  //"isActive" should be a virtual?
  // need to update "isActive" prop to true
  if (id) {
    let token = sign(id, process.env.JWT_KEY);
    return token;
  } else {
    let user = await User.findOne({ "profile.username": name });
    if (!user) throw new Error("Username doesn't exist");
    let isPassword = await comparePassword(password, user.profile.password);
    if (isPassword) {
      user.profile.isActive = true;
      user.save();
      let token = sign({ token: user._id }, process.env.JWT_KEY);
      console.log("token for the logged user: ", token);
      return token;
    } else throw new Error("Incorrect password");
  }
};

const postUser = async (username, passwordTBhash, email) => {
  const password = await encryptPassword(passwordTBhash);

  try {
    let tbFound = await User.findOne({
      $or: [{ "profile.username": username }, { "profile.email": email }],
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
  let logged = await logUser(false, false, user.profile.username);
  return logged;
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
