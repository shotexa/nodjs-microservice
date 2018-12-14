var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid Email'] // https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax#answer-18022766
  },
  role: {
    type: String,
    trim: true,
    required: true,
    default: 'basic'
  }
})

var WorkspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  displayName: {
    type: String,
    required: true,
    default: ''
  },
  users: [userSchema]
})

var CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true,
    default: ''
  },
  workspaces: [WorkspaceSchema]
})

module.exports = mongoose.model('Company', CompanySchema, 'companies')
