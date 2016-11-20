var fs = require('fs')
var request = require('request')

var date = new Date()
var month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
var todayDate = date.getDate().toString() + '.' + month[date.getMonth()].toString() + '.' + date.getFullYear()

var getUrl = 'http://bnm.md/md/official_exchange_rates?get_xml=1&date=' + todayDate

request(getUrl, function (err, res, body) {
  if (!err && res.statusCode === 200) {
    fs.writeFile('public/bnm.xml', body, function (err, data) {
      if (err) throw err
    })
  }
})
