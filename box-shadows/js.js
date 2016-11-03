(function() {
	var curType;
	var elTypes;
	var elContainer;

	document.addEventListener('DOMContentLoaded', function(event) {
		elTypes = Array.from(document.querySelectorAll('[name="css-type"]'));
		elTypes.forEach(function(el) {
			el.addEventListener('change', function(event) {
				render();
			});
		});

		elContainer = document.querySelector('.container');

		elTypes[0].checked = true;
		render();
	});

	function render() {
		curType = getType();
		elTypes.forEach(v=>elContainer.classList.remove(v.value));
		elContainer.classList.add(curType);
	}

	function getType() {
		var type = elTypes.find(v=>v.checked).value;
		return type;
	}
})();
