// FIXME
document.body.onclick = function(event) {
	var LEN_SURFACE = 4;

	var elCube = document.querySelector('.ui-cube');
	var surface = Number(elCube.getAttribute('data-uicube-surface')) || 1;

	if (surface === LEN_SURFACE) {
		elCube.setAttribute('data-uicube-surface', 1);
	}
	else {
		elCube.setAttribute('data-uicube-surface', surface+1);
	}
};

(function() {
	var elVisibilities = document.querySelectorAll('.js-visibility');
	var fn = function(event) {
		event.stopPropagation();

		var nth = event.currentTarget.value;
		var visibility = event.currentTarget.checked;
		var elSurface = document.querySelectorAll('.js-surface')[nth-1];
		elSurface.style.display = (visibility ? '' : 'none');
	};
	for (var i=0, l=elVisibilities.length; i<l; i++) {
		var elVisibility = elVisibilities[i];
		elVisibility.onclick = fn;
	}
})();
