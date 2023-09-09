const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getProfile, createProfile } = require("./features/profile.features");
const { getAllTweets, addTweet, deleteTweet } = require("./features/tweet.features");
const Tweet = require("./models/tweet");
const app = express();

/* ----------------------------------------- */
/*                CONFIGS                    */
/* ----------------------------------------- */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

mongoose
  .connect("mongodb+srv://vuhvp:SCMhyJhGRWGI4zE8@assignment2.5dr68.mongodb.net/JustTweet")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

/* ----------------------------------------- */
/*                ROUTES                     */
/* ----------------------------------------- */

app.get("/", async (req, res) => {
  const profile = await createProfile();
  res.send({ profile });
});

app.get("/profile", async (req, res) => {
  const profile = await getProfile();
  res.send({ profile });
});

app.get("/tweets", async (req, res) => {
  const tweets = await getAllTweets();
  res.send({ tweets });
});

app.post("/tweets", async (req, res) => {
  const data = req.body;
  console.log(req.body, "body");
  const result = await addTweet(data);
  res.send(result);
});

app.delete("/tweets/:tweetId", async (req, res) => {
  const id = req.params.tweetId;
  const result = await deleteTweet(id);
  res.send(result);
});

app.listen(3100, () => console.log("Listening on port 3100"));
