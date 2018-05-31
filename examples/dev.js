// This file is only required if you use npm for dev purposes. Check dev script in ../package.json for more details
var serveIndex = require('serve-index')

require('budo').cli(process.argv.slice(2), {
  middleware: serveIndex(__dirname)
})
