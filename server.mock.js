// express开启文件服务

/* server.js */

const Express = require('express')

let port = process.argv[2] || 80
const app = Express()


app.use(Express.static(__dirname))  // 将页面放在 本地服务器上 开发

app.listen(port, function() {
	console.log('服务器已启动 ' + port)
})

/* server.js */

