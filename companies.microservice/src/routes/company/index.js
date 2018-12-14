var express = require('express')
  , controller = require('./controller')

var router = express.Router()

router.put('/create', controller.create) // Create company
router.post('/update', controller.update) // Update company
router.put('/workspace/create/:companyId', controller.createWorkspace) // Create workspace withing specific company
router.post('/workspace/update/:companyId/:workspaceId', controller.updateWorkspace) // Update workspace withing specific company
router.put('/workspace/user/add/:companyId/:workspaceId', controller.addUser) // Associate a user to a specific workspace
router.delete('/workspace/user/remove/:companyId/:workspaceId/:email', controller.removeUser) // Remove a user from a specific workspace

module.exports = router
