const mongoose = require("mongoose");

const tweet = new mongoose.Schema({
  fullName: { type: String },
  userName: { type: String },
  date: { type: Date, default: new Date() },
  tweetDesc: { type: String },
});

module.exports = mongoose.model("Tweet", tweet);
