const functions = require('firebase-functions');
const app = require('express')();


exports.httpFunction = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
