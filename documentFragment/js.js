var MAX = 10000;

document.querySelector('#direct').addEventListener('click', function(event) {
	var elOut = document.querySelector('#out');
	elOut.innerHTML = '';
	var el;

	console.timeline('direct');
	for (var i=0, l=MAX; i<l; i++) {
		el = document.createElement('span');
		el.textContent = i;
		elOut.appendChild(el);
	}
	console.timelineEnd('direct');
});

document.querySelector('#fragment').addEventListener('click', function(event) {
	var elOut = document.querySelector('#out');
	elOut.innerHTML = '';
	var fragment = document.createDocumentFragment();
	var el;

	console.timeline('fragment');
	for (var i=0, l=MAX; i<l; i++) {
		el = document.createElement('span');
		el.textContent = i;
		fragment.appendChild(el);
	}
	elOut.appendChild(fragment);
	console.timelineEnd('fragment');
});

// 挿入する要素を用意
var elItem3 = document.createElement('li');
elItem3.textContent = '3';
var elItem4 = document.createElement('li');
elItem4.textContent = '4';

// 文書断片を用意
var fragment = document.createDocumentFragment();
fragment.appendChild(elItem3);
fragment.appendChild(elItem4);

// まとめて挿入
var elList = document.querySelector('#list');
var elTarget = elList.querySelector('#target');
elList.insertBefore(fragment, elTarget);
