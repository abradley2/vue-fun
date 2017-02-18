const http = require('http')
const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(
  path.join(__dirname, './public')
))

const server = http.createServer(function (req, res) {
  app(req, res)
})

server.listen(3000, function () {
  console.log('server listening on port 3000')
})
