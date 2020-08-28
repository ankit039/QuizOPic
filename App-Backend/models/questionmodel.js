const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var questionSchema = new Schema(
  {
    score: {
      type: Number,
      required: true,
      unique: true
    },
    image: {
      type: String,
      required: true,
      unique: true
    },
    answer: {
      type: String,
      required: true,
      unique: true,
    }
  },
  {
    timestamps: true,
  }
);

var Question = mongoose.model("question", questionSchema);

module.exports = Question;