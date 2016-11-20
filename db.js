// database connection
var mongoose = require('mongoose')

var dbURI = 'mongodb://localhost:27017/mongoose'
mongoose.connect(dbURI)

// new ad model schema
var adSchema = new mongoose.Schema({
  dateForSort: Date,
  url: String,
  category: String,
  subCategory: String,
  adTitle: String,
  adDescription: String,
  contactName: String,
  phone: String,
  price: String,
  date: String,
  imagesPath: Array,
  keywords: String,
  views: Number
})

var Ad = mongoose.model('Ad', adSchema)
