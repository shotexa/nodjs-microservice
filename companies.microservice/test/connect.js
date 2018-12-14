var mongoose = require('mongoose')
  , config = require('../src/config')

before(function (done) {

  // Connect to mongodb
  mongoose.connect(config.mongo.uri, {
    dbName: 'testbusiness',
    useFindAndModify: false
  })
  mongoose.connection.once('open', function () {

    mongoose.connection.collections.companies.drop(function () {
      done()
    })

  }).on('error', function (error) {
    console.log('Connection error:', error)
  })

})

