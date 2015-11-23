(function() {
	function $(selector) {
		var els;
		var selectorText = null;
		if (typeof selector === 'string') {
			els = document.querySelectorAll(selector);
			selectorText = selector;
		}
		else {
			els = [selector];
		}
		var obj = {
			selector: selectorText,
			els: els,
			length: els.length,
			each: function(callback) {
				for (var i=0, l=this.els.length; i<l; i++) {
					callback(i, this.els[i]);
				}
				return this;
			},
			on: function(type, listener) {
				this.each(function(index, el) {
					el.addEventListener(type, listener);
				});
				return this;
			},
			css: function(props) {
				return this.each(function(index, el) {
					for (var prop in props) {
						el.style[prop] = props[prop];
					}
				});
			},
			addClass: function(className) {
				var classNames = className.split(' ');
				return this.each(function(index, el) {
					for (var i=0, l=classNames.length; i<l; i++) {
						el.classList.add(classNames[i]);
					}
				});
			},
			removeClass: function(className) {
				var classNames = className.split(' ');
				return this.each(function(index, el) {
					for (var i=0, l=classNames.length; i<l; i++) {
						el.classList.remove(classNames[i]);
					}
				});
			}
		};
		return obj;
	}

	var $document = $(document);
	var $button = $('.js-selectTime');
	var $hourSelection = $('#ui-selectTime .select-hour');

	function getPosition(event) {
		return {
			x: event.pageX,
			y: event.pageY
		};
	}

	$document.on('mousedown', function(event) {
		$hourSelection
			.css({ left:'-9999px' })
			.removeClass('active');
	});
	$hourSelection.on('mousedown', function(event) {
		event.stopPropagation();
		console.log(event.target.firstChild.nodeValue);
	});
	$button.on('click', function(event) {
		$hourSelection.removeClass('active');

		var position = getPosition(event);
		$hourSelection.css({
			left: position.x + 'px',
			top: position.y + 'px'
		});
		$hourSelection.addClass('active');
	});
})(window, document);
