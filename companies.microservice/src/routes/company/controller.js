var companyService = require('../../services/company')
  , utils = require('../../utils')


var _create = function (req, res) {
  var name = req.body.name
  companyService.create(name, function (err, data) {
    utils.send(res, err, data)
  })

}

var _update = function (req, res) {
  var id = req.body._id
    , name = req.body.name

  companyService.update(id, name, function (err, data) {
    var code = !err && !data ? 404 : null
    utils.send(res, err, data, code)
  })
}

var _createWorkspace = function (req, res) {
  var companyId = req.params.companyId
    , name = req.body.name

  companyService.createWorkspace(companyId, name, function (err, data) {
    utils.send(res, err, data)
  })
}

var _updateWorkspace = function (req, res) {
  var companyId = req.params.companyId
    , workspaceId = req.params.workspaceId
    , name = req.body.name

  companyService.updateWorkspace(companyId, workspaceId, name, function (err, data) {
    var code = !err && !data ? 404 : null
    utils.send(res, err, data, code)
  })
}

var _addUser = function (req, res) {
  var companyId = req.params.companyId
    , workspaceId = req.params.workspaceId

  companyService.addUser(companyId, workspaceId, req.body, function (err, data) {
    var code = !err && !data ? 404 : null
    utils.send(res, err, data, code)
  })

}

var _removeUser = function (req, res) {
  var companyId = req.params.companyId
    , workspaceId = req.params.workspaceId
    , email = req.params.email

  companyService.removeUser(companyId, workspaceId, email, function (err, data) {
    var code = !err && !data ? 404 : null
    utils.send(res, err, data, code)
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
