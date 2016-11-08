var store = new Vuex.Store({
	state: {
		tasks: [
			{ name: 'aaa' },
			{ name: 'bbb' },
		],
	},
	mutations: {
		addTask(state, item) {
			state.tasks.push(item);
		},
	},
});

var TodoForm = {
	template: document.querySelector('#template-todo-form').text,
	data: function() {
		return {
			name: 'ccc',
		};
	},
	methods: {
		form_onSubmit: function(event) {
			event.preventDefault();
			if (!this.name) {
				return;
			}
			store.commit('addTask', {
				name: this.name,
			});
			this.name = '';
		},
	},
};

var TodoItem = {
	template: document.querySelector('#template-todo-item').text,
	props: [
		'item',
	],
};

var TodoList = {
	template: document.querySelector('#template-todo-list').text,
	props: [
		'list',
	],
	components: {
		TodoItem,
	},
};

var app = new Vue({
	el: '#app',
	data: store.state,
	methods: {
	},
	components: {
		TodoForm,
		TodoList,
	},
});
