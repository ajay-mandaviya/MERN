const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv = require("uuid/v1");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      maxlength: 32,
      trim: true
    },
    lastname: {
      type: String,
      require: true,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true
    },
    encry_password: {
      type: String,
      require: true,
      trim: true
    },
    salt: String,
    role: {
      type: Number,
      default: 0
    },
    purchases: {
      type: Array,
      dafault: [],
    },
  },
  { timestamp: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  autheticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      // return crypto.createHmac("ajay01", this.salt).update(plainpassword).digest("hex");
      return crypto.createHmac("sha256", this.salt).update(plainpassword).digest('hex');
    } catch (error) {
      console.log(error);
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);



// "name" : "test",
// "lastname" : "tester",
// "email" : "test@gmail.com",
// "password" : "test@123"