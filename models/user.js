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
      unique: true,
    },
    email: {
      type: String,
      require: true,
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
      this.password = CryptoJS.AES.encrypt(this.password, "7192").toString();
      next();
    } catch (error) {
      next(error);
    }
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
