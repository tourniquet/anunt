/* globals $ */

$().ready(() => {
  $(document)
    .on('mouseover', '.adNameThumb', (e) => {
      var axaY = e.pageY + 10
      var axaX = e.pageX + 10

      $(this).closest('li').find('.hiddenImage')
        .css({ 'display': 'inline-block' })
        .css({ 'top': axaY })
        .css({ 'left': axaX })
    })
    .on('mouseout', '.adNameThumb', () => {
      $(this).closest('li').find('.hiddenImage').css({
        'display': 'none'
      })
    })
})
