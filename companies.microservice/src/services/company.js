var Company = require('../models/company')


var _create = function (name, cb) {
  Company.create({
    displayName: name,
    name: (name || '').replace(/\s+/g, '').toLowerCase(),
    workspaces: []
  }, cb)
}

var _update = function (id, newName, cb) {
  Company.findByIdAndUpdate(id, {
    displayName: newName,
    name: (newName || '').replace(/\s+/g, '').toLowerCase()
  }, {
      new: true,
      upsert: false
    }, cb)
}

var _createWorkspace = function (companyId, dName, cb) {
  var displayName = dName
    , name = (dName || '').replace(/\s+/g, '').toLowerCase()

  Company.findById(companyId, function (err, data) {
    if (err) {
      cb(err, null)
      return
    }
    if ((data.workspaces || []).find(function (x) { return x.name === name })) {
      cb({
        error: 'workspace with name "' + displayName + '" exists in company "' + data.displayName + '"'
      }, null)
      return
    }
    data.workspaces.push({
      displayName: displayName,
      name: name,
      users: []
    })
    data.save(cb)
  })
}

var _updateWorkspace = function (companyId, workspaceId, newName, cb) {
  Company.findById(companyId, function (err, data) {
    if (err) {
      cb(err, null)
      return
    }
    var workspace = data.workspaces.find(function (x) { return String(x._id) === String(workspaceId) })

    if (!workspace) {
      cb(null, null)
      return
    }
    workspace.name = newName.replace(/\s+/g, '').toLowerCase()
    workspace.displayName = newName
    data.save(cb)
  })
}

var _addUser = function (companyId, workspaceId, userData, cb) {

  Company.findById(companyId, function (err, data) {
    if (err) {
      cb(err, null)
      return
    }
    var workspace = data.workspaces.find(function (x) { return String(x._id) === String(workspaceId) })
    if (!workspace) {
      cb(null, null)
      return

    }
    if (workspace.users.find(function (u) { return u.email === userData.email })) {
      cb({
        error: 'user with email "' + userData.email + '" exists in workspace "' + workspace.displayName + '"'
      }, null)
      return
    }
    userData.role = ['basic', 'admin'].indexOf(userData.role) !== -1 ? userData.role : 'basic'
    workspace.users.push(userData)
    data.save(cb)
  })

}

var _removeUser = function (companyId, workspaceId, email, cb) {
  Company.findById(companyId, function (err, data) {
    if (err) {
      cb(err, null)
      return
    }
    var workspace = data.workspaces.find(function (x) { return String(x._id) === workspaceId })
    if (!workspace) {
      cb(null, null)
      return

    }
    workspace.users = workspace.users.filter(function (u) { return u.email !== email })
    data.save(cb)
  })

}


module.exports = {
  create: _create,
  update: _update,
  createWorkspace: _createWorkspace,
  updateWorkspace: _updateWorkspace,
  addUser: _addUser,
  removeUser: _removeUser
}
