const functions = require("firebase-functions");

exports.nasaapi = functions.https.onRequest((request, response) => {
  response.send("Hello from the Backend!");
});
