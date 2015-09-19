(function() {
	var elCube = document.querySelector('.ui-cube');
	var elVisibilities = document.querySelectorAll('.js-visibility');
	var elSurfaces = document.querySelectorAll('.js-surface');

	elCube.onclick = function(event) {
		var LEN_SURFACE = 6;

		var surface = Number(elCube.getAttribute('data-uicube-surface')) || 1;

		if (surface === LEN_SURFACE) {
			elCube.setAttribute('data-uicube-surface', 1);
		}
		else {
			elCube.setAttribute('data-uicube-surface', surface+1);
		}
	};

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
