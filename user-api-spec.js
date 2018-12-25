require('co-mocha');
var data = require('./users-data')
var should = require('should')
var fs = require('co-fs')
var api = require('./user-web')
var request = require('co-supertest').agent(api.listen())

before(function *() {
	yield fs.writeFile('./users.json', '[]')
})

describe('user data', function(){
	it('should have +1 user count after saving', function* () {
		var users = yield data.users.get()
		yield data.users.save({name: 'Diego'})
		var newUsers = yield data.users.get()

		newUsers.length.should.equals(users.length + 1)
	})
})

describe('user web', function() {
	it('should have +1 user count after saving', function* () {
		var res = yield request.get('/users').expect(200).end()
		var users = res.body

		yield data.users.save({name: 'Paty'})
		var newRes = yield request.get('/users').expect(200).end()
		var newUsers = newRes.body

		newUsers.length.should.equals(users.length + 1)

	})
})
