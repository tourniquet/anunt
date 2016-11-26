const path = require('path')
// formidable - module to parse forms and files
const formidable = require('formidable')
// graphicmagick - module to do some work like, resize image, watermark or other stuff
const gm = require('gm')
// url - nodejs standart library to parse urls
const url = require('url')

// moment.js
const moment = require('moment')
moment.locale('ro')

const mongose = require('mongoose')
const Ad = mongose.model('Ad')

const limitPerPage = 30

// routes
module.exports = {
  index (req, res) {
    const pageNumber = req.params.number
    let query

    if (pageNumber) {
      query = Ad.find().skip((pageNumber - 1) * limitPerPage).sort('-dateForSort').limit(limitPerPage)
    } else {
      query = Ad.find().sort('-dateForSort').limit(limitPerPage)
    }

    query.exec((err, ad) => {
      if (err) console.log(err)

      res.render('index.jade', { ads: ad })
    })
  },

  newad (req, res) {
    res.render('newad.jade')
  },

  adposted (req, res) {
    const form = new formidable.IncomingForm()
    form.uploadDir = path.join(__dirname + '/public/uploads/')
    form.keepExtensions = true
    form.maxFieldsSize = 10 * 1024 * 1024

    // parsing form data
    form.parse(req, (err, fields, files) => {
      if (err) console.log(err)

      const images = [files['form-first-image'], files['form-second-image'], files['form-third-image']]

      let rawImagesPath = []

      images.forEach((el) => {
        if (el.size) rawImagesPath.push(el.path)
      })

      // create url slicing current time, if new Date().getTime() = 1422787351345 than url = 87351345
      const url = new Date().getTime().toString().slice(5)

      const adTitle = fields['form-ad-title']
      const adDescription = fields['form-ad-description']
      const category = fields['form-ad-category']
      const subCategory = fields['form-ad-subcategory']
      const contactName = fields['form-ad-contactname']
      const phone = fields['form-ad-phone']

      // concatenate price and currency in one variable, e. g. 4500 $
      const rawPrice = fields['form-ad-price']
      const rawCurrency = fields['form-ad-currency']
      const price = (rawPrice) ? rawPrice + ' ' + rawCurrency : ''

      var date = moment().format('D MMMM YYYY')

      // new images path array
      let newImagesPath = []

      // process file path
      var clearImagePath = function (image) {
        var oldFilePath = image
        var index = oldFilePath.lastIndexOf('/') + 1
        var tempFilePath = oldFilePath.substr(index)

        newImagesPath.push(tempFilePath)
      }

      for (var z = 0; z < rawImagesPath.length; z++) {
        clearImagePath(rawImagesPath[z])
      }

      // keywords for search
      var allFields = [adTitle, adDescription, phone]
      var rawKeywords = []

      for (var i = 0; i < allFields.length; i++) {
        if (allFields[i].length) {
          rawKeywords.push(allFields[i].toLowerCase())
        }
      }

      var keywords = rawKeywords.join(', ')

      var newAd = new Ad({
        // dateForSort - get this var for sort by date
        dateForSort: new Date(),
        url: url,
        category: category,
        subCategory: subCategory,
        adTitle: adTitle,
        adDescription: adDescription,
        contactName: contactName,
        phone: phone,
        price: price,
        date: date,
        imagesPath: [
          newImagesPath[0],
          newImagesPath[1],
          newImagesPath[2]
        ],
        keywords: keywords,
        views: 0
      })

      newAd.save(function (err) {
        if (err) console.log(err)

        console.log('data saved to db')
      })

      // resize image
      var xy = 0

      var resizeImage = function () {
        var thisImage = rawImagesPath[xy]

        gm(thisImage)
          .size(function (err, size) {
            if (err) console.log(err)

            if (!size) {
              xy = 2
            } else if (size.width > size.height && size.width > 1024) {
              gm(thisImage)
                .resize(1024, null)
                .write(thisImage, function (err) {
                  if (err) console.log(err)
                })
            } else if (size.width < size.height && size.height > 800) {
              gm(thisImage)
                .resize(null, 800)
                .write(thisImage, function (err) {
                  if (err) console.log(err)
                })
            } else if (size.width === size.height && size.height > 800) {
              gm(thisImage)
                .resize(null, 800)
                .write(thisImage, function (err) {
                  if (err) console.log(err)
                })
            }

            if (xy === 2) {
              clearInterval(yz)
            } else {
              xy++
            }
          })
      }

      var yz = setInterval(resizeImage, 1000)

      // create thumbnails
      var xt = 0

      var createThumbnail = function () {
        var thisImage = rawImagesPath[xt]
        var newPath = newImagesPath[xt]

        gm(thisImage)
          .size(function (err, size) {
            if (!err) {
              if (!size) {
                xt = 2
              } else {
                gm(thisImage).thumb(200, 200, 'public/uploads/thumb_' + newPath, 100, function (err) {
                  if (err) throw err
                })
                  // else if (size.width < size.height)
                  //  gm(thisImage).thumb(120, 160, 'public/uploads/thumb_' + newPath, 100, function (err) { if (err) throw err });
                  // else  if (size.width === size.height)
                  //  gm(thisImage).thumb(160, 160, 'public/uploads/thumb_' + newPath, 100, function(err) { if (err) throw err });
              } // if (size.width > size.height)
            }

            if (xt === 2) {
              clearInterval(mp)
            } else {
              xt++
            }
          })
      }

      var mp = setInterval(createThumbnail, 2000)

      res.render('adposted.jade', {
        url: url,
        adTitle: newAd.adTitle,
        id: newAd._id
      })
    })
  },

  showad (req, res) {
    const reqUrl = url.parse(req.url, true, true).path.toString().slice(1)

    // increase model.views by one
    Ad.findOneAndUpdate(
      { 'url': reqUrl },
      { $inc: { views: 1 } }, (err) => {
        if (err) console.log(err)
      }
    )

    Ad.findOne({ 'url': reqUrl },
      // 'adTitle adDescription phone price date category imagesPath subCategory views', // or you can change this to 'null', which will be returning all fileds
      null,
      function (err, ad) {
        if (err) console.log(err)
        if (!ad) res.render('404.jade')
        res.render('showad.jade', { ad: ad })
      }
    )
  },

  category (req, res) {
    const category = req.params.category
    const pageNumber = req.params.pageNumber

    var query = Ad.where({ category: category }).skip((pageNumber - 1) * limitPerPage).sort('-dateForSort').limit(limitPerPage)

    query.find((err, ad) => {
      if (err) console.log(err)
      res.render('category.jade', { ads: ad })
    })
  },

  subcategory (req, res) {
    const category = req.params.category
    const subCategory = req.params.subCategory || ''
    const pageNumber = req.params.pageNumber

    const query = Ad.where({ category: category, subCategory: subCategory }).skip((pageNumber - 1) * limitPerPage).sort('-dateForSort').limit(limitPerPage)

    query.find(function (err, ad) {
      if (err) console.log(err)
      res.render('subcategory.jade', { ads: ad })
    })
  },

  searchResults (req, res) {
    const pageNumber = req.params.number
    const form = new formidable.IncomingForm()

    form.parse(req, (err, field) => {
      if (err) console.log(err)

      const rawRequest = field.search
      const keyword = rawRequest.toLowerCase().trim().replace(/\W+\D+/gim, '')
      let query

      if (pageNumber && keyword) {
        query = Ad.find({ keywords: { $regex: keyword } }).skip((pageNumber - 1) * limitPerPage).sort('-dateForSort').limit(limitPerPage)
      } else if (keyword) {
        query = Ad.find({ keywords: { $regex: keyword } }).sort('-dateForSort').limit(limitPerPage)
      }

      query.exec((err, ad) => {
        if (err) console.log(err)
        res.render('index.jade', { ads: ad })
      })
    })
  }
}
