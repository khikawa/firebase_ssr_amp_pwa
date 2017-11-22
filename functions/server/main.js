import express from 'express'
import { Nuxt, Builder } from 'nuxt'

import api from './api'

const functions = require('firebase-functions');
const app = express()

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

function handleRequest (req, res) {
  return new Promise((resolve, reject) => {
    nuxt.render(req, res, promise => {
      promise.then(resolve).catch(reject)
    })
  })
}

app.use(handleRequest)

if (!process.env.FUNCTION_NAME) {
  //On BackPack, Node
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3000
  app.set('port', port)
  app.listen(port, host)
  console.log('LOG : Server listening on ' + host + ':' + port)
}

//On Firebase Functions
export const cloudFunctionA = functions.https.onRequest((req, res) => {
  res.status(200).send(JSON.stringify(!process.env.FUNCTION_NAME));
});
export const cloudFunctionApp = functions.https.onRequest(app)
