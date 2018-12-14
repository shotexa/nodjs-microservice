var express = require('express')
  , bodyParser = require('body-parser')
  , mainRouter = require('./routes/')


var app = express()
// Attach middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Init routes
app.use('/api/v1', mainRouter)

// 404 Router
app.use('*', function (req, res) {
  res.sendStatus(404)
})

module.exports = app
