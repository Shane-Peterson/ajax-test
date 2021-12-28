let http = require('http')
let fs = require('fs')
let url = require('url')
let port = process.argv[2]
let n = 0

if (!port) {
  console.log('缺少端口，\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

let server = http.createServer(function (request, response) {
  let parsedUrl = url.parse(request.url, true)
  let pathWithQuery = request.url
  let queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  let path = parsedUrl.pathname
  let query = parsedUrl.query
  let method = request.method

  console.log('正在访问：' + pathWithQuery)
  if (path === '/index.html' || path === '/') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    let string = fs.readFileSync('public/index.html').toString()
    const page1 = fs.readFileSync('db/page1.json')
    const array = JSON.parse(page1)
    const result = array.map(item => `<li>${item.id}</li>`).join('')
    string = string.replace('{{ page1 }}', `<ul id="xxx">${result}</ul>`)
    response.write(string)
    n = 1
    response.end()
  } else if (path === '/style.css') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(fs.readFileSync('public/style.css'))
    response.end()
  } else if (path === '/main.js') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.write(fs.readFileSync('public/main.js'))
    response.end()
  } else if (path === '/2.js') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.write(fs.readFileSync('public/2.js'))
    response.end()
  } else if (path === '/3.html') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write(fs.readFileSync('public/3.html'))
    response.end()
  } else if (path === '/4.xml') {
    response.tatusCode = 200
    response.setHeader('Content-Type', 'text/xml; charset=utf-8')
    response.write(fs.readFileSync('public/4.xml'))
    response.end()
  } else if (path === '/5.json') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json; charset=utf-8')
    response.write(fs.readFileSync('public/5.json'))
    response.end()
  } else if (path === '/next') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json; charset=utf-8')
    try {
      response.write(fs.readFileSync(`db/page${n + 1}.json`))
      n++
    } catch (error) {
    }
    response.end()
  } else if (path === '/pre') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json; charset=utf-8')
    try {
      response.write(fs.readFileSync(`db/page${n}.json`))
      n--
    } catch (error) {
    }
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`您访问的页面不存在。`)
    response.end()
  }

})

server.listen(port)
console.log('监听 ' + port + ' 端口成功\n合上眼睛，命中注定的一切，此刻，我们心满意足地接受 http://localhost:' + port)


