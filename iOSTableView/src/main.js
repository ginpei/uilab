(function(window, document) {

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

	Osteoporosis.View.prototype.listenTo = function(obj, type, listener) {
		obj.on(type, listener.bind(this));
	};

	// --------------------------------

	var RowStatus = Osteoporosis.Model.extend({
		THRESHOLD_X: 30,
		THRESHOLD_Y: 30,

		defaults: {
			premoving: false,
			movingX: false,
			movingY: false
		},

		initialize: function(attributes, options) {
			this._initializeAttributes(attributes);
		},

		_initializeAttributes: function(spec) {
			var attr = this.attributes;
			var def = this.defaults;
			for (var p in attr) {
				if (!(p in spec)) {
					attr[p] = def[p];
				}
			}
		},

		isOverThresholdX: function(positions) {
			var delta = positions.x - this.get('fromX');
			return (delta > this.THRESHOLD_X || delta < -this.THRESHOLD_X);
		},

		isOverThresholdY: function(positions) {
			var delta = positions.y - this.get('fromY');
			return (delta > this.THRESHOLD_Y || delta < -this.THRESHOLD_Y);
		}
	});

	// --------------------------------

	var RowView = Osteoporosis.View.extend({
		initialize: function(options) {
			var status = this.status = new RowStatus();

			this.listenTo(status, 'change:movingX', this.status_onchange_movingX);
			this.listenTo(status, 'change:movingY', this.status_onchange_movingY);

			var $el = this.$el;
			var $document = $(document);
			this.listenTo($el, 'mousedown', this.el_onmousedown);
			this.listenTo($document, 'mousemove', this.document_onmousemove);
			this.listenTo($document, 'mouseup', this.document_onmouseup);
		},

		startPremoving: function(positions) {
			this.status.set({
				fromX: positions.x,
				fromY: positions.y
			});
			this.status.set({ premoving:true });
		},

		updatePremoving: function(positions) {
			if (this.status.isOverThresholdY(positions)) {
				this.status.set({ movingY:true });
			}
			else if (this.status.isOverThresholdX(positions)) {
				this.status.set({ movingX:true });
			}
		},

		stopMoving: function() {
			this.status.set({
				movingX: false,
				movingY: false,
				premoving: false
			});
		},

		getPositionsFromEvent: function(event) {
			var positions = {
				x: event.pageX,
				y: event.pageY
			};
			return positions;
		},

		status_onchange_movingX: function(model, value) {
			if (value) {
console.log('x!');
				this.stopMoving();
			}
		},

		status_onchange_movingY: function(model, value) {
			if (value) {
console.log('y!');
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
		},

		document_onmouseup: function(event) {
			if (this.status.get('premoving')) {
				this.stopMoving();
			}
		}
	});

	// --------------------------------

	var TableView = Osteoporosis.View.extend({
		initialize: function() {
			this.$el.find('.ui-tableView-row').each(function(i, elRow) {
				var view = new RowView({ el:elRow });
			});
		}
	});

	// --------------------------------

	TableView.RowView = RowView;
	window.TableView = TableView;
})(window, document);
