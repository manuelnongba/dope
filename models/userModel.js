const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  username: {
    type: String,
    required: [true, "Please provide your username"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["attendant", "admin"],
    default: "attendant",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
});

userSchema.methods.correctPassword = function (candidatePasword) {
  return this.password === candidatePasword;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
