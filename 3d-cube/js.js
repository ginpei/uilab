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
