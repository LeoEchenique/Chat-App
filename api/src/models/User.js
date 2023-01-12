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
  isAvatarSet: {
    type: Boolean,
    default: false
  },
  avatarImage: {
    type: String,
    default: "No image attached"
  },
  contacts: [{
    contact_id: String,
    hasSendMessages: Boolean,
  }]

});

module.exports = mongoose.model("User", userSchema);
