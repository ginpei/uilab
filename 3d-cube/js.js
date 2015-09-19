// FIXME
document.body.onclick = function(event) {
	var elCube = document.querySelector('.ui-cube');
	if (elCube.classList.contains('ui-cube-s2')) {
		elCube.classList.remove('ui-cube-s2');
	}
	else {
		elCube.classList.add('ui-cube-s2');
	}
};
