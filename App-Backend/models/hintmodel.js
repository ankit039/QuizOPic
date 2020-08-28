const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var hintSchema = new Schema(
  {
    question: {
      type: Number,
      required: true,
      unique: true
    },
    hint: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true,
  }
);

var Hint = mongoose.model("hint", hintSchema);

module.exports = Hint;