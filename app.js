var http = require('http')
// var db = require('./db')
var page = require('./routes')
var express = require('express')
var app = express()

app.use(express.static('./public'))
app.locals.pretty = true

app.set('view engine', 'jade')

// data for admin page
// app.get('/data', page.data);

// show ad page
app.get(/\d{8}$/, page.showad)

// search results
app.post('/results', page.searchResults)

// post new ad
app.get('/newad', page.newad)
app.post('/adposted', page.adposted)

// category && subcategory
app.get('/category/:category/:pageNumber?', page.category)
app.get('/:category/:subCategory/:pageNumber?', page.subcategory)

// index page
app.get('/:number?', page.index)

// 404 error page
app.use((req, res) => {
  res.status(404)
  res.render('404.jade')
})

http.createServer(app).listen(3000, () => {
  console.log('App started')
})
