var koa = require('koa')
var router = require('koa-router')()
var data = require('./users-data')

var app = module.exports = new koa();

router.get('/users', function* () {
	this.body = yield data.users.get()
})

app.use(router.routes())
app.listen(3000)
