// FIXME
document.querySelector('.ui-cube').onclick = function(event) {
	var LEN_SURFACE = 6;

	var elCube = event.currentTarget;
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
	var elSurfaces = document.querySelectorAll('.js-surface');
	function updateVisivilities() {
		for (var i=0, l=elSurfaces.length; i<l; i++) {
			elSurfaces[i].style.display = (elVisibilities[i].checked ? '' : 'none');
		}
	};

	for (var i=0, l=elVisibilities.length; i<l; i++) {
		elVisibilities[i].onclick = updateVisivilities;
	}

	updateVisivilities();
})();
