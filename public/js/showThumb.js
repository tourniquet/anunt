$().ready(function() {
	$(document)
		.on('mouseover', '.ad-name-thumb', function(e) {
			var axaY = e.pageY + 10;
			var axaX = e.pageX + 10;

			$(this).closest('li').find('.hidden-image')
				.css({ 'display' : 'inline-block' })
				.css({ 'top' : axaY })
				.css({ 'left' : axaX });
		})

		.on('mouseout', '.ad-name-thumb', function() {
			$(this).closest('li').find('.hidden-image').css({
				'display': 'none'
			});
		});
});
