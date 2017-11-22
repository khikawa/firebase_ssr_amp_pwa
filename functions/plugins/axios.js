import * as axios from 'axios'

const options = {}
// The server-side needs a full url to works
if (process.server) {
  if (!process.env.FUNCTION_NAME) {
    options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
  } else {
    options.baseURL = `http://localhost:8010/ampwa-186605/us-central1/cloudFunctionApp`
  }
}




export default axios.create(options)
