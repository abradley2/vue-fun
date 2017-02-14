const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(
  path.join(__dirname, './public')
))

app.get(/^\/view.+$/, serveIndex)

let indexPage

function serveIndex (req, res) {
  if (indexPage) return res.send(indexPage)
  fs.readFile(
    path.join(__dirname, './public/index.html'),
    'utf8',
    function (err, data) {
      if (err) throw err
      res.send(data)
    }
  )
}

app.listen(3000)
