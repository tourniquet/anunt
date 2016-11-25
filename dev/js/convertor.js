/* globals $ */
// showad.jade

$.get('bnm.xml', (xml) => {
  const rawCurrency = $('#price').text()

  var currency = $.trim(rawCurrency).slice(-1) // get last symbol
  var price = $.trim(rawCurrency).slice(5) // slice 'pret:' word

  var parseXml = $.xml2json(xml)

  const euroRate = parseXml.Valute[0].Value
  const dollarRate = parseXml.Valute[1].Value

  var toLei, toEuros, toDollars

  if (currency === '$' && (typeof parseFloat(price) !== isNaN)) {
    toLei = dollarRate * parseFloat(price)
    toEuros = toLei / euroRate

    $('.converted')
      .eq(0).text(' / ' + toLei.toFixed(2) + ' lei / ')
      .eq(1).text(toEuros.toFixed(2) + ' €')
  } else if (currency === '€' && typeof price !== isNaN) {
    toLei = euroRate * parseFloat(price)
    toDollars = (parseFloat(price) * euroRate) / dollarRate

    $('.converted')
      .eq(0).text(' / ' + toLei.toFixed(2) + ' lei / ')
      .eq(1).text(toDollars.toFixed(2) + ' $')
  } else if (currency === 'i' && typeof price !== isNaN) {
    toDollars = parseFloat(price) / dollarRate
    toEuros = parseFloat(price) / euroRate

    $('.converted')
    .eq(0).text(' / ' + toDollars.toFixed(2) + ' $ / ')
    .eq(1).text(toEuros.toFixed(2) + ' €')
  }
})
