var path = require('path')
// formidable - module to parse forms and files
var formidable = require('formidable')
// graphicmagick - module to do some work like, resize image, watermark or other stuff
var gm = require('gm')
// async library
// var async = require('async');
// url - nodejs standart library to parse urls
var url = require('url')

// moment.js
var moment = require('moment')
moment.locale('ro')

var mongose = require('mongoose')
var Ad = mongose.model('Ad')

// routes
module.exports = {
  data: function (req, res) {
    var query = Ad.find().limit(10)

    query.exec(function (err, ads) {
      if (err) console.log(err)

      res.json(ads)
    })
  },

  index: function (req, res) {
    var pageNumber = req.params.number
    var limitPerPage = 30

    var query

    if (pageNumber) {
      query = Ad.find().skip((pageNumber - 1) * limitPerPage).sort('-dateForSort').limit(limitPerPage)

      query.exec(function (err, ad) {
        if (err) console.log(err)

        res.render('index.jade', {
          ads: ad
        })
      })
    } else {
      query = Ad.find().sort('-dateForSort').limit(limitPerPage)

      query.exec(function (err, ad) {
        if (err) console.log(err)

        res.render('index.jade', {
          ads: ad
        })
      })
    }
  },

  newad: function (req, res) {
    res.render('newad.jade')
  },

  adposted: function (req, res) {
    var form = new formidable.IncomingForm()
    form.uploadDir = path.join(__dirname + '/public/uploads/')
    form.keepExtensions = true
    form.maxFieldsSize = 10 * 1024 * 1024

    // parsing form data
    form.parse(req, function (err, fields, files) {
      if (err) console.log(err)

      var images = [files['form-first-image'], files['form-second-image'], files['form-third-image']]

      var rawImagesPath = []

      for (var c = 0; c < images.length; c++) {
        if (images[c].size) rawImagesPath.push(images[c].path)
      }

      // create url slicing current time, if new Date().getTime() = 1422787351345 than url = 87351345
      var url = new Date().getTime().toString().slice(5)

      var adTitle = fields['form-ad-title']
      var adDescription = fields['form-ad-description']
      var category = fields['form-ad-category']
      var subCategory = fields['form-ad-subcategory']
      var contactName = fields['form-ad-contactname']
      var phone = fields['form-ad-phone']

      // concatenate price and currency in one variable, e. g. 4500 $
      var rawPrice = fields['form-ad-price']
      var rawCurrency = fields['form-ad-currency']
      var price = (rawPrice) ? rawPrice + ' ' + rawCurrency : ''

      var date = moment().format('D MMMM YYYY')

      // new images path array
      var newImagesPath = []

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

  showad: function (req, res) {
    var reqUrl = url.parse(req.url, true, true).path.toString().slice(1)

    // increase model.views by one
    Ad.findOneAndUpdate({ 'url': reqUrl },
      { $inc: { views: 1 } }, function (err) {
        if (err) console.log(err)
      }
    )

    Ad.findOne({ 'url': reqUrl },
      // 'adTitle adDescription phone price date category imagesPath subCategory views', // or you can change this to 'null', which will be returning all fileds
      null,
      function (err, ad) {
        if (err) console.log(err)

        if (ad) {
          res.render('showad.jade', {
            ad: ad
          })
        } else if (!ad) {
          res.render('404.jade')
        }
      }
    )
  },

  category: function (req, res) {
    var category = req.params.category
    var pageNumber = req.params.pageNumber
    var limitPerPage = 30

    var query = Ad.where({ category: category }).skip((pageNumber - 1) * limitPerPage).sort('-dateForSort').limit(limitPerPage)

    query.find(function (err, ad) {
      if (err) console.log(err)

      res.render('category.jade', {
        ads: ad
      })
    })
  },

  subcategory: function (req, res) {
    var category = req.params.category
    var subCategory = req.params.subCategory || ''
    var pageNumber = req.params.pageNumber
    var limitPerPage = 30

    var query = Ad.where({ category: category, subCategory: subCategory }).skip((pageNumber - 1) * limitPerPage).sort('-dateForSort').limit(limitPerPage)

    query.find(function (err, ad) {
      if (err) console.log(err)

      res.render('subcategory.jade', {
        ads: ad
      })
    })
  },

  searchResults: function (req, res) {
    var pageNumber = req.params.number
    var limitPerPage = 30
    var form = new formidable.IncomingForm()

    form.parse(req, function (err, field) {
      if (err) console.log(err)

      var rawRequest = field.search
      var keyword = rawRequest.toLowerCase().trim().replace(/\W+\D+/gim, '')

      var query

      if (pageNumber && keyword) {
        query = Ad.find({ keywords: { $regex: keyword } }).skip((pageNumber - 1) * limitPerPage).sort('-dateForSort').limit(limitPerPage)

        query.exec(function (err, ad) {
          if (err) console.log(err)

          res.render('index.jade', {
            ads: ad
          })
        })
      } else if (keyword) {
        query = Ad.find({ keywords: { $regex: keyword } }).sort('-dateForSort').limit(limitPerPage)

        query.exec(function (err, ad) {
          if (err) console.log(err)

          res.render('index.jade', {
            ads: ad
          })
        })
      } else {
        res.render('index.jade')
      }
    })
  },

  // admin panel
  adminPanel: function (req, res) {
    res.render('admin.html')
  },

  deleteAd: function (req) {
    var id = req.params.id

    Ad.findByIdAndRemove(id, function (err, ad) {
      if (err) throw err

      console.log(ad)
    })
  },

  updateDateAd: function (req) {
    var id = req.params.id

    // create date, ex.: 30 oct. 2014
    var monthNames = [ 'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie' ]
    var date = new Date().getDate() + ' ' + monthNames[new Date().getMonth()] + ' ' + new Date().getFullYear()

    Ad.findByIdAndUpdate(id,
      { $set: { date: date, dateForSort: new Date() } },

      function (err, ad) {
        if (err) console.log(err)

        console.log(ad)
      }
    )
  }
}
