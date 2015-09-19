(function() {
	var elCube = document.querySelector('.ui-cube');
	var elSurfaces = document.querySelectorAll('.js-surface');
	var elVisibilities = document.querySelectorAll('.js-visibility');
	var elFrontSurfaces = document.querySelectorAll('.js-frontSurface');

	elCube.onclick = function(event) {
		var LEN_SURFACE = 6;

		var curSurface = Number(elCube.getAttribute('data-uicube-surface')) || 1;  // 1-6
		var index = (curSurface) % LEN_SURFACE;  // 0-5
		elCube.setAttribute('data-uicube-surface', index+1);
		elFrontSurfaces[index].checked = true;
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
