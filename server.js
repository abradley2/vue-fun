const http = require('http')
const path = require('path')
const express = require('express')
const cors = require('corsify')
const app = express()

app.use(express.static(
  path.join(__dirname, './public')
))

app.use(require('./api'))

const server = http.createServer(function (req, res) {
  if (process.env.NODE_ENV === 'development') return cors(app)(req, res)
  return app(req, res)
})

server.listen(3000, function () {
  console.log('server listening on port 3000')
})
