const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 10,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 10,
    max: 30,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  avatar: {
    type: String,
    default: "No avatar choosen",
  },
});

module.exports = mongoose.model("User", userSchema);
