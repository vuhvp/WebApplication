const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

let flights = [];
let id;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/flights", (req, res) => {
  // Obtained from Harshana Serasinghe, https://stackoverflow.com/a/64655696
  // Purpose: to read json file
  const content = fs.readFileSync("data.json");
  const data = JSON.parse(content);
  flights = data;
  id = flights.length;
  console.log("Fetched all flights from database");
  res.send(flights);
});

app.post("/flights", async (req, res) => {
  const data = req.body;
  id = id + 1;
  data["id"] = id;
  data["status"] = "Scheduled";
  flights.push(data);
  console.log("Flight has been added to database");
  res.send(flights);
});

app.put("/flights/:flightId", async (req, res) => {
  const id = req.params.flightId;
  const newData = flights.map((d) => {
    if (d.id === Number(id)) {
      const departureTime = new Date(d.departureTime);
      departureTime.setMinutes(departureTime.getMinutes() + 10);
      d.departureTime = departureTime;
    }
    return d;
  });
  flights = newData;
  console.log("Flight has been updated to database");
  res.send(newData);
});

app.delete("/flights/:flightId", async (req, res) => {
  const id = req.params.flightId;
  const newData = flights.filter((d) => d.id !== Number(id));
  flights = newData;
  console.log("Flight has been deleted to database");
  res.send(newData);
});

app.listen(3100, () => console.log("Listening on port 3100"));
