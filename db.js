// database connection
const mongoose = require('mongoose')

const dbURI = 'mongodb://localhost:27017/mongoose'
mongoose.connect(dbURI)

// new ad model schema
const adSchema = new mongoose.Schema({
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

const Ad = mongoose.model('Ad', adSchema)
