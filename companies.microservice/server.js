var app = require('./src/app')
  , mongoose = require('mongoose')
  , config = require('./src/config')


mongoose.connect(config.mongo.uri, config.mongo.options, function (err) {

  if (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('connected to database...')
  app.listen(config.port, function () {
    console.log('listening on port %d', config.port)
  })
})
