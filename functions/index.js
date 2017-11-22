const functions = require('firebase-functions')

exports.app = functions.https.onRequest((req, res) => {
  res.status(200).send('OK')
})
