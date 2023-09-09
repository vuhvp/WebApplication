const mongoose = require("mongoose");

const profile = new mongoose.Schema({
  fullName: { type: String },
  userName: { type: String },
  location: { type: String },
  joinedDate: { type: Date },
});

module.exports = mongoose.model("Profile", profile);
