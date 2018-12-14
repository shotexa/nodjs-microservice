var express = require('express')
  , companyRouter = require('./company')


var router = express.Router()
router.use('/company/', companyRouter)

module.exports = router
