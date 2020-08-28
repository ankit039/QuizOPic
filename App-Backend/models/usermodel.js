const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },
    enrno: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    curscore: {
        type: Number,
        default: 0,
    },
    admin: {
      type: Boolean,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

var User = mongoose.model("registered_user", userSchema);

module.exports = User;