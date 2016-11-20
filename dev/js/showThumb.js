$().ready(function() {
	$(document)
	.on('mouseover', '.adNameThumb', function(e) {
		var axaY = e.pageY + 10;
		var axaX = e.pageX + 10;

		$(this).closest('li').find('.hiddenImage')
			.css({ 'display' : 'inline-block' })
			.css({ 'top' : axaY })
			.css({ 'left' : axaX });
	})
		.on('mouseout', '.adNameThumb', function() {
			$(this).closest('li').find('.hiddenImage').css({
				'display': 'none'
			});
		});
});
