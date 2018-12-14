module.exports = {
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/business',
    options: {
      useFindAndModify: false
    }
  },
  port: 8080
}
