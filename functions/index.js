const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const https = require("https");

const app = express();
app.use(cors({ origin: true }));

const LINK = "https://api.nasa.gov/planetary/apod?api_key=";
const API_KEY = "DEMO_KEY";

app.get("/", (req, res) => {
  https
    .get(`${LINK}${API_KEY}`, (response) => {
      let data = "";

      // A chunk of data has been recieved.
      response.on("data", (chunk) => {
        data += chunk;
      });

      // Full response has been received.
      response.on("end", () => {
        res.send(data);
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
      res.status(500).send(err);
    });
});

exports.nasaapi = functions.https.onRequest(app);
