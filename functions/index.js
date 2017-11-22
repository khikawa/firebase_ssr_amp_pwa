const Main = require('./build/main.js')
const functions = require('firebase-functions');
process.on('unhandledRejection', console.dir);

exports.cloudFunctionA = Main.cloudFunctionA
exports.cloudFunctionApp = Main.cloudFunctionApp