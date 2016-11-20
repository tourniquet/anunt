var categoryPagination = function() {	
	var getPath = window.location.pathname.split('/');
	var adsList = document.getElementById('ads-listing').getElementsByTagName('li');
	var prevButton = document.getElementById('previous-button');
	var nextButton = document.getElementById('next-button');

	// hide "Înapoi" button
	if (isNaN(getPath[getPath.length - 1]) || getPath[getPath.length - 1] === '1')
		prevButton.style.display = 'none';
	else
		prevButton.innerHTML = '<a href="/category/' + getPath[2] + '/' + (parseInt(getPath[getPath.length - 1]) - 1) + '">Înapoi</a>';

	// show "Înainte" button
	if (adsList.length === 30) {
		if (isNaN(getPath[getPath.length - 1])) {
			nextButton.innerHTML = '<a href="/category/' + getPath[getPath.length - 1] + '/2">Înainte</a>';
		} else if (!isNaN(getPath[getPath.length - 1])) {
			nextButton.innerHTML = '<a href="/category/' + (getPath[getPath.length - 2] + '/') + (parseInt(getPath[getPath.length - 1]) + 1) + '">Înainte</a>';
		}
	} else if (adsList.length < 30) {
		nextButton.style.display = 'none';
	}
};