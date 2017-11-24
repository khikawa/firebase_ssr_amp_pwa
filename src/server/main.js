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

// Import API Routes
app.use('/api', api)
// Import Nuxt Routes
app.use(async (req, res) => nuxt.render(req, res))

// Express Listend
if (!process.env.FUNCTION_NAME) {
  // On BackPack, Node
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3000
  app.set('port', port)
  app.listen(port, host)
}

// On Firebase Functions
export const firebaseApp = functions.https.onRequest(app)
