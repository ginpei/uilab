(function() {
	var elCube = document.querySelector('.ui-cube');
	var elSurfaces = document.querySelectorAll('.js-surface');
	var elShowNextSurface = document.querySelector('.js-showNextSurface');
	var elVisibilities = document.querySelectorAll('.js-visibility');
	var elFrontSurfaces = document.querySelectorAll('.js-frontSurface');

	elShowNextSurface.onclick = function(event) {
		var LEN_SURFACE = 6;

		var curSurface = Number(elCube.getAttribute('data-uicube-surface')) || 1;  // 1-6
		var index = (curSurface) % LEN_SURFACE;  // 0-5
		setFrontIndex(index);
	};

	function setFrontIndex(index) {
		elCube.setAttribute('data-uicube-surface', index+1);
		elFrontSurfaces[index].checked = true;
	}

	function updateFront(event) {
		var elFrontSurface = event.currentTarget;
		var number = elFrontSurface.value;
		setFrontIndex(number-1);
	}

	function updateVisivilities() {
		for (var i=0, l=elSurfaces.length; i<l; i++) {
			elSurfaces[i].style.display = (elVisibilities[i].checked ? '' : 'none');
		}
	};

	for (var i=0, l=elSurfaces.length; i<l; i++) {
		elFrontSurfaces[i].onclick = updateFront;
		elVisibilities[i].onclick = updateVisivilities;
	}

	updateVisivilities();
})();
