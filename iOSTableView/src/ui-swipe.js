(function(window, document, $) {
/*! Osteoporosis.js v0.0.2 By TAKANASHI Ginpei */
var Osteoporosis=function(){var t={},i="prototype",n="extend",e=
"trigger",o="attributes",r="_listeners",s=[].slice,u="undefined"
==typeof _?$[n]:_[n],a=function(){};t[n]=function(e,o){function
r(t){this.__osteoporosis__(t),this.initialize(t)}return r[n]=t[n
],u(r[i],this[i],e),u(r,o),r};var h=t.eventPrototype={on:
function(t,i){var n=this[r];n||(n=this[r]={});var e=n[t];e||(e=n
[t]=[]),e.push(i)},trigger:function(t){var i=this[r];if(i&&i[t])
{var n=s.call(arguments,1);i[t].forEach(function(t){t.apply(null
,n)})}}};return t.Model=function(){},t.Model[n]=t[n],u(t.Model[i
],{__osteoporosis__:function(t){return this[o]={},this.set(t)},
initialize:a,set:function(t){var i=this[o];for(var n in t){var r
=t[n],s=i[n];r!==s&&(i[n]=r,this[e]("change:"+n,this,r),this[e](
"change",this))}return this},get:function(t){return this[o][t]},
on:h.on,trigger:h[e]}),t.View=function(){},t.View[n]=t[n],u(t.
View[i],{__osteoporosis__:function(t){t=t||{},this.$el=$(t.el||
document)},initialize:a,$:function(t){return this.$el.find(t)},
on:h.on,trigger:h[e]}),t}();

	// ----------------------------------------------------------------
	// Extend Osteoporosis

	/**
	 * Default values.
	 * @type Object
	 * @see #_initializeAttributes
	 */
	Osteoporosis.Model.prototype.defaults = {};

	/**
	 * The constructor for Model.
	 * @overwrite Osteoporosis.Model#__osteoporosis__
	 */
	var Model_beforeInitialize = Osteoporosis.Model.prototype.__osteoporosis__;
	Osteoporosis.Model.prototype.__osteoporosis__ = function(attr) {
		Model_beforeInitialize.apply(this, arguments);
		this._initializeAttributes(attr);
	};

	/**
	 * Set default values as own attributes
	 * if the value is not specified in constructor.
	 * @see #initialize
	 * @see #defaults
	 */
	Osteoporosis.Model.prototype._initializeAttributes = function(spec) {
		var attr = this.attributes;
		var def = this.defaults;
		for (var p in def) {
			if (!spec || !(p in spec)) {
				attr[p] = def[p];
			}
		}
	};

	/**
	 * Bind own event listener to an event.
	 * @param {Object} obj Which has `.on()` method.
	 * @param {String} type
	 * @param {Function} listener
	 */
	Osteoporosis.View.prototype.listenTo = function(obj, type, listener) {
		obj.on(type, listener.bind(this));
	};

	// ----------------------------------------------------------------

	/**
	 * Manage user action status.
	 * @constructor
	 */
	var Status = Osteoporosis.Model.extend({
		THRESHOLD_X: 30,
		THRESHOLD_Y: 30,

		/**
		 * Default values.
		 */
		defaults: {
			fromX: NaN,  // the origin of actions
			fromY: NaN,
			premoving: false,  // whether user is flicking to do some action
			movingX: false,  // whether the element is moving horizontaly
			movingY: false  // whether the element is moving vertically
		},

		/**
		 * Whether specified positions overcome the threshold.
		 * @param {Number} positions.x
		 * @see #THRESHOLD_X
		 */
		isOverThresholdX: function(positions) {
			var delta = positions.x - this.get('fromX');
			return (delta > this.THRESHOLD_X || delta < -this.THRESHOLD_X);
		},

		/**
		 * Whether specified positions overcome the threshold.
		 * @param {Number} positions.y
		 * @see #THRESHOLD_Y
		 */
		isOverThresholdY: function(positions) {
			var delta = positions.y - this.get('fromY');
			return (delta > this.THRESHOLD_Y || delta < -this.THRESHOLD_Y);
		}
	});

	// ----------------------------------------------------------------

	/**
	 * UI for swiping.
	 * @constructor
	 */
	UISwipe = Osteoporosis.View.extend({
		initialize: function(options) {
			// prepare models
			this.status = new Status();

			// listen models
			var status = this.status;
			this.listenTo(status, 'change:movingX', this.status_onchange_movingX);
			this.listenTo(status, 'change:movingY', this.status_onchange_movingY);

			// listen elements
			var $document = $(document);
			this.listenTo(this.$el, 'mousedown', this.el_onmousedown);
			this.listenTo($document, 'mousemove', this.document_onmousemove);
			this.listenTo($document, 'mouseup', this.document_onmouseup);
		},

		/**
		 * Start whatching user's operation.
		 * @param {Number} positions.x
		 * @param {Number} positions.y
		 */
		startPremoving: function(positions) {
			this.status.set({
				fromX: positions.x,
				fromY: positions.y
			});
			this.status.set({ premoving:true });
		},

		/**
		 * Update status before actual behaviours.
		 * @param {Number} positions.x
		 * @param {Number} positions.y
		 */
		updatePremoving: function(positions) {
			if (this.status.isOverThresholdY(positions)) {
				this.status.set({ movingY:true });
			}
			else if (this.status.isOverThresholdX(positions)) {
				this.status.set({ movingX:true });
			}
		},

		/**
		 * Reset moving flags.
		 */
		stopMoving: function() {
			this.status.set({
				movingX: false,
				movingY: false,
				premoving: false
			});
			this.$el.css({ transform:'' });
		},

		/**
		 * Update element position by the origin and current positions.
		 * @param {Number} positions.x
		 * @param {Number} positions.y
		 */
		updateMovingX: function(positions) {
			var delta = positions.x - this.status.get('fromX');
			this.$el.css({ transform:'translateX(' + delta + 'px)' });
		},

		/**
		 * Get pointer positions from specified pointer event.
		 * @param {Number} positions.x
		 * @param {Number} positions.y
		 */
		getPositionsFromEvent: function(event) {
			var positions = {
				x: event.pageX,
				y: event.pageY
			};
			return positions;
		},

		status_onchange_movingX: function(model, value) {
			if (value) {
				this.status.set({ premoving:false });
			}
		},

		status_onchange_movingY: function(model, value) {
			if (value) {
				this.stopMoving();
			}
		},

		el_onmousedown: function(event) {
			event.preventDefault();
			var positions = this.getPositionsFromEvent(event);
			this.startPremoving(positions);
		},

		document_onmousemove: function(event) {
			if (this.status.get('premoving')) {
				var positions = this.getPositionsFromEvent(event);
				this.updatePremoving(positions);
			}
			else if (this.status.get('movingX')) {
				var positions = this.getPositionsFromEvent(event);
				this.updateMovingX(positions);
			}
		},

		document_onmouseup: function(event) {
			if (this.status.get('premoving') || this.status.get('movingX')) {
				this.stopMoving();
			}
		}
	});

	// ----------------------------------------------------------------
	// export

	UISwipe.Status = Status;
	window.UISwipe = UISwipe;
})(window, document, window.$);
