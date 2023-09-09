const Tweet = require("../models/tweet");
const Profile = require("../models/profile");

async function getAllTweets() {
  const tweets = await Tweet.find({}).sort({ _id: -1 }).exec();
  return tweets;
}

async function addTweet(data) {
  const tweet = new Tweet(data);
  const result = await tweet.save();
  if (result != null) {
    Profile.findOneAndUpdate({}, { $inc: { "stats.tweetCount": 1 } });
  }
  return result;
}

async function deleteTweet(id) {
  const result = await Tweet.deleteOne({ _id: id });
  return result;
}

module.exports = { getAllTweets, addTweet, deleteTweet };
