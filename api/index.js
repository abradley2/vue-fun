const express = require('express')
const api = express.Router()

api.get('/message', function (req, res) {
  return res.json({message: 'hello world!'})
})

module.exports = api
