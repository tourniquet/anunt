const fs = require('fs')
const request = require('request')

const date = new Date()
const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
const todayDate = date.getDate().toString() + '.' + month[date.getMonth()].toString() + '.' + date.getFullYear()

const getUrl = 'http://bnm.md/md/official_exchange_rates?get_xml=1&date=' + todayDate

request(getUrl, (err, res, body) => {
  if (!err && res.statusCode === 200) {
    fs.writeFile('public/bnm.xml', body, (err, data) => {
      if (err) throw err
    })
  }
})
