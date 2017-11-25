import * as axios from 'axios'

const options = {}
// The server-side needs a full url to works
if (process.server) {
  if (process.env.FUNCTION_NAME && process.env.NODE_ENV === 'production') {
    options.baseURL = `https://.com`
  } else {
    options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 5000}`
  }
}

export default axios.create(options)
