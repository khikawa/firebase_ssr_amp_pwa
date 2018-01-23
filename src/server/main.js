import logging from '../plugins/logging'
import express from 'express'
import api from './api'
import { Nuxt, Builder } from 'nuxt'
import * as functions from 'firebase-functions'
import * as config from '../nuxt.config.js'
const app = express()

// Init Nuxt.js
config.dev = !(process.env.NODE_ENV === 'production')
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Add the request logger before anything else so that it can accurately log requests.
app.use(logging.requestLogger)

// Import API Routes
app.use('/api', api)
// Import Nuxt Routes
app.use(nuxt.render)

// Add the error logger after all middleware and routes so that it can log errors from the whole application. Any custom error handlers should go after this.
app.use(logging.errorLogger)

// Express Listend
if (process.env.HOST && process.env.PORT) {
  // On BackPack, Node
  const host = process.env.HOST
  const port = process.env.PORT
  app.set('port', port)
  app.listen(port, host)
}

// On Firebase Functions
export const firebaseApp = functions.https.onRequest(app)
