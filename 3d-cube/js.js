// By CSS
(function() {
	var elBase = document.querySelector('.js-byCss');
	var elCube = elBase.querySelector('.ui-cube');
	var elSurfaces = elBase.querySelectorAll('.js-surface');
	var elShowNextSurface = elBase.querySelector('.js-showNextSurface');
	var elVisibilities = elBase.querySelectorAll('.js-visibility');
	var elFrontSurfaces = elBase.querySelectorAll('.js-frontSurface');

	elShowNextSurface.onclick = function(event) {
		var LEN_SURFACE = 7;

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
	elFrontSurfaces[6].onclick = updateFront;

	updateVisivilities();
})();
