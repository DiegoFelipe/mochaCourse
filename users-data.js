var fs = require('co-fs')
var userFile = 'users.json'

module.exports = {
	users: {
		get: function *() {
			var data = yield fs.readFile(userFile, 'utf-8')
			return JSON.parse(data)
		},
		save: function *(name) {
			var users = yield this.get()

			users.push(name)

			yield fs.writeFile(userFile, JSON.stringify(users))
		}
	}
}
