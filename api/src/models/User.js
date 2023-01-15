const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  profile: {
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
    isActive: {
      type: Boolean,
      default: "false",
    },
  },
  contacts: {
    request: [
      {
        to_id: {
          type: String,
        },
      },
    ],
    incoming_request: [
      {
        from_id: {
          type: String,
        },
      },
    ],
    accepted_request: [
      {
        of_id: {
          type: String,
        },
      },
    ],
    rejected_request: [
      {
        of_id: {
          type: String,
        },
      },
    ],
    pending_request: [
      {
        from_id: {
          type: String,
        },
      },
    ],
  },
});
userSchema.virtual("contactInfo").get(function () {
  //to call this get is just by his name  -> user.contactInfo
  // here logic to return contact info
  //need a controller to search for match
});
module.exports = mongoose.model("User", userSchema);
