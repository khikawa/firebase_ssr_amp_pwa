const functions = require('firebase-functions');

exports.httpFunction = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
