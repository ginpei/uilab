(function() {
	function $(selector) {
		if (!(this instanceof $)) {
			return new $(selector);
		}

		var els;
		var selectorText = null;
		if (typeof selector === 'string') {
			els = document.querySelectorAll(selector);
			selectorText = selector;
		}
		else {
			els = [selector];
		}
		$.extend(this, {
			selector: selectorText,
			els: els,
			length: els.length
		});

		this.each(function(index, el) {
			this[index] = el;
		});
	}
	$.extend = function(source) {
		var objs = Array.prototype.slice.call(arguments, 1);
		for (var i=0, l=objs.length; i<l; i++) {
			var obj = objs[i];
			for (var prop in obj) {
				source[prop] = obj[prop];
			}
		}
		return source;
	};
	$.extend($.prototype, {
		each: function(callback) {
			for (var i=0, l=this.els.length; i<l; i++) {
				callback.call(this, i, this.els[i]);
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
	});

	var $document = $(document);
	var $button = $('.js-selectTime');
	var $block = $('#ui-selectTime');
	var $hourSelection = $('#ui-selectTime .select-hour');
	var $setAm = $('#ui-selectTime .setAm');
	var $setPm = $('#ui-selectTime .setPm');

	function getPosition(event) {
		return {
			x: event.pageX,
			y: event.pageY
		};
	}

	$document.on('mousedown', function(event) {
		$hourSelection.css({ left:'-9999px' })
		$block.removeClass('active');
	});
	$block.on('mousedown', function(event) {
		event.stopPropagation();
		var $button = $(event.target);
		console.log($button[0].firstChild.nodeValue);
	});
	$button.on('click', function(event) {
		$block.removeClass('active');

		var position = getPosition(event);
		$hourSelection.css({
			left: position.x + 'px',
			top: position.y + 'px'
		});
		$block.addClass('active');
	});

	$setAm.on('click', function(event) {
		$block.removeClass('b-pm');
		$block.addClass('b-am');
	});
	$setPm.on('click', function(event) {
		$block.removeClass('b-am');
		$block.addClass('b-pm');
	});
})(window, document);
