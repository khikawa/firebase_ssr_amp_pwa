// Logging in production
if (process.env.NODE_ENV === 'production') {
  require('@google-cloud/trace-agent').start()
  require('@google-cloud/debug-agent').start()
}

const winston = require('winston')
const expressWinston = require('express-winston')
const StackdriverTransport = require('@google-cloud/logging-winston')

const colorize = process.env.NODE_ENV !== 'production'

// Logger to capture all requests and output them to the console.
// [START requests]
const requestLogger = expressWinston.logger({
  transports: [
    new StackdriverTransport(),
    new winston.transports.Console({
      json: false,
      colorize: colorize
    })
  ],
  expressFormat: true,
  meta: false
})
// [END requests]

// Logger to capture any top-level errors and output json diagnostic info.
// [START errors]
const errorLogger = expressWinston.errorLogger({
  transports: [
    new StackdriverTransport(),
    new winston.transports.Console({
      json: true,
      colorize: colorize
    })
  ]
})
// [END errors]

module.exports = {
  requestLogger: requestLogger,
  errorLogger: errorLogger,
  error: winston.error,
  warn: winston.warn,
  info: winston.info,
  log: winston.log,
  verbose: winston.verbose,
  debug: winston.debug,
  silly: winston.silly
}
