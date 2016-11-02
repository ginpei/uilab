Vue.component('carousel', {
	template: template('carousel'),
	props: [
		'interbal',
	],
	data: function() {
		return {
			pages: [],
			pos: 0,
			running: false,
		};
	},
	mounted: function() {
		this.pages = this.$el.querySelectorAll('.ui-carousel-page');
	},
	methods: {
		start: function() {
			this.running = true;
		},
		goNext: function() {
			this.goTo(this.pos + 1);
		},
		goTo: function(pos) {
			this.pos = pos % this.pages.length;
			this._tmNext = setTimeout(()=>{
				if (this.running) {
					this.goNext();
				}
			}, Number(this.interval) || 5000);
		},
		button_onClick: function(event, index) {
			this.goTo(index);
		},
	},
});

Vue.component('carousel-row', {
	template: template('carousel-row'),
	props: [
		'pos',
	],
	computed: {
		style: function() {
			return {
				transform: `translateX(-${this.pos * 100}%)`,
			};
		},
	},
});

Vue.component('carousel-button', {
	template: template('carousel-button'),
	props: [
		'index',
		'onClick',
	],
	computed: {
		label: function() {
			return this.index + 1;
		},
	},
	methods: {
		button_onClick: function(event) {
			this.onClick(event, this.index);
		},
	},
});

function initialize() {
	var app = new Vue({
		el: '#app',
	});
}

function template(id) {
	return document.querySelector(`#template-${id}`).text;
}

document.addEventListener('DOMContentLoaded', initialize);
