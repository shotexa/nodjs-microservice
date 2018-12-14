var assert = require('assert')
  , companyService = require('../src/services/company')
  , Company = require('../src/models/company')


describe('Maintaining company state', function () {

  it('should crate new company with correct name', function (done) {
    companyService.create('Test Company', function (err, doc) {
      assert.equal(err, null)
      assert.equal(doc.name, 'testcompany')
      assert.equal(doc.displayName, 'Test Company')
      done()
    })
  })

  it('should not create 2 companies with same names', function (done) {
    companyService.create('Test Company', function (err, doc) {
      assert.notEqual(err, null)
      done()
    })
  })

  it('should update company with correct name', function (done) {
    Company.findOne({ name: 'testcompany' }, function (err, doc) {
      assert.equal(err, null)
      companyService.update(doc._id, 'Test Company New Name', function (err, doc) {
        assert.equal(err, null)
        assert.equal(doc.name, 'testcompanynewname')
        assert.equal(doc.displayName, 'Test Company New Name')
        done()
      })
    })

  })

  it('should create workspace with correct name', function (done) {

    Company.findOne({ name: 'testcompanynewname' }, function (err, doc) {
      assert.equal(err, null)
      companyService.createWorkspace(doc._id, 'New Workspace', function (err, doc) {
        assert.equal(err, null)
        assert.equal(doc.workspaces[0].name, 'newworkspace')
        assert.equal(doc.workspaces[0].displayName, 'New Workspace')
        done()
      })
    })

  })

  it('should not create 2 workspaces with same name', function (done) {
    Company.findOne({ name: 'testcompanynewname' }, function (err, doc) {
      assert.equal(err, null)
      companyService.createWorkspace(doc._id, 'New Workspace', function (err, doc) {
        assert.notEqual(err, null)
        done()
      })
    })
  })

  it('should update workspace with correct name', function (done) {
    Company.findOne({ name: 'testcompanynewname' }, function (err, doc) {
      assert.equal(err, null)
      var workspace = doc.workspaces[0]
      companyService.updateWorkspace(doc._id, workspace._id, 'New Workspace Name', function (err, doc) {
        assert.equal(err, null)
        assert.equal(doc.workspaces[0].name, 'newworkspacename')
        assert.equal(doc.workspaces[0].displayName, 'New Workspace Name')

        done()
      })
    })
  })

  it('should add user into workspace', function (done) {

    Company.findOne({ name: 'testcompanynewname' }, function (err, doc) {
      assert.equal(err, null)
      var workspace = doc.workspaces[0]

      companyService.addUser(doc._id, workspace._id, {
        email: 'test@mail.com',
        role: 'basic'
      }, function (err, doc) {
        assert.equal(err, null)
        assert(doc.workspaces[0].users[0].email === 'test@mail.com')
        done()
      })
    })

  })

  it('should not add 2 users with same email', function () {
    Company.findOne({ name: 'testcompanynewname' }, function (err, doc) {
      assert.equal(err, null)
      var workspace = doc.workspaces[0]

      companyService.addUser(doc._id, workspace._id, {
        email: 'test@mail.com',
        role: 'basic'
      }, function (err, doc) {
        assert.notEqual(err, null)
        assert(doc.workspaces[0].users.length === 1)
        done()
      })
    })
  })

  it('should remove user from workspace', function () {
    Company.findOne({ name: 'testcompanynewname' }, function (err, doc) {
      assert.equal(err, null)
      var workspace = doc.workspaces[0]

      companyService.removeUser(doc._id, workspace._id, function (err, doc) {
        assert.equal(err, null)
        assert.equal(doc.workspace[0].users.length, 0)
      })
    })
  })

})
