const mongoose = require("../database");
var CryptoJS = require("crypto-js");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    fullname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    failedLoginAttempts: {
      type: Number,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    try {
      this.password = CryptoJS.MD5(this.password).toString();
      next();
    } catch (error) {
      next(error);
    }
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
