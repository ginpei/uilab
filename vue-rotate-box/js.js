Vue.component('box', {
	template: document.querySelector('#template-box').text,
	props: [
		'deg',
	],
	computed: {
		style: function() {
			return {
				transform: `rotateY(${this.deg}deg)`,
			};
		},
	},
});

Vue.component('console', {
	template: document.querySelector('#template-console').text,
	props: [
		'deg',
		'degOnChange',
	],
	methods: {
		deg_onChange: function(event) {
			this.degOnChange(event, this.deg);
		},
	},
});

var app = new Vue({
	el: '#app',
	data: {
		deg: 0,
	},
	methods: {
		deg_onChange: function(event, deg) {
			this.deg = deg;
		},
	},
});
