// FIXME
document.body.onclick = function(event) {
	var elCube = document.querySelector('.ui-cube');
	var surface = Number(elCube.getAttribute('data-uicube-surface')) || 1;

	if (surface === 4) {
		elCube.setAttribute('data-uicube-surface', 1);
	}
	else {
		elCube.setAttribute('data-uicube-surface', surface+1);
	}
};
