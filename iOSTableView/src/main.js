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

	// --------------------------------

	var TableView = Osteoporosis.View.extend({
		initialize: function() {
			this.$el.find('.ui-tableView-row').each(function(i, elRow) {
				var view = new window.UISwipe({ el:elRow });
			});
		}
	});

	// --------------------------------

	window.TableView = TableView;
})(window, document);
