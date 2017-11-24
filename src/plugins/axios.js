import * as axios from 'axios'

const options = {}
// The server-side needs a full url to works
if (process.server) {
  if (process.env.FUNCTION_NAME) {
    options.baseURL = `http://localhost:3000/ampwa-186605/us-central1/cloudFunctionApp`
  } else {
    options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
  }
}

export default axios.create(options)
