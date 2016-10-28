Vue.component('cosmo', {
	template: document.querySelector('#template-cosmo').text,
	props: [
		'boxes',
		'now',
		'since',
		'stopping',
	],
	data: function() {
		return {
			ax: 0,  // accelerates per sec
			ay: 0,  // accelerates per sec
			az: 0,  // accelerates per sec
			degX: 0,
			degY: 0,
			degZ: 0,
			vx: 30,  // deg per sec
			vy: 30,  // deg per sec
			vz: 50,  // px per sec
		};
	},

	computed: {
		transform: function() {
			let ds = (this.now - this.since) / 1000;

			if (this.stopping) {
				if (this.vy === 0) {
					this.ay = 0;
				}
				else {
					this.ay = Math.ceil(this.vy * 0.3 / 10) * 10;
				}

				if (this.vx === 0) {
					this.ax = 0;
				}
				else {
					this.ax = Math.ceil(this.vx * 0.3 / 10) * 10;
				}

				if (this.vz === 0) {
					this.az = 0;
				}
				else {
					this.az = Math.ceil(this.vz * 0.3 / 10) * 10;
				}
			}

			this.vy -= this.ay * ds;
			this.degY += this.vy * ds;

			this.vx -= this.ax * ds;
			this.degX += this.vx * ds;

			this.vz -= this.az * ds;
			this.degZ += this.vz * ds;
			let translateZ = Math.sin(this.degZ / 360 * Math.PI * 2) * 400;

			return `rotateY(${this.degY}deg) rotateX(${this.degX}deg) translateZ(${translateZ}px)`;
		},
	},

	methods: {
	},
});

Vue.component('box', {
	template: document.querySelector('#template-box').text,
	props: [
		'x',
		'y',
		'z',
	],
	computed: {
		transform: function() {
			return `translateX(${this.x}px) translateY(${this.y}px) translateZ(${this.z}px)`;
		},
	},
});

Vue.component('console', {
	template: document.querySelector('#template-console').text,
	props: [
		'onAdd',
		'onReduce',
		'onStop',
	],
	methods: {
		add_onClick: function(event) {
			this.onAdd(event);
		},

		reduce_onClick: function(event) {
			this.onReduce(event);
		},

		stop_onClick: function(event) {
			this.onStop(event);
		},
	},
});

let app = new Vue({
	el: '#app',
	data: {
		boxes: [],
		now: Date.now(),
		since: Date.now(),
		stopping: false,
	},
	methods: {
		start: function() {
			this.render();
		},

		render: function() {
			this.since = this.now;
			this.now = Date.now();

			this.loop();
		},

		loop: function() {
			requestAnimationFrame(this.render.bind(this));
		},

		addBox: function() {
			this.boxes.push({
				x: Math.floor(Math.random() * 50) * 10 - 250,
				y: Math.floor(Math.random() * 50) * 10 - 250,
				z: Math.floor(Math.random() * 50) * 10 - 250,
			});
		},

		reduceBox: function() {
			this.boxes.shift();
		},

		onAdd: function(event) {
			this.addBox();
		},

		onReduce: function(event) {
			this.reduceBox();
		},

		onStop: function(event) {
			this.stopping = true;
		},
	},
});

for (var i = 0; i < 3; ++i) {
	setTimeout(function() {
		app.addBox();
	}, 1000 + 500*i);
}

app.start();
