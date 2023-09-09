const Profile = require("../models/profile");

async function getProfile() {
  const tweets = await Profile.findOne({});
  return tweets;
}

async function createProfile() {
  const profile = await Profile.findOne({});
  if (profile == null) {
    const newProfile = new Profile({
      fullName: "Van Phi Vu Huynh",
      userName: "vuhvp",
      location: "HCM - Vietnam",
      joinedDate: new Date(),
    });
    const result = await newProfile.save();
    return result;
  }
  return "Profile already exists";
}

module.exports = { getProfile, createProfile };
